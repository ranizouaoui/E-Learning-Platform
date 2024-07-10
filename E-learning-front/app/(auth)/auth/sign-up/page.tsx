import React from "react";

import Image from "next/image";

import { SignUpForm } from "@/components/forms/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[550px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">إنشاء حساب جديد</h1>
            <p className="text-balance text-muted-foreground">
              إنشاء حساب جديد للوصول إلى المنصة
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/bg-sign-in.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
