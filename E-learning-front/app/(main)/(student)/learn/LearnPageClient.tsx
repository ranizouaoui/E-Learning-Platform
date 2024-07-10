'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import { DownloadIcon, EyeIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Tryquiz from "@/components/tryquiz";

interface LearnPageClientProps {
  courses: Course[];
}

const LearnPageClient: React.FC<LearnPageClientProps> = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4; // Adjust this number based on your preference

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!Array.isArray(courses)) {
    return <div>Invalid course data</div>;
  }

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
        {currentCourses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          السابق
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const extractedquizes = course.quizzes;
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <div className="flex h-[200px] items-center justify-center rounded-t-xl bg-muted">
        <Image alt="Course thumbnail" width="150" height="90" src="/pdf.svg" />
      </div>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col items-end gap-1 text-right">
          <h3 className="line-clamp-2 text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.term} الفصل</p>
        </div>
        <div className="flex gap-2 text-sm text-right justify-end">
          <span className="font-medium">
            {course.teacher?.firstname} {course.teacher?.lastname}
          </span>
          <User
            size={23}
            className="overflow-hidden rounded-full object-cover"
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex items-center justify-end">
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
            {course.quizzes?.length! > 0 && (
              <Tryquiz extractedquizes={extractedquizes!} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearnPageClient;
