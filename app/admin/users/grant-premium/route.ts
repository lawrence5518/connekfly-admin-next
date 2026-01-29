import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const form = await req.formData();

  const userId = form.get("user_id") as string;
  const days = Number(form.get("days"));

  if (!userId || !days || days <= 0) {
    return NextResponse.redirect("/admin/users");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  await supabase
    .from("user_plan")
    .upsert({
      user_id: userId,
      plan_name: "premium",
      expires_at: expiresAt.toISOString(),
    });

  return NextResponse.redirect("/admin/users");
}
