"use server";

import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import getDBConnection from "@/lib/db";

const deleteSummaryAction = async ({ summaryId }: { summaryId: string }) => {
  try {
    const sql = await getDBConnection();
    const userId = (await currentUser())?.id;
    if (!userId) {
      throw new Error("user not found");
    }
    const result = await sql`
    DELETE FROM pdf_summaries WHERE id=${summaryId} 
    AND user_id=${userId} 
    RETURNING id;`;
    if (result.length > 0) {
      revalidatePath("/dashboard");
    }
    return { success: true, message: "Summary deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        success: false,
        message: error?.message || "failed to delete summary",
      };
    }
  }
};

export { deleteSummaryAction };
