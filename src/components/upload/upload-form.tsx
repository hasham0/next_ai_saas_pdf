"use client";

import { FormEvent } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/lib/zod";

type Props = {};

const UploadForm = ({}: Props) => {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    const validatedFields = fileSchema.safeParse({ file });
    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "invalide file"
      );
      return;
    }
    console.log("🚀 ~ handleOnSubmit ~ validatedFields:", validatedFields);
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput onSubmit={handleOnSubmit} />
    </div>
  );
};

export default UploadForm;
