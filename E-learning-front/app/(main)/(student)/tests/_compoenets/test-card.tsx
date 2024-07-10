"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Test } from "@/types";
import axios from "axios";
import { DownloadIcon, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Tryquiz from "@/components/tryquiz";

interface testCardProps {
  test: Test;
}

function TestCard({ test }: testCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <div className="flex h-[200px] items-center justify-center rounded-t-xl bg-muted">
        <Image alt="test thumbnail" width="64" height="64" src="/pdf.svg" />
      </div>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col items-end gap-1">
          <h3 className="line-clamp-2 text-lg font-semibold">{test.name}</h3>
          <p className="text-sm text-muted-foreground">{test.term} الفصل</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {test.teacher.firstname} {test.teacher.lastname}
            </span>
            <Image
              alt="Instructor"
              className="overflow-hidden rounded-full object-cover"
              width="24"
              height="24"
              src="/placeholder.svg"
              style={{
                aspectRatio: "24/24",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
