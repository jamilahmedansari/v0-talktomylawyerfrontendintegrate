import { NextResponse } from "next/server"
import { supabase } from "../_lib/supabase"

// GET /api/admin/overview
export async function GET() {
  try {
    const { data: users, error: userErr } = await supabase.from("users").select("*")
    const { data: subs, error: subErr } = await supabase.from("subscriptions").select("*")
    const { data: letters, error: letterErr } = await supabase.from("letter_requests").select("*")
    const { data: employees, error: empErr } = await supabase.from("employees").select("*")
    if (userErr || subErr || letterErr || empErr) {
      throw userErr || subErr || letterErr || empErr
    }
    const totalUsers = users?.length ?? 0
    const activeSubscriptions = subs?.filter((s) => s.status === "active").length ?? 0
    const totalLetters = letters?.length ?? 0
    const totalEmployees = employees?.length ?? 0
    // For monthly revenue you would call Stripe but we'll mock here
    const monthlyRevenue = 0
    const openaiCosts = 0
    const topEmployee = { name: "", referral_code: "", signup_count: 0 }
    return NextResponse.json({
      total_users: totalUsers,
      active_subscriptions: activeSubscriptions,
      monthly_revenue: monthlyRevenue,
      total_letters_generated: totalLetters,
      openai_api_costs: openaiCosts,
      total_employees: totalEmployees,
      top_employee: topEmployee,
    })
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch admin overview" }, { status: 500 })
  }
}
