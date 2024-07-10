"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  label: string;
  href: string;
  iconSrc: string;
}

export function SidebarItem({ label, href, iconSrc }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      variant={active ? "primaryOutline" : "default"}
      className="h-[55px] justify-between"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height="32"
          width="32"
        />
        {label}
      </Link>
    </Button>
  );
}
