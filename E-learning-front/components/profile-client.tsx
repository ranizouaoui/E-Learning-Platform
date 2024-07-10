"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Student } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { ChildProfileBox } from "./child-profile-box";
import { AddChildForm } from "./forms/add-child-form";

interface ProfileClientProps {
  parent: {
    id: number;
    email: string;
    roles: [{ name: string }];
    children: Student[];
    firstname: string;
    lastname: string;
    pincode: string;
  };
}

const FormSchema = z.object({
  pincode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export function ProfileClient({ parent }: ProfileClientProps) {
  const router = useRouter();
  const params = useSearchParams();
  const switchAccount = params.get("switch");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pincode: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (values.pincode === parent.pincode) {
      router.push("/auth/profile");
    } else {
      form.setError("pincode", {
        message: "الرمز السري غير صحيح",
      });
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
      {!switchAccount && (
        <>
          {parent.children?.length > 0 &&
            parent.children.map((child) => (
              <ChildProfileBox key={child.id} child={child} href={`/learn`}  parentemail={parent.email}/>
            ))}
          {parent.children?.length === 0 ||
          parent.children?.length < 5 ||
          !parent.children ? (
            <div className="flex items-center justify-center">
              <AddChildForm />
            </div>
          ) : null}
        </>
      )}

      {switchAccount ? (
        <div className="col-span-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-end space-y-4">
                    <FormLabel>الرمز السري</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      يرجى إدخال الرمز السري المؤلف من 6 خانات
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="primary"
                className="w-full"
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                تأكيد
              </Button>
            </form>
          </Form>
        </div>
      ) : null}
    </div>
  );
}
