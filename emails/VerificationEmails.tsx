import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationEmailsProps {
  username: string;
  validationCode: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VerificationEmails = ({
  username,
  validationCode,
}: VerificationEmailsProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="bg-white font-slack mx-auto my-0">
        <Preview>Confirm your email address</Preview>
        <Container className="mx-auto my-0 py-0 px-5">
          <Section className="mt-8">{username}</Section>
          <Heading className="text-[#1d1c1d] text-4xl font-bold my-7.5 mx-0 p-0 leading-10.5">
            Confirm your email address
          </Heading>
          <Text className="text-xl mb-7.5">
            Your confirmation code is below - enter it in your open browser
            window and we'll help you get signed in.
          </Text>

          <Section className="bg-[rgb(245,244,245)] rounded mb-7.5 py-10 px-2.5">
            <Text className="text-3xl text-black leading-6 text-center align-middle">
              {validationCode}
            </Text>
          </Section>

          <Text className="text-black text-sm leading-6">
            If you didn't request this email, there's nothing to worry about,
            you can safely ignore it.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default VerificationEmails;
