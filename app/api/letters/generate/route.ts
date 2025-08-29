import { NextResponse } from "next/server"
import { generateLetter } from "../_lib/openai"
import { supabase, generatePdfAndUpload } from "../_lib/supabase"

// POST /api/letters/generate
// Accepts a letter generation request, invokes OpenAI and stores the result.
export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Validate body fields here (omitted for brevity)
    // Insert a pending record into letter_requests table
    const { data: insertData, error: insertError } = await supabase
      .from("letter_requests")
      .insert({ user_id: null, form_data: body, status: "processing" })
      .select()
      .single()
    if (insertError || !insertData) {
      throw insertError
    }
    const jobId = insertData.id
    // Call OpenAI to generate letter text
    const { generatedText, tokenUsage } = await generateLetter(body)
    // Upload PDF to storage
    const pdfUrl = await generatePdfAndUpload("letters", `letter-${jobId}.pdf`, generatedText)
    // Update the record with completed status and details
    await supabase
      .from("letter_requests")
      .update({ status: "completed", generated_text: generatedText, token_usage: tokenUsage })
      .eq("id", jobId)
    return NextResponse.json({ job_id: jobId, status: "pending" }, { status: 201 })
  } catch (error: any) {
    console.error("Error generating letter", error)
    return NextResponse.json({ error: "Failed to generate letter" }, { status: 500 })
  }
}
