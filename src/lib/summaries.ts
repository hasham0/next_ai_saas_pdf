import getDBConnection from "@/lib/db";

const getSummaries = async (userId: string) => {
  const sql = await getDBConnection();
  return await sql`SELECT * FROM pdf_summaries WHERE user_id=${userId} ORDER BY created_at DESC;`;
};

const getSummaryById = async (summaryId: string) => {
  try {
    const sql = await getDBConnection();
    return await sql`
      SELECT 
        id,
        title,
        file_name,
        summary_text,
        user_id,
        original_file_url,
        created_at,
        updated_at,
        status,
        CASE
          WHEN TRIM(summary_text) = '' THEN 0
          ELSE LENGTH(TRIM(summary_text)) - LENGTH(REPLACE(TRIM(summary_text), ' ', '')) + 1
        END AS word_count
        FROM pdf_summaries
        WHERE id = ${summaryId};`;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserUploadCount = async (userId: string) => {
  try {
    const sql = await getDBConnection();
    const result = await sql`
      SELECT COUNT(*) AS upload_count 
      FROM pdf_summaries 
      WHERE user_id = ${userId};`;
    return result[0].upload_count || 0;
  } catch (error) {
    console.log("🚀 ~ getUserUploadCount ~ error:", error);
    throw error;
  }
};
export { getSummaries, getSummaryById, getUserUploadCount };
