"use client";

import React, { useState } from "react";
import { BookText } from 'lucide-react';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course, ERole } from "@/types";
import axios from "axios";
import apiUrl from '@/config';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UpdateCourseDialog } from "./updatecoursedialog";

interface CoursesTableProps {
  courses: Course[];
}

const deleteCourse = async (courseId: string) => {
  return axios
    .delete(`${apiUrl}/api/courses/` + courseId)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export function CoursesTable({ courses }: CoursesTableProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    router.refresh();
  }, [courses]);

  const handleDeleteClick = (courseId: string) => {
    setSelectedCourse(courseId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCourse) {
      await deleteCourse(selectedCourse);
      setShowModal(false);
      setSelectedCourse(null);
      router.refresh();
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">الصورة</span>
            </TableHead>
            <TableHead>الاسم</TableHead>
            <TableHead>المرحلة</TableHead>
            <TableHead>المادة</TableHead>
            <TableHead className="hidden md:table-cell">المعلم</TableHead>
            <TableHead className="hidden md:table-cell">تم إنشاؤها في</TableHead>
            <TableHead>
              <span className="sr-only">الإجراءات</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="hidden sm:table-cell">
                <BookText className="aspect-square rounded-md object-cover" size={55} />
              </TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.schoolLevel}</TableCell>
              <TableCell>{course.subject}</TableCell>
              <TableCell className="hidden md:table-cell">
                {course.teacher.firstname} {course.teacher.lastname}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(course.date_of_addition).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <UpdateCourseDialog course={course} />
                  <Button
                    variant="destructiveOutline"
                    size="sm"
                    onClick={() => handleDeleteClick(course.id)}
                  >
                    حذف
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showModal && (
        <div id="popup-modal" className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCancelDelete}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">هل أنت متأكد أنك تريد حذف هذه الدرس ؟</h3>
              <button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleConfirmDelete}
              >
                نعم, أنا متأكد
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleCancelDelete}
              >
               لا، إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
