import { createClient } from "@repo/db/server";
import { redirect } from "next/navigation";
import AccountForm from "./account-form";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  return <AccountForm user={user} />;
}
