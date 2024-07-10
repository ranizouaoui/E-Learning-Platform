import React from "react";
import axios from "axios";
import { cookies } from "next/headers";
import { BookIcon, RadioIcon } from "lucide-react";
import apiUrl from '@/config';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// URL de base pour les cours des enseignants
const coursesUrl = `${apiUrl}/api/courses/teachers/`;
// URL de base pour les réunions en direct des enseignants
const liveMeetingUrl = `${apiUrl}/meetings/teacher/`;

// Fonction pour obtenir tous les cours d'un enseignant par ID
const getTeacherCourses = async (teacherId: string | undefined) => {
  try {
    const response = await axios.get(`${coursesUrl}${teacherId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fonction pour obtenir toutes les réunions en direct d'un enseignant par email
const getAllMeetingsByEmail = async (email: string | undefined) => {
  try {
    const response = await axios.get(`${liveMeetingUrl}${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fonction pour récupérer les cookies du serveur
const getCookies = () => {
  const allCookies = cookies();
  const teacherId = allCookies.get("teacherId")?.value;
  const teacherEmail = allCookies.get("email")?.value;
  return { teacherId, teacherEmail };
};

export default async function TeacherDashboardPage() {
  const { teacherId, teacherEmail } = getCookies();

  const [courses, meetings] = await Promise.all([
    getTeacherCourses(teacherId),
    getAllMeetingsByEmail(teacherEmail),
  ]);

  const coursesCount = courses.length;
  const meetingsCount = meetings.length;

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>الرئيسية</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-4 md:grid-cols-1 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">جميع الدروس</CardTitle>
            <BookIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              جميع الاجتماعات المباشرة
            </CardTitle>
            <RadioIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetingsCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
