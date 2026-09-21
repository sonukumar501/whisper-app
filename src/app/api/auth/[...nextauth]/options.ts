import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import dbConnection from "@/lib/dbConnection";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

interface LoginCredentials {
  email: string;
  password: string;
}

export const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email or username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: LoginCredentials | undefined,
      ): Promise<User | null> {
        await dbConnection();

        try {
          if (!credentials) {
            throw new Error("Error missing credentials");
          }
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials?.email },
            ],
          });

          if (!user) {
            throw new Error(" 404 User not found");
          }
          if (!user.isVerified) {
            throw new Error("401 Please verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordCorrect) {
            throw new Error("401 Incorrect users password");
          }
          return {
            _id: user._id.toString(),
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
            isAcceptingMessage: user.isAcceptingMessage,
          } as User;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        if (!profile?.email_verified) return false;

        // after verifying email it went to db check

        await dbConnection();
        let dbUser = await UserModel.findOne({
          email: profile?.email,
        });

        // creating new user after checking user existence

        if (!dbUser) {
          dbUser = new UserModel({
            username: profile.name,
            email: profile.email,
            isVerified: true,
            isAcceptingMessage: true,
          });
          await dbUser.save();
        }
        user._id = dbUser._id.toString();
        user.username = dbUser.username;
        user.isVerified = dbUser.isVerified;
        user.isAcceptingMessage = dbUser.isAcceptingMessage;
      }

      // return true so it can pass the user to jwt

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id.toString();
        session.user.username = token.username;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

