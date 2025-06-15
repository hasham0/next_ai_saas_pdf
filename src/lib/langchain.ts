import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const fetchAndExtractPdfText = async (fileUrl: string) => {
  const respose = await fetch(fileUrl);
  const blob = await respose.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
};

export { fetchAndExtractPdfText };
// {
//   name: 'cc.pdf',
//   size: 152934,
//   key: 'Nv8ih58efnM515rv6dwD5yxFVBsMKzmWoS3kn2UNIQP6EGaR',
//   lastModified: 1748163588672,
//   serverData: {
//     userId: 'user_2yV4aQi8mKOwNWGwAh4UazOJr2z',
//     file: 'https://geaj7djbg7.ufs.sh/f/Nv8ih58efnM515rv6dwD5yxFVBsMKzmWoS3kn2UNIQP6EGaR'
//   },
//   url: 'https://utfs.io/f/Nv8ih58efnM515rv6dwD5yxFVBsMKzmWoS3kn2UNIQP6EGaR',
//   appUrl: 'https://utfs.io/a/geaj7djbg7/Nv8ih58efnM515rv6dwD5yxFVBsMKzmWoS3kn2UNIQP6EGaR',
//   ufsUrl: 'https://geaj7djbg7.ufs.sh/f/Nv8ih58efnM515rv6dwD5yxFVBsMKzmWoS3kn2UNIQP6EGaR',
//   customId: null,
//   type: 'application/pdf',
//   fileHash: 'dbfbd3b3bd822bb1080ba653e64d73b0'
// }
