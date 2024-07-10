
import { generateComponents } from "@uploadthing/react";
 
import type { OurFileRouter } from "@/app/api/uploadthing/core";

import { generateUploadButton,generateUploadDropzone } from "@uploadthing/react";

import { generateReactHelpers } from "@uploadthing/react";
 
export const {   useUploadThing } =
  generateReactHelpers<OurFileRouter>();

  export const UploadButton = generateUploadButton<OurFileRouter>();

  
export const {UploadDropzone}=generateComponents<OurFileRouter>();