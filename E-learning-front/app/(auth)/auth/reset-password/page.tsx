"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInForm } from "@/components/forms/sign-in-form";

import { Resetpasswordform } from "./resetpassword";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex h-screen items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
            <p className="text-balance text-muted-foreground">
              تسجيل الدخول للوصول إلى حسابك
            </p>
          </div>
          <Resetpasswordform token={token!} />
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
