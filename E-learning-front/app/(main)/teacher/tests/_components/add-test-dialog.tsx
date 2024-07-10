"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { AddTestSchema, AddTestValues } from "@/schemas";
import { Teacher, Test } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadcoursePdf } from "../../courses/_components/uploadpdf";
import apiUrl from "@/config";

interface AddTestProps {
  teacher: Teacher;
}

const schoolLevels = ["ابتدائي", "إعدادي", "ثانوي"];
const terms = ["الفصل الأول", "الفصل الثاني", "الفصل الثالث", "الفصل الرابع", "الفصل الخامس", "الفصل السادس"];
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
const difficulties = ["سهل", "متوسط", "صعب"];
const durations = ["30 دقيقة", "60 دقيقة", "90 دقيقة", "120 دقيقة"];

export function AddTestDialog({ teacher }: AddTestProps) {
  const router = useRouter();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [filecorrection, setFileCorrection] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [showFormModal, setShowFormModal] = React.useState(false);

  const addTestForm = useForm<AddTestValues>({
    resolver: zodResolver(AddTestSchema),
    defaultValues: {
      name: "",
      pdf_url: "",
      description: "",
      schoolLevel: "",
      difficulty: "",
      subject: "",
      duration: "",
      term: "",
      correction_pdf_url: "",
    },
  });

  const onSubmit = async (values: AddTestValues) => {
    setLoading(true);
    //@ts-ignore
    values.pdf_url = file?.url;
    //@ts-ignore
    values.correction_pdf_url = filecorrection?.url;
    console.log(values);
    try {
      await axios
        .post(`${apiUrl}/api/tests`, {
          ...values,
          teacher: teacher,
        })
        .then((res) => {
          setSuccess("تمت إضافة الاختبار بنجاح");
          setShowSuccessModal(true);
          setLoading(false);
          router.refresh();
        })
        .catch((error) => {
          setError("حدث خطأ ما");
          setLoading(false);
        });
    } catch (error) {
      setError("حدث خطأ ما");
      setLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setShowFormModal(false);
  };

  return (
    <>
      <Dialog open={showSuccessModal} onOpenChange={handleCloseSuccessModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>نتيجة العملية</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {loading ? (
              <div className="flex justify-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <p>{success}</p>
            )}
          </DialogDescription>
          {!loading && (
            <DialogFooter>
              <Button onClick={handleCloseSuccessModal}>إغلاق</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showFormModal} onOpenChange={setShowFormModal}>
        <DialogTrigger asChild>
          <Button variant="primaryOutline" onClick={() => setShowFormModal(true)}>
            إضافة اختبار جديد
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>إضافة اختبار جديد</DialogTitle>
            <DialogDescription>
              قم بإدخال بيانات الاختبار الجديد
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Form {...addTestForm}>
              <form
                onSubmit={addTestForm.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4"
                id="addTestForm"
              >
                <div className="col-span-2 space-y-2">
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

                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <div className="mr-auto inline-block text-sm"></div>
                      <FormLabel>ملف الاختبار</FormLabel>
                    </div>
                    <UploadcoursePdf
                      file={file}
                      onchange={(file) => setFile(file)}
                    />
                  </div>
                </div>

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
                        <Controller
                          name="schoolLevel"
                          control={addTestForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المستوى الدراسي" />
                              </SelectTrigger>
                              <SelectContent>
                                {schoolLevels.map((level) => (
                                  <SelectItem key={level} value={level}>
                                    {level}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                        <Controller
                          name="term"
                          control={addTestForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الفصل" />
                              </SelectTrigger>
                              <SelectContent>
                                {terms.map((term) => (
                                  <SelectItem key={term} value={term}>
                                    {term}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                        <Controller
                          name="difficulty"
                          control={addTestForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر الصعوبة" />
                              </SelectTrigger>
                              <SelectContent>
                                {difficulties.map((difficulty) => (
                                  <SelectItem key={difficulty} value={difficulty}>
                                    {difficulty}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                        <Controller
                          name="subject"
                          control={addTestForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المادة" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                        <Controller
                          name="duration"
                          control={addTestForm.control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="اختر المدة" />
                              </SelectTrigger>
                              <SelectContent>
                                {durations.map((duration) => (
                                  <SelectItem key={duration} value={duration}>
                                    {duration}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="col-span-2 flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="mr-auto inline-block text-sm"></div>
                    <FormLabel>ملف الإجابة</FormLabel>
                  </div>
                  <UploadcoursePdf
                    file={filecorrection}
                    onchange={(file) => setFileCorrection(file)}
                  />
                </div>

                {error && (
                  <div className="flex justify-end rounded-xl border-e-4 border-red-600 bg-red-200 p-4 px-6 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="col-span-2 flex justify-end rounded-xl border-e-4 border-green-600 bg-green-200 p-4 px-6 text-sm font-medium text-green-600">
                    {success}
                  </div>
                )}
              </form>
            </Form>
          </div>
          <DialogFooter>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" form="addTestForm">
                إضافة
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
