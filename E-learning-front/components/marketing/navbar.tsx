"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Container } from "@/components/container";

export function Navbar() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <div className="flex items-center gap-x-4 pb-7 pl-4 pt-8">
              <h1 className="text-2xl font-semibold">تعلم اونلاين</h1>
              <Image src="/mascot.svg" width={40} height={40} alt="Mascot" />
            </div>
            <div className="hidden md:flex md:gap-x-6">
              <Link
                href="/#features"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-slate-100"
              >
                الميزات
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="inline-flex rounded-lg px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-slate-100">
                      المنصة
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <h1 className="text-2xl font-semibold">تعلم اونلاين</h1>
                              <div className="mb-2 mt-4 text-lg font-medium">
                                موقع تعليمي يقدم دورات تعليمية
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                تعلم معنا وطور مهاراتك
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/platform/courses" title="الدروس">
                          تعلم معنا واحصل على شهادة معتمدة في نهاية الدورة
                          التدريبية
                        </ListItem>
                        <ListItem href="/platform/tests" title="الاختبارات">
                          اختبر معارفك واحصل على شهادة معتمدة
                        </ListItem>
                        {/* <ListItem href="/platform/exercices" title="التمارين">
                          تمارين تطبيقية لتحسين مهاراتك
                        </ListItem> */}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Link
                href="#pricing"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-slate-100"
              >
                الأسعار
              </Link>
              <Link
                href="/#content"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-muted-foreground hover:bg-slate-100"
              >
                المحتوى
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Button asChild>
                <Link href="/auth/sign-in">تسجيل الدخول</Link>
              </Button>
            </div>
            <Button variant="primary" asChild>
              <Link href="/auth/sign-up">إنشاء حساب</Link>
            </Button>
            <div className="-mr-1 md:hidden">
              <HamburgerMenuIcon className="h-6 w-6" />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}

interface ListItemProps {
  title: string;
  href: string;
  children: React.ReactNode;
  className?: string;
}

function ListItem({ title, href, children, className }: ListItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
