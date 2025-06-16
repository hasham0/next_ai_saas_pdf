import { GoogleGenAI } from "@google/genai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompt";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});
function isGenAIError(
  error: unknown
): error is Error & { status?: number; code?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    ("status" in error || "code" in error)
  );
}

const generatePdfSummaryFromGeminia = async (pdfText: string) => {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform the following PDF into a viral-style summary using emojis that match the document's context and format your response in markdown with proper line breaks: ${pdfText}`,
            },
          ],
        },
      ],
      config: {
        maxOutputTokens: 1500,
        temperature: 0.7,
      },
    });
    if (!response.text) {
      throw new Error("Empty response from Gemini.");
    }
    return response.text;
  } catch (error: unknown) {
    if (isGenAIError(error)) {
      if (error.status === 429) {
        throw new Error("Gemini API rate limit exceeded.");
      } else if (error.status === 403) {
        throw new Error("Invalid or unauthorized Gemini API key.");
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error("Unknown error occurred while calling Gemini.");
    }
  }
};

export { generatePdfSummaryFromGeminia };
