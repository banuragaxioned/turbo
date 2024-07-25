import { Body, Container, Font, Head, Heading, Hr, Html, Link, Preview, Tailwind, Text } from "@react-email/components";

interface WelcomeEmailProps {
  userName?: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => (
  <Html>
    <Tailwind>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/files/geist-sans-latin-400-normal.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />

        <Font
          fontFamily="Geist"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/files/geist-sans-latin-500-normal.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Preview>Welcome to Snap</Preview>
      <Body className="bg-[#fff] my-auto mx-auto font-sans">
        <Container className="max-w-lg my-[40px] p-[20px]">
          <Heading>Welcome to Snap</Heading>
          <Text className="font-medium">Hi {userName || "User"},</Text>
          <Text>
            Welcome to Snap!.
            <br />
            <br />
            I'm Anurag, and have been working on Snap for the last few weeks. I'm excited to have you on board. We are
            still in early stage of development.
            <br />
            <br />
            During this phase, we are looking for feedback from users like you. This will help us to improve the product
            and shape this into something that we all love.
            <br />
            <br />
            Should you have any questions, please don't hesitate to reply directly to this email or to{" "}
            <Link href="https://cal.com/anuragbanerjee/30min" className="text-[#121212] underline">
              schedule a call with me
            </Link>
            .
          </Text>
          <Hr className="my-8" />
          <Link href="https://snap.vercel.app" className="text-sm text-[#b4becc]">
            Refreshly
          </Link>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;
