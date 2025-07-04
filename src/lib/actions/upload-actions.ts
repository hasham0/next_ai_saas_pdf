"use server";

import { revalidatePath } from "next/cache";
import { ClientUploadedFileData } from "uploadthing/types";
import { auth } from "@clerk/nextjs/server";
import getDBConnection from "@/lib/db";
import { generatePdfSummaryFromGeminia } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePdfSummaryFromOpenAI } from "@/lib/openai";
import { PDFSummaryTS } from "@/types";

type UploadResponse =
  | ClientUploadedFileData<{ [key: string]: string }>[]
  | [
      {
        name: string;
        serverData: {
          userId: string;
          file: string;
        };
        ufsUrl: string;
      },
    ];

const generatePdfTextAction = async ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl) {
    return {
      success: false,
      message: "file upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    if (!pdfText) {
      throw new Error(
        "Failed to generate PDF summary with available AI providers."
      );
    }
    return {
      success: true,
      message: "Saving PDF...",
      data: { pdfText },
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

const generatePdfSummaryAction = async (
  uploadResponse: UploadResponse
): Promise<{
  success: boolean;
  message: string;
  data: { summery: object; title: string } | null;
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
    // serverData: { userId, file },
    ufsUrl: pdfUrl,
  } = uploadResponse[0];

  if (!pdfUrl)
    return { success: false, message: "file upload failed", data: null };
  try {
    let summeryResult;
    try {
      summeryResult = await generatePdfSummaryFromOpenAI(
        uploadResponse[0].ufsUrl
      );
    } catch (error) {
      console.error(error);
      try {
        summeryResult = await generatePdfSummaryFromGeminia(
          uploadResponse[0].ufsUrl
        );
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
      message: "PDF summary generated successfully",
      data: {
        summery: summeryResult,
        title: fileName,
      },
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
  return {
    success: false,
    message: "file upload failed",
    data: null,
  };
};

const savedPDFSummary = async ({
  userId,
  original_file_url,
  summary_text,
  title,
  file_name,
}: PDFSummaryTS) => {
  try {
    const sql = await getDBConnection();
    return await sql`
    INSERT INTO pdf_summaries 
      (user_id, original_file_url, summary_text, title, file_name)
    VALUES 
      (${userId}, ${original_file_url}, ${summary_text}, ${title}, ${file_name})
    RETURNING *;
  `;
  } catch (error) {
    console.error("🚀 ~ savedPDFSummary ~ error:", error);
    throw error;
  }
};

const storePdfSummaryAction = async ({
  original_file_url,
  summary_text,
  title,
  file_name,
}: PDFSummaryTS) => {
  let savedPdfSummary;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not Found",
      };
    }

    savedPdfSummary = await savedPDFSummary({
      userId,
      original_file_url,
      summary_text,
      title,
      file_name,
    });
    if (!savedPdfSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary, please try again",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "file upload failed",
      };
    }
  }
  revalidatePath(`/summeries/${savedPdfSummary?.[0]?.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: savedPdfSummary,
  };
};
export {
  generatePdfSummaryAction,
  storePdfSummaryAction,
  generatePdfTextAction,
};
