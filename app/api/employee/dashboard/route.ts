import { NextResponse } from "next/server"
import { supabase } from "../_lib/supabase"

// GET /api/employee/dashboard
export async function GET(req: Request) {
  try {
    // In a real implementation, extract the employee referral code from JWT claims
    const referralCode = req.headers.get("x-referral-code") || "MOCKCODE"
    const { data: users, error } = await supabase
      .from("users")
      .select("id, created_at, subscription_status")
      .eq("referred_by", referralCode)
    if (error) {
      throw error
    }
    const total_signups = users?.length ?? 0
    const signup_history =
      users?.map((u) => ({
        user_id: u.id,
        signup_date: u.created_at,
        subscription_status: u.subscription_status,
      })) ?? []
    return NextResponse.json({ referral_code: referralCode, total_signups, signup_history, weekly_stats: [] })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch employee dashboard" }, { status: 500 })
  }
}
