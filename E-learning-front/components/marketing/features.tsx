"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import { DownloadIcon, EyeIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/container";

interface FeaturesProps {
  courses: Course[];
}

export function Features({ courses }: FeaturesProps) {
  // console.log('Features component courses:', courses); // Debugging log

  // Ensure courses is an array
  if (!Array.isArray(courses) || courses.length === 0) {
    return <div>No courses available</div>;
  }

  return (
    <div className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32" id="features">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            مكتبة تعليمية كاملة
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            لأننا نهتم بتعليمك، نقدم لك مكتبة تعليمية كاملة تحتوي على كل ما
            تحتاجه
          </p>
        </div>
        <div className="mt-20">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {courses.map((course) => (
                <CarouselItem key={course.id} className="basis-1/4">
                  <CourseCard course={course} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Container>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <div className="flex h-[200px] items-center justify-center rounded-t-xl bg-muted">
        <Image alt="Course thumbnail" width="150" height="80" src="/pdf.svg" />
      </div>
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex flex-col items-end gap-1">
          <h3 className="line-clamp-2 text-lg font-semibold">{course.name}</h3>
          <p className="text-sm text-muted-foreground">{course.term} الفصل</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {course.video_url && (
              <Button variant="secondary" size="sm" asChild>
                <Link href={course.video_url} target="_blank">
                  <EyeIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {course.pdf_url && (
              <Button variant="indigo" size="sm" asChild>
                <Link href={course.pdf_url} download>
                  <DownloadIcon className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">
              {course.teacher?.firstname} {course.teacher?.lastname}
            </span>
            <User
              size={23}
              className="overflow-hidden rounded-full object-cover"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
