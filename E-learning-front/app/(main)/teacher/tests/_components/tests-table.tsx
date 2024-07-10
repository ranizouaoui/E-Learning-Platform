'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Test } from "@/types";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateTest from "./updatetest";
import apiUrl from "@/config";

interface TestsTableProps {
  tests: Test[];
}

const deleteTest = async (testId: string) => {
  return axios
    .delete(`${apiUrl}/api/tests/` + testId)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export function TestsTable({ tests }: TestsTableProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [testToDelete, setTestToDelete] = useState<string | null>(null);

  React.useEffect(() => {
    router.refresh();
  }, [tests]);

  const handleOpenDeleteModal = (testId: string) => {
    setTestToDelete(testId);
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setTestToDelete(null);
    setShowModal(false);
  };

  const handleConfirmDelete = async () => {
    if (testToDelete) {
      await deleteTest(testToDelete);
      setShowModal(false);
      router.refresh();
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>المرحلة</TableHead>
            <TableHead>المادة</TableHead>
            <TableHead className="hidden md:table-cell">المعلم</TableHead>
            <TableHead>
              <span className="sr-only">الإجراءات</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.name}</TableCell>
              <TableCell>{test.schoolLevel}</TableCell>
              <TableCell>{test.subject}</TableCell>
              <TableCell className="hidden md:table-cell">
                {test.teacher.firstname} {test.teacher.lastname}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <UpdateTest test={test} />
                  <Button
                    variant="destructiveOutline"
                    size="sm"
                    onClick={() => handleOpenDeleteModal(test.id)}
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
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">هل أنت متأكد أنك تريد حذف هذه الاختبار ؟</h3>
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
