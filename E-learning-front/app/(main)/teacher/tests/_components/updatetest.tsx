"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { AddTestSchema, AddTestValues } from "@/schemas";
import { Teacher, Test } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UploadcoursePdf } from "../../courses/_components/uploadpdf";
import apiUrl from "@/config";

interface props {
  test: Test;
}

function UpdateTest({ test }: props) {
  const router = useRouter();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [filecorrection, setFileCorrection] = React.useState<File | null>(null);

  const addTestForm = useForm<AddTestValues>({
    resolver: zodResolver(AddTestSchema),
    defaultValues: {
      name: test.name,
      pdf_url: test.pdf_url,
      description: test.description,
      schoolLevel: test.schoolLevel,
      difficulty: String(test.difficulty),
      subject: test.subject,
      duration: String(test.duration),
      term: test.term,
      correction_pdf_url: test.correction_pdf_url,
    },
  });

  const onSubmit = async (values: AddTestValues) => {
    try {
      await axios
        .put(`${apiUrl}/api/tests/` + test.id, {
          ...values,
          teacher: test.teacher,
        })
        .then((res) => {
          setSuccess("تمت إضافة الاختبار بنجاح");
          router.refresh();
        })
        .catch((error) => {
          setError("حدث خطأ ما");
        });
    } catch (error) {
      setError("حدث خطأ ما");
    }
  };
  console.log(addTestForm.formState.errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primaryOutline">
          {/* write ta3dil en arabe */}
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mt-4">
          <Form {...addTestForm}>
            <form
              onSubmit={addTestForm.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <FormField
                control={addTestForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>اسم الاختبار</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label>رفع ملف الاختبار</Label>

              <UploadcoursePdf file={file} onchange={(file) => setFile(file)} />

              <FormField
                control={addTestForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>الوصف</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addTestForm.control}
                name="schoolLevel"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>المستوى الدراسي</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addTestForm.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>الفصل</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addTestForm.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>الصعوبة</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addTestForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>المادة</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addTestForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>المدة</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label>رابط ملف التصحيح</Label>

              <UploadcoursePdf
                file={filecorrection}
                onchange={(file) => setFileCorrection(file)}
              />

              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  إضافة
                </Button>
              </div>

              {error && (
                <div className="flex justify-end rounded-xl border-e-4 border-red-600 bg-red-200 p-4 px-6 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="flex justify-end rounded-xl border-e-4 border-green-600 bg-green-200 p-4 px-6 text-sm font-medium text-green-600">
                  {success}
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTest;
