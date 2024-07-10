import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeachersTable from "@/components/teachers-table";

export default function AdminTeachersPage() {
  return (
    <Card>
      <CardHeader className="items-end">
        <CardTitle>المعلمين</CardTitle>
        <CardDescription>هنا يمكنك إدارة المعلمين الخاصين بك</CardDescription>
      </CardHeader>
      <CardContent>
        <TeachersTable />
      </CardContent>
    </Card>
  );
}
