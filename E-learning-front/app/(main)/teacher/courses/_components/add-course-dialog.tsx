"use client";

import React from "react";
import apiUrl from '@/config';
import { useRouter } from "next/navigation";
import { AddCourseSchema, AddCourseValues } from "@/schemas";
import { Quiz, Teacher } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { QuizModel } from "./addquizmodal";
import { UploadcoursePdf } from "./uploadpdf";

interface AddCourseProps {
  teacher: Teacher;
}

export function AddCourseDialog({ teacher }: AddCourseProps) {
  const router = useRouter();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [quizarreay, setQuizarreay] = React.useState<Quiz[]>([]);
  const [file, setFile] = React.useState<File | null>(null);

  const addCourseForm = useForm<AddCourseValues>({
    resolver: zodResolver(AddCourseSchema),
    defaultValues: {
      video_url: "",

      name: "",
      schoolLevel: "",
      subject: "",
      term: "",
      date_of_addition: new Date().toISOString(),
      quizzes: quizarreay,
    },
  });
  const API_URL = `${apiUrl}/api/courses`;

  const onSubmit = async (values: AddCourseValues) => {
    values.quizzes = quizarreay;
    //@ts-ignore
    values.pdf_url = file?.url;
    console.log("values" + values);

    try {
      await axios
        .post(API_URL, {
          ...values,
          teacher: teacher,
          quizzes: quizarreay,
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
  console.log(addCourseForm.getValues());
  const handelAddnewquiztothequizarreay = (quiz: Quiz[]) => {
    setQuizarreay([...quizarreay, ...quiz]);
  };

  const schoolLevels = ["ابتدائي", "إعدادي", "ثانوي"];
  const terms = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث","الفصل الرابع","الفصل الخامس","الفصل السادس"];
  const subjects = [
    "اللغة العربية",
    "اللغة الفرنسية",
    "الرياضيات",
    "العلوم الطبيعية",
    "التاريخ",
    "الجغرافيا",
    "التربية الفنية",
    "التربية الرياضية",
    "الموسيقى",
    "التكنولوجيا",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primaryOutline">إضافة درس جديد</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[600px] overflow-y-auto">
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
                      <Input type="text" {...field} />
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
                      <Input type="text" {...field} />
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
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى الدراسي" />
                        </SelectTrigger>
                        <SelectContent>
                          {schoolLevels.map((level, index) => (
                            <SelectGroup key={index}>
                              <SelectItem value={level}>{level}</SelectItem>
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          {/*  */}
                          <SelectValue placeholder="الفصل" />
                        </SelectTrigger>
                        <SelectContent>
                          {terms.map((level, index) => (
                            <SelectGroup key={index}>
                              <SelectItem value={level}>{level}</SelectItem>
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المستوى الدراسي" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((level, index) => (
                            <SelectGroup key={index}>
                              <SelectItem value={level}>{level}</SelectItem>
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <QuizModel
                value={quizarreay}
                onchange={handelAddnewquiztothequizarreay}
              />
              <Button type="submit" variant="primary">
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
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
