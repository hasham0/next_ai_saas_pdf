"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import UploadFormInput from "@/components/upload/upload-form-input";
import { generatePdfSummary } from "@/lib/actions/upload-actions";
import { fileSchema } from "@/lib/zod";
import { useUploadThing } from "@/utils/uploadthing";

type Props = {};

const UploadForm = ({}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    onUploadBegin: (file) => {
      console.log("upload has begun for", file);
    },
  });
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const file = formData.get("file") as File;
      const validatedFields = fileSchema.safeParse({ file });
      if (!validatedFields.success) {
        setIsLoading(false);
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
      const response = await startUpload([file]);
      if (!response) {
        setIsLoading(false);
        toast.error("Something went wrong while uploading", {
          description: "please use a different file",
        });
      }
      toast.loading("Processing PDF...", {
        description: "Hang tight!, Our AI is processing your PDF",
      });

      const result = await generatePdfSummary(response);
      const { data = null, message = null } = result;
      if (data) {
        if (data.summary) {
          toast.success(data.message, {
            description: "Hang tight!, We are saving your summary",
          });
        }
        formRef.current?.reset();
      }
    } catch (error) {
      setIsLoading(false);
      formRef.current?.reset();
    }
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleOnSubmit}
      />{" "}
    </div>
  );
};

export default UploadForm;
