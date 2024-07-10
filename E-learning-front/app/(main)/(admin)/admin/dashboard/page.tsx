import React from 'react';
import axios from 'axios';
import { ERole } from "@/types";
import { BookOpenIcon, DollarSignIcon, Users2Icon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiUrl from '@/config';
// Function to fetch data
const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    // console.log(`Data fetched from ${url}:`, response.data); // Log data for debugging
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return { count: 0 }; // Provide a default value in case of error
  }
};

// Function to fetch parents
const fetchParents = async (url: string) => {
  try {
    const response = await axios.get(url);
    // console.log(`Parents fetched from ${url}:`, response.data); // Log data for debugging
    return response.data;
  } catch (error) {
    console.error(`Error fetching parents from ${url}:`, error);
    return []; // Provide a default value in case of error
  }
};

// Function to fetch teachers
const fetchTeachers = async (url: string) => {
  try {
    const response = await axios.get(url);
    // console.log(`Teachers fetched from ${url}:`, response.data); // Log data for debugging
    return response.data;
  } catch (error) {
    console.error(`Error fetching teachers from ${url}:`, error);
    return []; // Provide a default value in case of error
  }
};

// This function fetches all data needed for the page
const fetchDashboardData = async () => {
  const usersData = await fetchData(`${apiUrl}/api/admin/numberOfParents`);
  const teachersData = await fetchData(`${apiUrl}/api/admin/numberOfTeachers`);
  const lessonsData = await fetchData(`${apiUrl}/api/admin/numberOfTests`);
  const parentsData = await fetchParents(`${apiUrl}/api/admin/last5Parents`);
  const lastTeachersData = await fetchTeachers(`${apiUrl}/api/admin/last5Teachers`);

  return {
    usersCount: usersData,
    teachersCount: teachersData,
    lessonsCount: lessonsData,
    income: 5000, // Static value for income
    parents: parentsData,
    teachers: lastTeachersData,
  };
};

const AdminDashboardPage = async () => {
  const data = await fetchDashboardData();

  // console.log('Dashboard data:', data); // Log data for debugging

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatisticsCard
          title="المستخدمين"
          value={data.usersCount}
          percentage={5}
          icon={Users2Icon}
        />
        <StatisticsCard
          title="المعلمين"
          value={data.teachersCount}
          percentage={10}
          icon={Users2Icon}
        />
        <StatisticsCard
          title="الدروس"
          value={data.lessonsCount}
          percentage={-5}
          icon={BookOpenIcon}
        />
        <StatisticsCard
          title="المداخيل"
          value={data.income}
          percentage={0}
          icon={DollarSignIcon}
        />
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>المستخدمين الجدد</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الدور</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.parents.map((parent: any) => (
                  <TableRow key={parent.id}>
                    <TableCell>{parent.firstname} {parent.lastname}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{ERole.ROLE_PARENT === ERole.ROLE_PARENT && "ولي"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المعلمين الجدد</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>البريد الإلكتروني</TableHead>
                  <TableHead>الدور</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.teachers.map((teacher: any) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.firstname} {teacher.lastname}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{ERole.ROLE_TEACHER === ERole.ROLE_TEACHER && "معلم"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatisticsCardProps {
  title: string;
  value: number;
  percentage: number;
  icon: React.ElementType;
}

function StatisticsCard({
  title,
  value,
  percentage,
  icon: Icon,
}: StatisticsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-sky-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "number" ? value.toLocaleString("en-US") : "Loading..."}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-success-600">
            {percentage > 0 ? "+" : ""}
            {percentage}%
          </span>{" "}
          من الشهر الماضي
        </p>
      </CardContent>
    </Card>
  );
}

export default AdminDashboardPage;
