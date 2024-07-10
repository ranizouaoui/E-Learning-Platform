import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handelAuth=()=>{
    const userId="mpasas"
    if(!userId) throw new Error("You must be signed in to access this route")
    return {userId};
}
 

export const ourFileRouter = {
    
    coursePdf:f({
        "pdf":{maxFileSize:"512GB",maxFileCount:1},
    }).middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),

  
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;