import React from "react";

type Props = {
  params: Promise<{ summaryId: string }>;
};

export default async function SummaryPage({ params }: Props) {
  const { summaryId } = await params;
  console.log("🚀 ~ SummaryPage ~ summaryId:", summaryId);
  return <div>SummaryPage</div>;
}
