import React from "react";

import { Course, ERole } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./ui/button";

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
    }]

export function CoursesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الاسم</TableHead>
          <TableHead>الثلاثي</TableHead>
          <TableHead>المستوى الدراسي</TableHead>
          <TableHead>المادة</TableHead>
          <TableHead>تاريخ الإنشاء</TableHead>
          <TableHead>المعلم</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.term}</TableCell>
            <TableCell>{course.schoolLevel}</TableCell>
            <TableCell>{course.subject}</TableCell>
            <TableCell>{course.date_of_addition}</TableCell>
            <TableCell>
              {course.teacher.firstname} {course.teacher.lastname}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button size="sm">عرض</Button>
                <Button variant="destructive" size="sm">
                  حذف
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
