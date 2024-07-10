import React from "react";

import Image from "next/image";
import { Course, ERole } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/container";
import { User } from 'lucide-react';
const courses: Course[] = [
  {
    id: "1",
    video_url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    pdf_url: "https://www.pdf.com",
    name: "الرياضيات",
    term: 1,
    schoolLevel: "المرحلة ابتدائية",
    subject: "الرياضيات",
    date_of_addition: "2021-10-10",
    teacher: {
      id: "1",
      firstname: "جون",
      lastname: "دو",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
      password: "password",
      roles: [
        {
          id: "1",
          name: ERole.ROLE_TEACHER,
        },
      ],
      verified: false,
      subjects: [],
    },
    },
  {
    id: "2",
    video_url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    pdf_url: "https://www.pdf.com",
    name: "الرياضيات",
    term: 1,
    schoolLevel: "المرحلة ابتدائية",
    subject: "الرياضيات",
    date_of_addition: "2021-10-10",
    teacher: {
      id: "1",
      firstname: "جون",
      lastname: "دو",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
      password: "password",
      roles: [
        {
          id: "1",
          name: ERole.ROLE_TEACHER,
        },
      ],
      verified: false,
      subjects: [],
    },
    },
  {
    id: "3",
    video_url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    pdf_url: "https://www.pdf.com",
    name: "الرياضيات",
    term: 1,
    schoolLevel: "المرحلة ابتدائية",
    subject: "الرياضيات",
    date_of_addition: "2021-10-10",
    teacher: {
      id: "1",
      firstname: "جون",
      lastname: "دو",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
      password: "password",
      roles: [
        {
          id: "1",
          name: ERole.ROLE_TEACHER,
        },
      ],
      verified: false,
      subjects: [],
    },
    },
   {
    id: "4",
    video_url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    pdf_url: "https://www.pdf.com",
    name: "الرياضيات",
    term: 1,
    schoolLevel: "المرحلة ابتدائية",
    subject: "الرياضيات",
    date_of_addition: "2021-10-10",
    teacher: {
      id: "1",
      firstname: "جون",
      lastname: "دو",
      email: "johndoe@example.com",
      date_of_birth: "1990-01-01",
      password: "password",
      roles: [
        {
          id: "1",
          name: ERole.ROLE_TEACHER,
        },
      ],
      verified: false,
      subjects: [],
    },
    },
  // {
  //   id: "5",
  //   videoUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  //   pdfUrl: "https://www.pdf.com",
  //   name: "اللغة الإنجليزية",
  //   term: 1,
  //   schoolLevel: "المرحلة ابتدائية",
  //   subject: "اللغة الإنجليزية",
  //   dateOfCreation: "2021-10-10",
  //   teacher: {
  //     id: "5",
  //     user: {
  //       id: "5",
  //       firstName: "سارة",
  //       lastName: "علي",
  //       email: "sarahali@example.com",
  //       dateOfBirth: "1991-03-25",
  //       password: "password",
  //       roles: [
  //         {
  //           id: "1",
  //           name: ERole.ROLE_TEACHER,
  //         },
  //       ],
  //     },
  //   },
  // },
];

export default function CoursesPage() {
  return (
    <Container>
      <div className="flex flex-col items-end">
        <h1 className="text-3xl font-bold">مرحبا بكم في صفحة الدروس</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          هنا يمكنك العثور على جميع الدروس المتاحة لدينا
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="w-full max-w-sm rounded-xl border">
      <div className="flex justify-center items-center h-[200px] rounded-t-xl overflow-hidden bg-gray-200">
        <Image
          alt="Course thumbnail"
          width={150}
          height={80}
          className="object-cover"
          src="/pdf.svg"
        />
      </div>

      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col items-end gap-1">
          <h3 className="line-clamp-2 text-lg font-semibold">
            {course.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {course.term === 1 && "الثلاثي الأول"}
            {course.term === 2 && "الثلاثي الثاني"}
            {course.term === 3 && "الثلاثي الثالث"}
            {" - "}
            {course.schoolLevel}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              تمارين
            </Button>
            <Button variant="indigo" size="sm">
              تحميل
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {course.teacher.firstname}{" "}
              {course.teacher.lastname}
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
        </div>
      </CardContent>
    </Card>
        ))}
      </div>
    </Container>
  );
}
