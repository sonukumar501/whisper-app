"use client";
import VantaBackground from "@/components/vantaBackground";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { SignUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse.type";
import Image from "next/image";

// ui component importation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,

  FieldError,

  FieldLabel,
} from "@/components/ui/field";

const Page = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loader, setLoader] = useState("");
  const router = useRouter();

  // Custom debouncing api call
  // useEffect(() => {
  //   setCheckingUsername(true);
  //  const timer = setTimeout(async () => {
  //     const {data} = await axios.get(
  //       `api/check-user-name-unique?username=${username}`,
  //     );
  //     setCheckingUsername(data.message);
  //     setCheckingUsername(false);
  //     return;
  //   },500);
  //   return ()=>{
  //     clearTimeout(timer);
  //   }
  // },[username]);

  const debouncedUsername = useDebounce(username, 500);

  //check user name is unique or not implementation
  useEffect(() => {
    if (!debouncedUsername) {
      return;
    }
    const controller = new AbortController();
    const isUserNameUnique = async () => {
      try {
        setCheckingUsername(true);
        const res = await axios.get(
          `/api/check-username-unique?username=${debouncedUsername}`,
        );
        const { message } = res?.data;
        setUsernameMessage(message);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        const axiosError = error as AxiosError<ApiResponse>;
        console.error(
          `Error 500 something went wrong while sending request /api/check-username-unique?username=${debouncedUsername}`,
          axiosError,
        );
        setUsernameMessage(
          axiosError.response?.data?.message ?? "Error checking username",
        );
      } finally {
        setCheckingUsername(false);
      }
    };
    isUserNameUnique();
    return () => {
      controller.abort();
    };
  }, [debouncedUsername]);

  // zod resolver implementation
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // user form submission implementation
  const handelOnSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post<ApiResponse>(`/api/sign-up`, data);
      if (res.status == 200) {
        toast.add({
          title: "Success",
          description: res.data.message,
        });
        router.replace(`/user-verification/${username}`);
      }
      toast.add({
        title: "unsuccess",
        description: res.data.message,
      });
    } catch (error) {
      console.error(
        "Error 500 something went wrong while registering user",
        error,
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <VantaBackground className="w-screen h-screen flex justify-center items-center">
      <Card className="min-w-100 min-h-125 rounded-none bg-white backdrop-blur-[1px] shadow-indigo-500 shadow-2xl/40">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="relative flex items-center">
            <Image
              src="https://res.cloudinary.com/c1831cid/image/upload/v1789476558/ChatGPT_Image_Sep_15_2026_06_18_26_PM.png"
              width={62}
              height={62}
              alt="Wishiper logo"
            />

            <span className="-ml-2 font-logo text-4xl font-extrabold text-indigo-500 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]">
              hisper
            </span>
          </CardTitle>

          <CardDescription className="mt-1 text-sm leading-relaxed text-gray-500">
            Begin your anonymous journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="sign-up-form" onSubmit={form.handleSubmit(handelOnSubmit)}>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-bold"
                    htmlFor="form-sign-up-username"
                  >
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-username"
                    type="text"
                    placeholder="sonu14feb"
                    autoComplete="off"
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                    className="rounded-xl"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {usernameMessage && username && <p>{usernameMessage}</p>}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-bold mt-4"
                    htmlFor="form-sign-up-email"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-email"
                    type="text"
                    placeholder="sk@gmail.com"
                    autoComplete="off"
                    className="rounded-xl"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="font-bold mt-4"
                    htmlFor="form-sign-up-password"
                  >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-email"
                    type="password"
                    placeholder="At lest 8 characters"
                    autoComplete="new-password"
                    className="rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 items-start border-t-0 bg-white">
          <div className="flex w-full justify-center gap-10 items-center">
            <button className=""><FcGoogle size={28} /></button>
            <button className=""><FaApple size={28} /></button>
            <button className=""><FaSquareXTwitter size={28} /></button>
          </div>
          <Button type="submit" className="w-full bg-indigo-500 rounded-xl mt-4">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </VantaBackground>
  );
};

export default Page;
