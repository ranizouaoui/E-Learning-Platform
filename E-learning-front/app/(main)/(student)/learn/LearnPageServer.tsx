import React from "react";
import LearnPageClient from "./LearnPageClient";
import axios from "axios";
import { Course } from "@/types";
import apiUrl from '@/config';
const getAllCourses = async (): Promise<Course[]> => {
  try {
    const res = await axios.get(`${apiUrl}/api/courses/courses`);
    // console.log("API Response:", res.data); // Ajoutez ce journal pour voir la réponse
    return res.data.courses; // Assurez-vous que c'est bien ici que se trouve le tableau des cours
  } catch (error) {
    console.error(error);
    return [];
  }
};

const LearnPageServer: React.FC = async () => {
  const courses = await getAllCourses();
  // console.log("Courses:", courses); // Ajoutez ce journal pour vérifier les données avant de les passer au composant client
  return <LearnPageClient courses={courses} />;
};

export default LearnPageServer;
