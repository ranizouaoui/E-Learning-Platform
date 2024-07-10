import React from "react";

import { Sidebar } from "@/components/main/teacher/sidebar";

interface TeacherDashboardLayoutProps {
  children: React.ReactNode;
}

export default function TeacherDashboardLayout({
  children,
}: TeacherDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <main className="flex w-full flex-1 flex-col p-6">{children}</main>
    </div>
  );
}
