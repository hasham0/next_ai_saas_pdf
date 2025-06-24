"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import UploadFormInput from "@/components/upload/upload-form-input";
import {
  generatePdfSummaryAction,
  generatePdfTextAction,
  storePdfSummaryAction,
} from "@/lib/actions/upload-actions";
import { fileSchema } from "@/lib/zod";
import { formattedFileNameAsTitle } from "@/utils/formats";
import { useUploadThing } from "@/utils/uploadthing";

type Props = {};

const UploadForm = ({}: Props) => {
  const router = useRouter();
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

      // ✅ Validate file
      const validated = fileSchema.safeParse({ file });
      if (!validated.success) {
        toast.error("Invalid file", {
          description:
            validated.error.flatten().fieldErrors.file?.[0] ||
            "Validation error",
        });
        return;
      }

      // ✅ Upload file
      toast("Uploading PDF...", { description: "We're uploading your file" });
      const response = await startUpload([file]);
      if (!response) {
        toast.error("Upload failed", { description: "Try a different file" });
        return;
      }

      const uploadedFile = response[0];
      const fileUrl = uploadedFile.ufsUrl;

      // ✅ Extract PDF Text
      toast("Extracting text...", {
        description: "Getting text from your PDF",
      });
      const textResult = await generatePdfTextAction({ fileUrl });
      if (!textResult?.success || !textResult.data?.pdfText) {
        toast.error("Text extraction failed", {
          description: textResult?.message,
        });
        return;
      }

      // ✅ Format File Name
      const formattedTitle = formattedFileNameAsTitle(file.name);

      // ✅ Generate Summary
      toast("Generating summary...", {
        description: "AI is summarizing your PDF",
      });
      const summaryResult = await generatePdfSummaryAction(response);
      if (!summaryResult.success || !summaryResult.data) {
        toast.error("Summary generation failed", {
          description: summaryResult.message,
        });
        return;
      }

      const summary = summaryResult.data.summery;

      // ✅ Store in Database
      toast("Saving summary...", {
        description: "Hang tight while we save it",
      });
      const storeResult = await storePdfSummaryAction({
        summary_text: summary,
        original_file_url: fileUrl,
        title: formattedTitle,
        file_name: file.name,
      });

      if (!storeResult.success) {
        toast.error("Save failed", { description: storeResult.message });
        return;
      }

      // ✅ Final Success
      toast.success("Summary saved!", { description: "Redirecting..." });
      router.push(`/summaries/${storeResult.data?.[0]?.id}`);
      formRef.current?.reset();
    } catch (error) {
      console.error("handleOnSubmit error:", error);
      toast.error("Unexpected error", { description: "Try again later" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleOnSubmit}
      />
      {isLoading && (
        <>
          <div className="relative mb-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center py-2">
              <span className="bg-white px-4 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
                Please wait while we process your PDF...
              </span>
            </div>
            <LoadingSkeleton />
          </div>
        </>
      )}
    </div>
  );
};

export default UploadForm;
