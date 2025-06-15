"use server";

import { generatePdfSummaryFromOpenAI } from "../openai";
import { fetchAndExtractPdfText } from "@/lib/langchain";

const generatePdfSummary = async (
  uploadResponse: [
    {
      name: string;
      serverData: {
        userId: string;
        file: string;
      };
      url: string;
    },
  ]
) => {
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
      console.error(error);
    }
    if (!summeryResult) {
      return {
        success: false,
        message: "failed to generate summery",
        data: null,
      };
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
