import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generatePdfSummaryFromOpenAI = async (pdfText: string) => {
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
          content: `Transform the following PDF into a viral-style summary using emojis that match the document's context and format your response in markdown with proper line breaks: ${pdfText}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });
    if (!response.choices[0].message.content) {
      throw new Error("Empty response from OpenAI.");
    }
    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      if (error?.status === 429 && error?.code === "insufficient_quota") {
        throw new Error(
          "OpenAI API quota exceeded. Please check your billing or usage limits."
        );
      }
    }
    return error;
  }
};

export { generatePdfSummaryFromOpenAI };
