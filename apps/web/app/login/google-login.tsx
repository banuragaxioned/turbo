"use client";

import { createClient } from "@repo/db/client";
import { Button } from "@repo/ui/button";
import { Icons } from "@repo/ui/icons";

export default function GoogleLogin(props: { returnTo?: string }) {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/api/auth/callback?next=${props.returnTo ?? ""}`,
      },
    });
  };

  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full"
      size="sm"
      onClick={() => {
        void handleLogin();
      }}
    >
      <Icons.Google className="mr-2" />
      Continue with Google
    </Button>
  );
}
