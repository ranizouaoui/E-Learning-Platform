import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Test } from "@/types";
import { Button } from "@/components/ui/button";

interface TestCardProps {
  test: Test;
}

export function TestCard({ test }: TestCardProps) {
  return (
    <div className="flex flex-col rounded-xl border">
      <div className="flex h-[200px] items-center justify-center rounded-t-xl bg-muted">
        <Image alt="Course thumbnail" width="150" height="64" src="/pdf.svg" />
      </div>
      <div className="flex flex-col space-y-4 p-6">
        <a href="#">
          <h5 className="text-xl font-bold text-foreground">{test.name}</h5>
        </a>
        <p className="font-normal text-muted-foreground">{test.description}</p>
        {/* <p className="font-normal text-muted-foreground">{test.subject}</p>
        <p className="font-normal text-muted-foreground">{test.duration}</p> */}
        <div className="mt-auto flex flex-col space-y-2 pt-2.5">
          {test.pdf_url ? (
            <Button variant="secondary" className="w-full" asChild>
              <Link href={test.pdf_url} target="_blank">
                تحميل الامتحان
              </Link>
            </Button>
          ) : (
            <p className="text-muted-foreground">لا يوجد ملف امتحان متاح</p>
          )}
          {test.correction_pdf_url ? (
            <Button variant="secondary" className="w-full" asChild>
              <Link href={test.correction_pdf_url} target="_blank">
                عرض الحلول
              </Link>
            </Button>
          ) : (
            <p className="text-muted-foreground text-center pt-2.5">لا توجد حلول متاحة</p>
          )}
        </div>
      </div>
    </div>
  );
}
