"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ResetPassword, ResetPasswordValues } from "@/schemas";
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

interface Props {
  token: string;
}

export function Resetpasswordform({ token }: Props) {
  const cookies = useCookies();
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const signInForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPassword),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordValues) => {
    try {
      console.log(token);

      const response = await axios.post(
        `${apiUrl}/api/auth/reset-password`,
        {
          token: token,
          newPassword: values.newPassword,
        },
      );

      router.push("/auth/sign-in");
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
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <div className="mr-auto inline-block text-sm"></div>
                  <FormLabel> كلمة المرور</FormLabel>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <div className="mr-auto inline-block text-sm"></div>
                  <FormLabel> تأكيد كلمة المرور</FormLabel>
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
            {/* Send Reset Email in arabic */}
            إرسال بريد إلكتروني
          </Button>
        </form>
      </Form>
    </div>
  );
}
