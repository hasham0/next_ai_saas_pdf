const formattedFileNameAsTitle = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    )
    .join(" ")
    .trim();
};

const formatFileName = (url: string): string => {
  const fileName = url.split("/").pop() || "";
  return fileName
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase()
    )
    .join(" ")
    .trim();
};
const formatSummaryText = (summary: string): string => {
  return summary
    .replace(/^```markdown\n|```$/g, "")
    .replace(/^#+\s?/gm, "")
    .replace(/^•\s?/gm, "")
    .replace(/[*_~`]/g, "")
    .trim();
};

export { formattedFileNameAsTitle, formatFileName, formatSummaryText };
