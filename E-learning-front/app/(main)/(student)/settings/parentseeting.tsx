"use client";

import React, { useState } from "react";

import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { subjects } from "@/constants";
import { User } from "@/types";
import axios from "axios";
import apiUrl from '@/config';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  user: any;
}

function ParentSetting({ user }: Props) {
  const [name, setName] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.tel);
  const [date, setDate] = useState(new Date(user.date_of_birth));
  const router = useRouter();

  const handeleditprofile = async () => {
    // user.firstname = name;
    // user.lastname = lastname;
    // user.email = email;
    // user.tel = phone;
    // user.date_of_birth = date;
    const user2 = {
      id: user.id,
      firstname: name,
      lastname: lastname,
      email: email,
      tel: phone,
      date_of_birth: date,
      password: user.password,
      children: user.children,
    
      
    };
    console.log(user2);

    await axios.put(
      `${apiUrl}/api/auth/user/update/parent/` + user.id,
      user2,
    );
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">الرئيسية</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>الإعدادات</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-semibold">الإعدادات</h1>

      <Card>
        <CardHeader>
          <CardTitle>الإعدادات</CardTitle>
          <CardDescription>هنا يمكنك تعديل الإعدادات الخاصة بك</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">
                {/* first name in arabic */}
                الاسم
              </Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">اللقب</Label>
              <Input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">البريد الإلكتروني</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium">رقم الهاتف</Label>
              <Input
                type="text"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numeric input
                  if (/^\d*$/.test(value) && value.length <= 8) {
                    setPhone(value);
                  }
                }}
                maxLength={8}
                minLength={8}
                placeholder="Enter 8-digit phone number"
              />
            </div>
            {date && (
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">تاريخ الميلاد</Label>
                <Input
                  type="text"
                  value={date.toISOString().split("T")[0]}
                  readOnly
                />
              </div>
            )}

            <Calendar
              mode="single"
              selected={date as Date}
              onSelect={(date) => setDate(date as Date)}
              className="w-full rounded-md border"
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear()}
              // defaultMonth={new Date("2000-01-01")}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
            <div className="flex justify-end">
              <Button variant="primary" onClick={handeleditprofile}>
                حفظ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParentSetting;
