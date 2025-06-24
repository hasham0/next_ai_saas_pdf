"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import UploadFormInput from "@/components/upload/upload-form-input";
import {
  generatePdfSummaryAction,
  storePdfSummaryAction,
} from "@/lib/actions/upload-actions";
import { fileSchema } from "@/lib/zod";
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
      toast("Uploding PDF...", {
        description: "We are uploading your PDF for processing",
      });

      const response = await startUpload([file]);
      if (!response) {
        setIsLoading(false);
        toast.error("Something went wrong while uploading", {
          description: "please use a different file",
        });
        return;
      }
      toast("Processing PDF...", {
        description: "Hang tight!, Our AI is processing your PDF",
      });

      const summaryResult: {
        success: boolean;
        message: string;
        data: { summery: object; title: string } | null;
      } = await generatePdfSummaryAction(response);

      if (!summaryResult.success) {
        toast.error("Failed to generate summary", {
          description: "Something went wrong while processing the PDF.",
        });
        setIsLoading(false);
        formRef.current?.reset();
        return;
      }

      toast.success("Saving PDF", {
        description: "Hang tight!, We are saving your summary",
      });
      let storeResult;
      if (summaryResult && summaryResult.data) {
        const summary = summaryResult.data.summery;
        if (summary) {
          storeResult = await storePdfSummaryAction({
            summary_text: summary,
            original_file_url: response[0].ufsUrl,
            title: summaryResult.data.title,
            file_name: file.name,
          });
          toast.success(storeResult?.message, {
            description: "Your Summary has been saved",
          });
          router.push(`/summaries/${storeResult?.data?.[0]?.id}`);
          formRef.current?.reset();
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleOnSubmit ~ error:", error);
      toast.error("Failed to generate summary", {
        description: "Something went wrong while processing the PDF.",
      });
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
