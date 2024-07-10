import React from "react";
import { Container } from "@/components/container";
import { TestCard } from "@/components/test-card";
import { Test } from "@/types";
import apiUrl from '@/config';
// This function runs on the server and fetches the tests data
const getAlltests = async (): Promise<Test[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/tests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'  // Prevent caching for always getting the latest data
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function TestsPage() {
  const tests = await getAlltests();

  return (
    <Container>
      <div className="flex flex-col items-end">
        <h1 className="text-3xl font-bold">مرحبا بكم في صفحة الاختبارات</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          تحتوي هذه الصفحة على اختبارات مصحوبة بتصحيحات يمكنك إجراؤها لتقييم
          .مهاراتك وتحدي نفسك
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </Container>
  );
}
