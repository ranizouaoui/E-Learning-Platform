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
        <CardTitle>الدروس</CardTitle>
        <CardDescription>هذه الصفحة خاصة بالمقررات الدراسية</CardDescription>
      </CardHeader>
      <CardContent>
        <CoursesTable />
      </CardContent>
    </Card>
  );
}
