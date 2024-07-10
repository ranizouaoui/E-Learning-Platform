"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
interface Props {
  id: string;
  onDelete: () => void; // Callback to trigger a refresh in the parent component
}

function DeleteLive({ id, onDelete }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handeldeletelivemeeting = async (id: string | undefined) => {
    return axios.delete(`http://localhost:8080/meetings/` + id).then((res) => {
      console.log(res.data);
      setShowModal(false); // Close the modal after deletion
      onDelete(); // Trigger the refresh in the parent component
    });
  };

  const handleOpenDeleteModal = () => {
    setShowModal(true);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    handeldeletelivemeeting(id);
  };

  return (
    <>
      <Button variant="destructive" onClick={handleOpenDeleteModal}>
        حذف
      </Button>

      {showModal && (
        <div
          id="popup-modal"
          className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md p-4">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleCancelDelete}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                هل أنت متأكد أنك تريد حذف هذا الاجتماع؟
              </h3>
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

export default DeleteLive;
