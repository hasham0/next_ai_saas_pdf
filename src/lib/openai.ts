import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generatePdfSummaryFromOpenAI = async (pdfUrl: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform the following PDF into a viral-style summary using emojis that match the document's context and format your response in markdown with proper line breaks: ${pdfUrl}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    return response.choices[0].message.content;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("OpenAI API rate limit exceeded.");
    }
    throw new Error(error?.message);
  }
};

export { generatePdfSummaryFromOpenAI };
