"use client";

import { FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const UploadFormInput = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="in-checked: flex justify-end gap-1.5">
        <Input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          required
          className=""
        />
        <Button type="submit">Upload your PDF</Button>
      </div>
    </form>
  );
};

export default UploadFormInput;
