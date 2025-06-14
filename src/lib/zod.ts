import { z } from "zod";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 24 * 1024 * 1024, {
      message: "File size must be less than 24MB",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "File must be a PDF file",
    }),
});

export { fileSchema };
export type FileSchemaTypeTS = z.infer<typeof fileSchema>;
