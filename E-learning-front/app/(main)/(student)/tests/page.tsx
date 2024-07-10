import Link from "next/link";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TestCard } from "@/components/test-card";
import apiUrl from '@/config';
const getAlltests = async () => {
  return axios
    .get(`${apiUrl}/api/tests`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

const TestsPage = async () => {
  const test = await getAlltests();
  console.log(test);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-end gap-y-2">
        <h1 className="text-4xl font-bold">الامتحانات</h1>
        <p className="text-right text-lg text-muted-foreground">
          هذه الصفحة مخصصة لامتحانات مع الإصلاح
        </p>
      </div>

      <Separator className="mb-6 mt-4 px-8" />

      {/*@ts-ignore */}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {/* @ts-ignore */}
        {test.map((test, index) => (
          // @ts-ignore
          <TestCard test={test} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TestsPage;
