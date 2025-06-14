import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouterTS } from "@/app/api/uploadthing/core";

export const { useUploadThing } = generateReactHelpers<OurFileRouterTS>();
