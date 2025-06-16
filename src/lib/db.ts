"use server";

import { neon } from "@neondatabase/serverless";

const getDBConnection = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("Neon Database url is not defined");
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql;
};

export default getDBConnection;
