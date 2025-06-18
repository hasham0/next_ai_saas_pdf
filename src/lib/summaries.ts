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
    console.log(error);
    return null;
  }
};
export { getSummaries, getSummaryById };
