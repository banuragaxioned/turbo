import { createClient } from "@repo/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/card";
import { redirect } from "next/navigation";
import LoginButton from "./google-login";

export default async function LoginForm() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login to Repo</CardTitle>
          <CardDescription>Let's get you started with your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <LoginButton />
          </div>
        </CardContent>
        <CardFooter className="text-muted-foreground text-sm">
          By clicking continue, you acknowledge that you have read and agree to Repo's Terms of Service and Privacy
          Policy.
        </CardFooter>
      </Card>
    </div>
  );
}
