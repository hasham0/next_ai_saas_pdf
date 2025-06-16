"use server";

import { ClientUploadedFileData } from "uploadthing/types";
import { generatePdfSummaryFromGeminia } from "../geminiai";
import { generatePdfSummaryFromOpenAI } from "../openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";

type UploadResponse =
  | ClientUploadedFileData<any>[]
  | [
      {
        name: string;
        serverData: {
          userId: string;
          file: string;
        };
        url: string;
      },
    ];

const generatePdfSummary = async (
  uploadResponse: UploadResponse
): Promise<{
  success: boolean;
  message: string;
  data: { summery: object } | null;
}> => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }
  const {
    name: fileName,
    serverData: { userId, file },
    url: pdfUrl,
  } = uploadResponse[0];

  if (!pdfUrl)
    return { success: false, message: "file upload failed", data: null };
  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    let summeryResult;
    try {
      summeryResult = await generatePdfSummaryFromOpenAI(pdfText);
    } catch (error) {
      try {
        summeryResult = await generatePdfSummaryFromGeminia(pdfText);
      } catch (error) {
        if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
          console.error(
            "Gemini API failed after OpenAI quota exceeded.",
            error
          );
          throw new Error(
            "Failed to generate PDF summary with available AI providers."
          );
        }
      }
    }
    if (!summeryResult) {
      throw new Error(
        "Failed to generate PDF summary with available AI providers."
      );
    }
    return {
      success: true,
      message: "Saving PDF...",
      data: { summery: summeryResult },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "file upload failed",
        data: null,
      };
    }
  }
};

export { generatePdfSummary };
