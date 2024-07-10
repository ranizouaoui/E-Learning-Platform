import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoursesTable } from "@/components/courses-table";

export default function AdminCoursesPage() {
  return (
    <Card>
      <CardHeader className="items-end">
        <CardTitle>الامتحانات</CardTitle>
        <CardDescription>هذه الصفحة خاصة بالامتحانات</CardDescription>
      </CardHeader>
      <CardContent>
        <CoursesTable />
      </CardContent>
    </Card>
  );
}
