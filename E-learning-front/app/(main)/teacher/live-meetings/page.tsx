'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LiveMeeting, Teacher } from "@/types";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddGroupClassDialog } from "./_components/add-group-class-dialog";
import DeleteLive from "./_components/deletelivemeeting";
import StartNewMeeting from "./_components/startmeeting";
import { UpdateGroupClass } from "./_components/updatemeeting";
import apiUrl from "@/config";

// Fonction pour obtenir les informations d'un enseignant par email
const getTeacherByEmail = async (email: string): Promise<Teacher> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/teachers/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// URL de base pour les réunions en direct des enseignants
const liveMeetingUrl = `http://localhost:8080/meetings/teacher/`;

// Fonction pour obtenir toutes les réunions en direct d'un enseignant par email
const getAllMeetingsByEmail = async (email: string): Promise<LiveMeeting[]> => {
  try {
    const response = await axios.get(`${liveMeetingUrl}${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const TeacherLiveMeetingsPage = () => {
  const [availableMeetings, setAvailableMeetings] = useState<LiveMeeting[]>([]);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const meetingsPerPage = 3;

  useEffect(() => {
    const email = getCookie('email');
    const fetchData = async () => {
      if (email) {
        try {
          const teacherData = await getTeacherByEmail(email);
          setTeacher(teacherData);
          const meetingsData = await getAllMeetingsByEmail(email);
          setAvailableMeetings(meetingsData);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      } else {
        console.error('Email is undefined');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCookie = (name: string): string | undefined => {
    if (typeof document !== 'undefined') {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const part = parts.pop();
        if (part) {
          return part.split(';').shift();
        }
      }
    }
    return undefined;
  };

  const handleDeleteMeeting = () => {
    // Refresh the meetings data
    const email = getCookie('email');
    if (email) {
      getAllMeetingsByEmail(email).then(setAvailableMeetings).catch(console.error);
    }
  };

  const handleAddSuccess = () => {
    // Refresh the meetings data
    const email = getCookie('email');
    if (email) {
      getAllMeetingsByEmail(email).then(setAvailableMeetings).catch(console.error);
    }
  };

  const indexOfLastMeeting = currentPage * meetingsPerPage;
  const indexOfFirstMeeting = indexOfLastMeeting - meetingsPerPage;
  const currentMeetings = availableMeetings
    .filter((meeting) => meeting.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstMeeting, indexOfLastMeeting);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-75 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

if (!teacher) {
  return <div>Erreur : Impossible de récupérer les données de l&apos;enseignant</div>;
}


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
            <BreadcrumbLink asChild>
              <Link href="#">الاجتماعات المباشرة</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>جميع الاجتماعات المباشرة</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">جميع الاجتماعات المباشرة</h2>
        
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="بحث..."
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddGroupClassDialog teacher={teacher} onAddSuccess={handleAddSuccess} />
        </div>
      </div>

      {currentMeetings.map((meeting) => (
        <Card className="w-full" key={meeting.id}>
          <CardContent className="grid grid-cols-1 items-center gap-4 p-6 md:grid-cols-[auto,1fr,auto]">
            <div className="space-y-1 border-r pl-8 pr-12 text-center">
              <div className="text-4xl font-semibold">
                {new Date(meeting.dateTime).getDate()}
              </div>
              <div className="text-sm font-medium">
                {new Date(meeting.dateTime).toLocaleString("default", { month: "long" })}
              </div>
              <div className="text-sm font-medium">
                {new Date(meeting.dateTime).toLocaleTimeString("default", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="space-y-1 pl-4">
              <h3 className="text-xl font-semibold">{meeting.name}</h3>
              <p className="text-sm text-muted-foreground">{meeting.description}</p>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <StartNewMeeting id={meeting.id} />
              <UpdateGroupClass meeting={meeting} />
              <DeleteLive id={meeting.id} onDelete={handleDeleteMeeting} />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center space-x-4 mt-4">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          السابق
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastMeeting >= availableMeetings.length}
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

export default TeacherLiveMeetingsPage;
