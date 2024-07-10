"use client"
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import axios from "axios";
import { DownloadIcon, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Tryquiz from "@/components/tryquiz";
import apiUrl from '@/config';
interface LearnPageProps {
  params: {
    name: string;
  };
}

const getAllCourses = async (): Promise<Course[]> => {
  return axios
    .get(`${apiUrl}/api/courses/courses`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default async function LearnPage({ params }: LearnPageProps) {
  const courses = await getAllCourses();
  console.log(courses);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-end gap-y-2">
        <h1 className="text-4xl font-bold">الدروس</h1>
        <p className="text-right text-lg text-muted-foreground">
          هذه الصفحة خاصة بالمقررات الدراسية التي قمت بدراستها
        </p>
      </div>

      <Separator className="mb-6 mt-4 px-8" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {/* @ts-ignore */}
        {courses.courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {

  const extractedquizes = course.quizzes;
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <div className="flex h-[200px] items-center justify-center rounded-t-xl bg-muted">
        <Image alt="Course thumbnail" width="64" height="64" src="/pdf.svg" />
      </div>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col items-end gap-1">
          <h3 className="line-clamp-2 text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.term} الفصل</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.video_url && (
              <Button variant="secondary" size="sm" asChild>
                <Link href={course.video_url} target="_blank">
                  <EyeIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {course.pdf_url && (
              <Button variant="indigo" size="sm" asChild>
                <Link href={course.pdf_url} download>
                  <DownloadIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {course.quizzes?.length! > 0 && <Tryquiz extractedquizes={extractedquizes!} />}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {course.teacher.firstname} {course.teacher.lastname}
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
