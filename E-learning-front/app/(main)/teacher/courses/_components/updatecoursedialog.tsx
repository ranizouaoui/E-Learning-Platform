"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { AddCourseSchema, AddCourseValues } from "@/schemas";
import { Course, Quiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import apiUrl from '@/config';
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
import { Label } from "@/components/ui/label";

import { QuizModel } from "./addquizmodal";
import { UploadcoursePdf } from "./uploadpdf";

interface AddCourseProps {
  course: Course;
}

export function UpdateCourseDialog({ course }: AddCourseProps) {
  const router = useRouter();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [quizarreay, setQuizarreay] = React.useState<Quiz[]>();
  const [file, setFile] = React.useState<File | null>(null);

  const addCourseForm = useForm<AddCourseValues>({
    resolver: zodResolver(AddCourseSchema),
    defaultValues: {
      video_url: course.video_url,
      pdf_url: course.pdf_url,
      name: course.name,
      schoolLevel: course.schoolLevel,
      subject: course.subject,
      term: String(course.term),
      date_of_addition: new Date().toISOString(),
      quizzes: course.quizzes || [],
    },
  });

  const API_URL = `${apiUrl}/api/courses/${course.id}`;

  const onSubmit = async (values: any) => {
    console.log("values", values);
    values.quizzes = course.quizzes ? course.quizzes : [];
    // @ts-ignore
    values.pdf_url = file?.url || values.pdf_url;
    console.log(values);

    try {
      await axios
        .put(API_URL, {
          ...values,
          teacher: course.teacher,
          quizzes: course.quizzes,
        })
        .then((res) => {
          console.log(res.data);
          setSuccess("تمت إضافة الدرس بنجاح");
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          setError("حدث خطأ ما");
        });
    } catch (error) {
      console.error(error);
      setError("حدث خطأ ما");
    }
  };

  console.log(addCourseForm.formState.errors);

  //   const handelAddnewquiztothequizarreay = (quiz: Quiz[]) => {
  //     setQuizarreay([...quizarreay, ...quiz]);
  //   };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="indigoOutline" size="sm">
          تعديل
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة درس جديد</DialogTitle>
          <DialogDescription>قم بإدخال بيانات الدرس الجديد</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Form {...addCourseForm}>
            <form
              onSubmit={addCourseForm.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <FormField
                control={addCourseForm.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>رابط الفيديو</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label className="text-right text-sm">رفع ملف الدرس</Label>
              <UploadcoursePdf file={file} onchange={(file) => setFile(file)} />
              <FormField
                control={addCourseForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>الاسم</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addCourseForm.control}
                name="schoolLevel"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>المرحلة</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addCourseForm.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>الفصل</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addCourseForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>المادة</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="primary" type="submit">
                إضافة
              </Button>

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
            {/* <QuizModel
              value={quizarreay}
              onchange={handelAddnewquiztothequizarreay}
            /> */}
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
