import { NextResponse } from "next/server"
import { supabase } from "../_lib/supabase"

// GET /api/letters/history
export async function GET() {
  try {
    const { data, error } = await supabase.from("letter_requests").select("id, form_data, status, created_at")
    if (error) {
      throw error
    }
    const result = data?.map((r) => ({
      job_id: r.id,
      issue_type: r.form_data?.case_details?.issue_type ?? "Unknown",
      created_at: r.created_at,
      status: r.status,
    }))
    return NextResponse.json(result ?? [])
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 })
  }
}
