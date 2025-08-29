import { createClient } from "@supabase/supabase-js"
import PDFDocument from "pdfkit"

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
  },
})

/**
 * Generates a PDF from plain text and uploads it to Supabase Storage.
 * Returns a signed URL for download.
 */
export async function generatePdfAndUpload(bucket: string, filename: string, text: string) {
  const doc = new PDFDocument()
  const buffers: Buffer[] = []

  doc.on("data", (chunk) => buffers.push(chunk))
  doc.text(text)
  doc.end()

  await new Promise((resolve) => doc.on("end", resolve))
  const pdfBuffer = Buffer.concat(buffers)

  const { error } = await supabase.storage.from(bucket).upload(filename, pdfBuffer, {
    contentType: "application/pdf",
  })

  if (error) {
    throw error
  }

  const { data, error: urlError } = await supabase.storage.from(bucket).createSignedUrl(filename, 3600)

  if (urlError) {
    throw urlError
  }

  return data?.signedUrl
}
