import React from "react";

import Link from "next/link";
import { ERole, Teacher } from "@/types";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActivateTeacher from "@/app/(main)/(admin)/admin/teachers/activateteacher";

import { Button } from "./ui/button";
import apiUrl from "@/config";

const getAllteachers = async () => {
  return axios
    .get(`${apiUrl}/api/teachers`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const TeachersTable = async () => {
  const teachers = await getAllteachers();

  const filteredTeachers = teachers.filter((teacher: { roles: { name: ERole; }[]; }) => {
    return teacher.roles?.some((role: { name: ERole; }) => role.name === ERole.ROLE_TEACHER);
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الاسم</TableHead>
          <TableHead>البريد الإلكتروني</TableHead>
          <TableHead>الدور</TableHead>
          <TableHead>Document</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTeachers.map((teacher:Teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>
              {teacher?.firstname} {teacher?.lastname}
            </TableCell>
            <TableCell>{teacher?.email}</TableCell>
            <TableCell>
              {teacher?.roles?.map((role) => {
                if (role.name === ERole.ROLE_TEACHER) {
                  return "معلم";
                }
              })}
            </TableCell>
            <TableCell>
              {teacher.verified ? (
                <Link href=''>عرض</Link>
              ) : (
                "لا يوجد"
              )}
            </TableCell>
            <TableCell>
              {teacher.verified ? "تم التحقق" : "لم يتم التحقق"}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ActivateTeacher id={teacher.id} />
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
};

export default TeachersTable;
