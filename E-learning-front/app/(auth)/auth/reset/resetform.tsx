"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResetSchema, ResetValues } from "@/schemas";
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
import apiUrl from "@/config";

export function ResetForm() {
  const cookies = useCookies();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const router = useRouter();

  const signInForm = useForm<ResetValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResetValues) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/forgot-password`,
        values,
      );
      setSuccess("تم إرسال البريد الإلكتروني بنجاح");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
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

          <Button variant="primary" type="submit" className="w-full">
            {/* Send Reset Email in arabic */}
            إرسال بريد إلكتروني
          </Button>
          <Link href="/auth/sign-in">
            <p className="text-center text-sm text-primary">تسجيل الدخول</p>
          </Link>
        </form>
      </Form>
    </div>
  );
}
