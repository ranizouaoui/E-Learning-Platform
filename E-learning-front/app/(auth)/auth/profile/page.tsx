import React from "react";

import { cookies } from "next/headers";
import { Student } from "@/types";
import axios from "axios";

import { ProfileClient } from "@/components/profile-client";
import apiUrl from "@/config";

interface GetParentChildrenResponse {
  id: number;
  email: string;
  roles: [{ name: string }];
  children: Student[];
  firstname: string;
  lastname: string;
  pincode: string;
}

const getParentChildren = async (
  email: string | undefined,
): Promise<GetParentChildrenResponse> => {
  return axios
    .get<GetParentChildrenResponse>(
      `${apiUrl}/api/parents/${email}`,
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export default async function ProfileSelectionPage() {
  const email = cookies().get("email")?.value;
  const parent = await getParentChildren(email);
  return (
    <div className="grid h-screen place-content-center bg-muted/40">
      <ProfileClient parent={parent} />
    </div>
  );
}
