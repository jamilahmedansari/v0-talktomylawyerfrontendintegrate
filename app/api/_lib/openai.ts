import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

/**
 * Generates a legal letter using OpenAI based on the provided form data.
 * Mirrors the functionality of the backend/utils/openai.js file.
 */
export async function generateLetter(formData: any) {
  const { sender_details: sender, recipient_details: recipient, case_details: details } = formData;
  const prompt = `You are a professional legal assistant. Draft a formal letter regarding ${details.issue_type} based on the laws of ${recipient.county}, ${recipient.state}. The sender’s details are ${sender.full_name}, ${sender.address}, ${sender.email}. The recipient is ${recipient.full_name}, ${recipient.address}. The situation is as follows: ${details.description}. The desired outcome is ${details.desired_outcome}. Use a professional and firm tone.`;
  const response = await openai.createCompletion({
    model: 'gpt-4o',
    prompt,
    max_tokens: 1000,
    temperature: 0.5,
  });
  const generatedText = response.data.choices?.[0]?.text?.trim() ?? '';
  const tokenUsage = response.data.usage?.total_tokens ?? 0;
  return { generatedText, tokenUsage, jobId: response.data.id };
}
