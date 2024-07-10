"use client";

import React from "react";

import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import apiUrl from '@/config';
interface Props {
  id: string;
}

const handeleactivate = async (id: string) => {
  return axios
    .put(`${apiUrl}/api/teachers/requests/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

function ActivateTeacher({ id }: Props) {
  const router = useRouter();
  const activateTeacher = async () => {
    await handeleactivate(id);
    router.refresh();
  };

  return (
    <Button variant="secondary" size="sm" onClick={activateTeacher}>
      تحقق
    </Button>
  );
}

export default ActivateTeacher;
