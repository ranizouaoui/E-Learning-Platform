import { Course } from "@/types";
import axios from "axios";
import { Features } from "@/components/marketing/features";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Navbar } from "@/components/marketing/navbar";
import { SecondaryFeatures } from "@/components/marketing/secondary-features";
import { Pricing } from "@/components/marketing/pricing";
import apiUrl from '@/config';

// Function to fetch courses data
const fetchCourses = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/courses/courses`);
    return response.data.courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// Server component to render the home page
export default async function Home() {
  const courses = await fetchCourses();

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <Features courses={courses} />
        <Pricing />
        <SecondaryFeatures />
        <Footer />
      </main>
    </div>
  );
}
