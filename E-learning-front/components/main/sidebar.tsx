"use client";

import React from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/actions";
import {
  BookMarkedIcon,
  RadioIcon,
  SettingsIcon,
  TestTubeIcon,
} from "lucide-react";
import { useCookies } from "next-client-cookies";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SidebarItem } from "./sidebar-item";
import { SidebarButton } from "./teacher/sidebar-button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const cookies = useCookies();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-screen flex-col border-r-2 bg-muted/40 px-4 lg:fixed lg:w-[300px]",
        className,
      )}
    >
      <div className="flex items-center gap-x-4 pb-7 pl-4 pt-8">
        <Image src="/mascot.svg" width={40} height={40} alt="Mascot" />
        <h1 className="text-2xl font-semibold">تعلم اونلاين</h1>
      </div>
      <div className="flex flex-1 flex-col gap-y-4">
        <SidebarItem label="الدروس" href="/learn" iconSrc="/open-book.svg" />
        <SidebarItem
          label="دروس التدارك"
          href="/remedial-lessons"
          iconSrc="/archive.svg"
        />
        <SidebarItem label="الامتحانات" href="/tests" iconSrc="/grade.svg" />

        <div className="mt-auto flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="mb-4 h-[55px] w-full justify-between">
                <Image
                  src="/user.svg"
                  alt="Profile"
                  className="mr-5"
                  height="32"
                  width="32"
                />
                الحساب
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="primaryOutline"
                  className="h-[55px] w-full justify-between"
                  onClick={() => {
                    router.push("/auth/profile?switch=true");
                  }}
                >
                  <Image
                    src="/refresh.svg"
                    alt="Switch account"
                    className="mr-5"
                    height="32"
                    width="32"
                  />
                  تبديل الحساب
                </Button>
                <Button
                  variant="destructiveOutline"
                  className="h-[55px] w-full justify-between"
                  onClick={() => {
                    signOut();
                    cookies.remove("accessToken");
                    cookies.remove("email");
                    router.push("/auth/sign-in");
                  }}
                >
                  <Image
                    src="/logout.svg"
                    alt="Logout"
                    className="mr-5"
                    height="32"
                    width="32"
                  />
                  تسجيل الخروج
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <SidebarButton
            label="الإعدادات"
            icon={SettingsIcon}
            onClick={() => router.push("/settings")}
            isActive={pathname.startsWith("/settings")}
          />
        </div>
      </div>
    </div>
  );
}
