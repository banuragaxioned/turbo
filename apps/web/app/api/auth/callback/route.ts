import { Cookies } from "@/utils/constants";
import { createClient } from "@repo/supabase/server";
import { addYears } from "date-fns";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const returnTo = requestUrl.searchParams.get("return_to");
  const provider = requestUrl.searchParams.get("provider");

  if (provider) {
    cookieStore.set(Cookies.PreferredSignInProvider, provider, {
      expires: addYears(new Date(), 1),
    });
  }

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (returnTo && returnTo !== "") {
    return NextResponse.redirect(`${requestUrl.origin}/${returnTo}`);
  }

  return NextResponse.redirect(requestUrl.origin);
}
