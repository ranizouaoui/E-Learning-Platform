import React, { useState } from "react";

import { cookies } from "next/headers";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiUrl from "@/config";

const UpdateProfile = async () => {
  const email = cookies().get("email")?.value;
  const fetchUser = async () => {
    const data = axios.get(`${apiUrl}/api/auth/user/${email}`);
    console.log(data);
    return data;
  };
  const user = await fetchUser();
  console.log(user);

  return (
    <div className="mx-auto my-auto grid h-screen place-content-center">
      <div className="container mx-auto max-w-4xl px-4 py-12 border p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">Your account</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Provide your information to get started.
            </p>
            <div></div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="date-picker">Date of Birth</Label>
                <Calendar
                  mode="single"
                  selected={user.data.date_of_birth as Date}
                  //   onSelect={setDate as any}
                  className="w-full rounded-md border"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div>
                <Label htmlFor="first-name">Email</Label>
                <Input value={user?.data.email} disabled />
              </div>
              <div>
                <Label htmlFor="last-name">Username </Label>
                <Input value={user?.data.firstname!} disabled />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant={"primary"}>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
