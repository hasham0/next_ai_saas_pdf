"use client";

import { FormEvent, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type UploadFormInputProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    return (
      <form onSubmit={onSubmit} ref={ref} className="flex flex-col gap-6">
        <div className="flex items-center justify-end gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            disabled={isLoading}
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Processing
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";
export default UploadFormInput;
