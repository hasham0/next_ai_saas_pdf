import getDBConnection from "./db";

const getSummaries = async (userId: string) => {
  const sql = await getDBConnection();
  return await sql`SELECT * FROM pdf_summaries WHERE user_id=${userId} ORDER BY created_at DESC;`;
};
export { getSummaries };
