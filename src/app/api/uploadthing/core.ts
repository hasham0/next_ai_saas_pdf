import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";

const fileInstance = createUploadthing();

const ourFileRouter = {
  pdfUploader: fileInstance({ pdf: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const user = await currentUser();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload completed for userId =>", metadata.userId);
      console.log("upload completed for file =>", file.ufsUrl);
      return {
        userId: metadata.userId,
        file: file.ufsUrl,
        fileName: file.name,
      };
    }),
} satisfies FileRouter;

type OurFileRouterTS = typeof ourFileRouter;

export { ourFileRouter, type OurFileRouterTS };
