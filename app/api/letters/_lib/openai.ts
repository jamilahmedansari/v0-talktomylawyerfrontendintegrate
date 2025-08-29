import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generates a legal letter using OpenAI based on the provided form data.
 */
export async function generateLetter(formData: any) {
  const { sender_details: sender, recipient_details: recipient, case_details: details } = formData
  const prompt = `You are a professional legal assistant. Draft a formal letter regarding ${details.issue_type} based on the laws of ${recipient.county}, ${recipient.state}. The sender's details are ${sender.full_name}, ${sender.address}, ${sender.email}. The recipient is ${recipient.full_name}, ${recipient.address}. The situation is as follows: ${details.description}. The desired outcome is ${details.desired_outcome}. Use a professional and firm tone.`

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are a professional legal assistant who drafts formal legal letters.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 1000,
    temperature: 0.5,
  })

  const generatedText = response.choices?.[0]?.message?.content?.trim() ?? ""
  const tokenUsage = response.usage?.total_tokens ?? 0
  return { generatedText, tokenUsage, jobId: response.id }
}
