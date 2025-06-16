const formattedFileNameAsTitle = (fileName: string) => {
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

export default formattedFileNameAsTitle;
