import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected from 'next/navigation'
import axios from "axios";
import { Edit, EditIcon, X } from "lucide-react";

import { EditChildForm } from "./ui/childprofileboxedit";
import apiUrl from "@/config";
interface ProfileBoxProps {
  child: { id: string; firstname: string; lastname: string;school_level: string; };
  href: string;
  parentemail: string;
}

export function ChildProfileBox({ child, href, parentemail }: ProfileBoxProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const deleteChild = async () => {
    await axios.delete(
      `${apiUrl}/api/parents/${parentemail}/removeStudent/${child.id}`,
    );
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center" onClick={() => router.push(href)}>
        <Link
          href={href}
          className="flex h-36 w-36 cursor-pointer items-center justify-center rounded-lg border bg-muted"
        >
          <p className="text-7xl font-bold">
            {child.firstname.charAt(0).toUpperCase()}
          </p>
        </Link>
      </div>
      <div className="mt-4">
        <span className="flex items-center justify-between space-x-4">
          <h3 className="mt-1 text-lg font-semibold">{`${child.firstname} ${child.lastname}`}</h3>
          <X className="text-red-500 cursor-pointer" onClick={toggleModal} />
          <EditChildForm child={child}  />
        </span>
      </div>

      {isModalOpen && (
  <div
    id="popup-modal"
    tabIndex={-1}
    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
  >
    <div className="relative p-4 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow">
        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8" onClick={toggleModal}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-5 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500">هل أنت متأكد أنك تريد حذف هذا التلميذ ؟</h3>
          <button onClick={deleteChild} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
            نعم, أنا متأكد
          </button>
          <button onClick={toggleModal} className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
            لا، إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
