import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Cloud, Files } from "lucide-react";
import Dropzone from "react-dropzone";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const UploadDropzone = ({ file, onchange }: AccesTeacherProps) => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const { startUpload } = useUploadThing("coursePdf", {
    onUploadError(error) {
      setErrorMessage("فشل في تحميل الملف");
      setError(true);
      router.refresh();
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });
  const [processing, setProcessing] = useState(true);
  const [iscompleted, setIsCompleted] = useState(false);

  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);

        const res = await startUpload(acceptedFiles);
        if (res) {
          console.log("file from" + res[0]);
          setIsCompleted(true);

          //@ts-ignore
          onchange && onchange(res[0]);

          router.refresh();
        }

        setUploadProgress(100);
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div
            {...getRootProps()}
            className="m-4 h-64 rounded-lg border border-dashed border-gray-300"
          >
            <div className="flex h-full w-full items-center justify-center hover:bg-gray-100">
              <label
                htmlFor="file"
                className="flex w-full cursor-pointer flex-col items-center  justify-center  rounded-lg hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <Cloud className="h-6 w-6 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    اسحب وأسقط ملفك هنا أو{" "}
                    <span className="text-primary">تصفح</span>
                  </p>
                  <p className="text-sm ">ملاحظة: يتم قبول ملفات pdf فقط</p>
                </div>
                {acceptedFiles && acceptedFiles[0] && !error ? (
                  <div className="outiline flex max-w-xs items-center overflow-hidden rounded-md bg-white outline-[1px] outline-primary">
                    <div className="flex h-4 flex-row place-items-center px-3 py-2">
                      <Files className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-full truncate px-3 py-2 text-sm">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {error ? (
                  <div className="outiline flex max-w-xs items-center overflow-hidden rounded-md bg-white outline-[1px] outline-primary">
                    <div className="flex h-4 flex-row place-items-center px-3 py-2">
                      <Files className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-full truncate px-3 py-2 text-sm text-red-500">
                      خطأ في تحميل الملف
                    </div>
                  </div>
                ) : null}
                {isUploading ? (
                  <div className="mx-auto mt-4 w-full max-w-xs ">
                    <Progress
                      value={uploadProgress}
                      className={cn(
                        "h-1",
                        uploadProgress === 100 ? "bg-primary" : "bg-gray-300",
                      )}
                    />
                    <span className="mt-2 flex items-center justify-center text-gray-500">
                      {uploadProgress === 100 &&
                        processing &&
                        !error &&
                        !iscompleted && (
                          <div className=" flex gap-x-2">
                            <p>جاري التحميل</p>
                          </div>
                        )}
                      {uploadProgress === 100 &&
                        !processing &&
                        !error &&
                        iscompleted && (
                          <div className=" flex gap-x-2">
                            <p>تم التحميل</p>
                          </div>
                        )}
                    </span>
                  </div>
                ) : null}
              </label>
              <input {...getInputProps()} accept="application/pdf" />
            </div>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

interface AccesTeacherProps {
  file: File | null;
  onchange?: (file: File) => void;
}

export const UploadcoursePdf = ({ file, onchange }: AccesTeacherProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iscompleted, setIsCompleted] = useState(false);
const [uploadedFileName, setUploadedFileName] = useState("");
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Input
          type="text"
          placeholder={uploadedFileName || "تحميل الملف"}
          className="w-full  cursor-pointer text-right"
        />
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone file={file} onchange={(file) => {
          onchange && onchange(file);
          setIsCompleted(true);
          setUploadedFileName(file.name);
        }} />
        {iscompleted && (
          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)} className="mr-2 bg-green-500 text-white hover:bg-green-600">
              موافقة
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
