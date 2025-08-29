import { NextResponse } from "next/server"
import { supabase } from "../../_lib/supabase"

// GET /api/letters/status/[job_id]
export async function GET(_req: Request, { params }: { params: { job_id: string } }) {
  const { job_id } = params
  try {
    const { data, error } = await supabase
      .from("letter_requests")
      .select("status, generated_text")
      .eq("id", job_id)
      .single()
    if (error || !data) {
      throw error
    }
    // Simulate progress based on status
    let progress = 0
    let message = "Processing..."
    if (data.status === "processing") {
      progress = 50
      message = "Drafting professional content..."
    } else if (data.status === "completed") {
      progress = 100
      message = "Completed"
    }
    const response: any = { job_id, status: data.status, progress, message }
    if (data.status === "completed") {
      // Create a signed URL for the PDF
      const { data: urlData, error: urlErr } = await supabase.storage
        .from("letters")
        .createSignedUrl(`letter-${job_id}.pdf`, 3600)
      if (urlErr) {
        throw urlErr
      }
      response.generated_text = data.generated_text
      response.download_url = urlData?.signedUrl
    }
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("Error fetching letter status", error)
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 })
  }
}
