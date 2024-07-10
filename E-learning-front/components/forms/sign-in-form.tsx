"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInSchema, SignInValues } from "@/schemas";
import { ERole } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useCookies } from "next-client-cookies";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AxiosSignInResponse {
  id: string;
  email: string;
  accessToken: string;
  tokenType: string;
  roles: string[];
  verified: boolean;
}

export function SignInForm() {
  const cookies = useCookies();
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    try {
      const response = await axios.post<AxiosSignInResponse>(
        "http://localhost:8080/api/auth/signin",
        values
      );

      const fetchIfTheTeacherIsActivated = async (): Promise<boolean> => {
        const res = await axios.get(
          `http://localhost:8080/api/auth/user/${response.data.email}`
        );
        if (
          res.data.verified === false &&
          response.data.roles.includes(ERole.ROLE_TEACHER)
        ) {
          setError("لم يتم تفعيل حسابك بعد");
          console.log("Teacher is not activated");
          return false;
        }
        return true;
      };

      const isActivated = await fetchIfTheTeacherIsActivated();
      if (!isActivated) return;

      cookies.set("accessToken", response.data.accessToken, { secure: true, path: '/' });
      cookies.set("email", response.data.email, { secure: true, path: '/' });

      if (response.data.roles.includes(ERole.ROLE_ADMIN)) {
        router.push("/admin/dashboard");
      } else if (response.data.roles.includes(ERole.ROLE_PARENT)) {
        router.push("/auth/profile");
      } else if (response.data.roles.includes(ERole.ROLE_TEACHER)) {
        cookies.set("teacherId", response.data.id.toString(), { secure: true, path: '/' });
        router.push("/teacher/courses");
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      }
    }
  };

  return (
    <div>
      <Form {...signInForm}>
        <form
          className="grid gap-4"
          onSubmit={signInForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <div className="mr-auto inline-block text-sm"></div>
                  <FormLabel> البريد الإلكتروني</FormLabel>
                </div>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <div className="mr-auto inline-block text-sm"></div>
                  <FormLabel>كلمة المرور</FormLabel>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="flex justify-end rounded-xl border-e-4 border-red-600 bg-red-200 p-4 px-6 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <Button variant="primary" type="submit" className="w-full">
            تسجيل الدخول
          </Button>
          <div className="mt-4 text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link
              href="/auth/sign-up"
              className="font-bold text-sky-400 underline underline-offset-4"
            >
              سجل الآن
            </Link>
            <br />
            <Link
              href="/auth/reset"
              className="font-bold text-sky-400 underline underline-offset-4"
            >
              نسيت كلمة المرور
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
