import React from "react";

import { cookies } from "next/headers";
import Link from "next/link";
import { Course, Teacher } from "@/types";
import axios from "axios";
import apiUrl from '@/config';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AddCourseDialog } from "./_components/add-course-dialog";
import { CoursesTable } from "./_components/courses-table";

const getTeacherCourses = async (
  teacherId: string | undefined,
): Promise<Course[]> => {
  return axios
    .get(`${apiUrl}/api/courses/teachers/` + teacherId)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const getTeacherByEmail = async (
  email: string | undefined,
): Promise<Teacher> => {
  return axios
    .get(`${apiUrl}/api/teachers/` + email)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default async function TeacherCoursesPage() {
  const teacherId = cookies().get("teacherId")?.value;
  const teacherEmail = cookies().get("email")?.value;
  const teacher = await getTeacherByEmail(teacherEmail);
  const courses = await getTeacherCourses(teacherId);
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">الدروس</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جميع الدروس</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">جميع الدروس</h2>
        <AddCourseDialog teacher={teacher} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>جميع الدروس</CardTitle>
          <CardDescription>
            هنا يمكنك إدارة جميع الدروس الخاصة بك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CoursesTable courses={courses} />
        </CardContent>
      </Card>
    </div>
  );
}
