"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface meetingId {
  id: string;
}

function StartNewMeeting({ id }: meetingId) {
  const router = useRouter();
  const startNewMeeting = async (id: string | undefined) => {
    return axios
      .put(`http://localhost:8080/meetings/start/` + id)
      .then((res) => {
        router.push("/room/" + id);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  };

  return (
    <Button
  onClick={() => startNewMeeting(id)}
  className="bg-blue-500 text-white hover:text-black"
>
  <span>الدخول</span>
</Button>

  );
}

export default StartNewMeeting;
