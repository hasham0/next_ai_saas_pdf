"use client";

import { FormEvent } from "react";
import { toast } from "sonner";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/lib/zod";
import { useUploadThing } from "@/utils/uploadthing";

type Props = {};

const UploadForm = ({}: Props) => {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded Successfully!");
    },
    onUploadError: (err) => {
      console.error("upload error", err);
      toast.error("Something went wrong while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = fileSchema.safeParse({ file });
    if (!validatedFields.success) {
      toast.error("Something went wrong while validating", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "invalide file",
      });
      return;
    }
    toast.loading("Uploding PDF...", {
      description: "We are uploading your PDF for processing",
    });
    const response = await startUpload([validatedFields.data.file]);
    if (!response) {
      toast.error("Something went wrong while uploading", {
        description: "please use a different file",
      });
    }
    toast.loading("Processing PDF...", {
      description: "Hang tight!, Our AI is processing your PDF",
    });
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput onSubmit={handleOnSubmit} />{" "}
    </div>
  );
};

export default UploadForm;
