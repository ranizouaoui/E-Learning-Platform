"use client";

import React from "react";

import Link from "next/link";
import { ParentIcon } from "@/icons/parent-icon";
import { TeacherIcon } from "@/icons/teacher-icon";
import { SignUpSchema, SignUpValues } from "@/schemas";
import { ERole } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { User2Icon, UserCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadcoursePdf } from "@/app/(main)/teacher/courses/_components/uploadpdf";
import apiUrl from "@/config";

const checkExistingparentParEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/auth/user/${email}`,
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data);
  }
};

type FieldName = keyof SignUpValues;

interface StepsType {
  id: string;
  name: string;
  fields?: FieldName[];
}

const steps: StepsType[] = [
  {
    id: "role",
    name: "Role Selection",
    fields: ["roles"],
  },
  {
    id: "personal",
    name: "Fundamental Information",
    fields: ["firstname", "lastname", "email", "tel"],
  },
  {
    id: "password",
    name: "Security and Privacy",
    fields: ["password", "confirmPassword"],
  },
  {
    id: "verification",
    name: "Teacher Verification",
  },
  {
    id: "finish",
    name: "Finishing Touches",
  },
];

export function SignUpForm() {
  const [isPending, startTransition] = React.useTransition();
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);

  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [previousStep, setPreviousStep] = React.useState<number>(0);
  const delta = currentStep - previousStep;

  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
      teacherverification: "",
      tel: "",
    },
  });

  const signUp = async (values: SignUpValues) => {
    try {
      const parent = await checkExistingparentParEmail(values.email);
      if (parent) {
        setError("البريد الإلكتروني موجود بالفعل");
        return;
      }

      console.log(file);
      //@ts-ignore

      values.teacherverification = file?.url;

      console.log("values" + values);
      startTransition(async () => {
        await axios.post("${apiUrl}/api/auth/signup", values);
        setSuccess("تم إنشاء الحساب بنجاح");
      });
    } catch (error: any) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data);
    }
  };

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await signUpForm.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;
    if (currentStep === 1) {
      const parent = await checkExistingparentParEmail(
        signUpForm.getValues().email,
      );
      if (parent) {
        signUpForm.setError("email", {
          type: "manual",
          message: "البريد الإلكتروني موجود بالفعل",
        });

        return;
      }
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await signUpForm.handleSubmit(signUp)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const previous = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  console.log(signUpForm.getValues());

  return (
    <>
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(signUp)} className="grid gap-4">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FormField
                control={signUpForm.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>الدور</FormLabel>
                    <FormDescription>
                      اختر الدور الذي يصفك بشكل أفضل
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                      className="grid w-full grid-cols-2 gap-4 pt-4"
                    >
                      <FormItem>
                        <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              // @ts-ignore
                              value={Array(ERole.ROLE_PARENT)}
                              className="sr-only"
                            />
                          </FormControl>
                          <RoleCard
                            title="ولي"
                            description="إضافة أطفالك وإدارة تقدمهم في التعلم"
                            checked={field.value[0] === ERole.ROLE_PARENT}
                            icon={ParentIcon}
                          />
                        </FormLabel>
                      </FormItem>

                      <FormItem>
                        <FormLabel className="ring-white/60 ring-offset-2 ring-offset-sky-600 [&:has([data-state=checked])>div]:ring-2">
                          <FormControl>
                            <RadioGroupItem
                              // @ts-ignore
                              value={Array(ERole.ROLE_TEACHER)}
                              className="sr-only"
                            />
                          </FormControl>
                          <RoleCard
                            title="معلم"
                            description="إنشاء وإدارة الدروس والمواد التعليمية"
                            checked={field.value[0] === ERole.ROLE_TEACHER}
                            icon={TeacherIcon}
                          />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      الاسم الأول
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      اسم العائلة
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      البريد الإلكتروني
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      الهاتف
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-4"
            >
              <FormField
                control={signUpForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}
          {currentStep === 3 &&
            signUpForm.getValues().roles[0] === ERole.ROLE_TEACHER && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-4"
              >
                <UploadcoursePdf
                  file={file}
                  onchange={(file) => setFile(file)}
                />
              </motion.div>
            )}

          {currentStep === 4 && isPending && (
            <div className="flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-t-2 border-sky-500" />
            </div>
          )}

          {currentStep === 4 && success && (
            <>
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="rounded-xl border border-green-200 bg-green-100 p-6"
              >
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircledIcon className="h-16 w-16 text-green-600" />
                  <h1 className="text-xl font-semibold">
                    تم إنشاء حسابك بنجاح
                  </h1>
                  <p className="text-center text-muted-foreground">
                    تم إنشاء حسابك بنجاح، يمكنك الآن تسجيل الدخول
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </form>
      </Form>

      {currentStep !== 4 && (
        <div className="pt-6">
          <Button
            type="button"
            variant="primary"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="w-full"
          >
            {currentStep === steps.length - 1 ? "إنهاء" : "التالي"}
          </Button>

          <Button
            type="button"
            onClick={previous}
            disabled={currentStep === 0 || currentStep === steps.length - 1}
            className="mt-4 w-full"
          >
            السابق
          </Button>
        </div>
      )}

      {currentStep === 4 && (
        <div className="pt-6">
          <Button type="button" className="w-full" asChild>
            <Link href="/auth/sign-in">تسجيل الدخول</Link>
          </Button>
        </div>
      )}
    </>
  );
}

interface RoleCardProps {
  title: string;
  description: string;
  checked: boolean;
  icon: React.ElementType;
}

function RoleCard({ title, description, checked, icon: Icon }: RoleCardProps) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center space-y-4 rounded-xl border bg-muted/40 p-6 transition-colors duration-200 ease-in-out",
        {
          "border-2 border-sky-700 bg-sky-400": checked,
          "bg-white text-muted-foreground": !checked,
        },
      )}
    >
      <Icon className="h-10 w-10" />
      <div className="flex flex-col items-center space-y-1">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-center text-sm">{description}</p>
      </div>
    </div>
  );
}
