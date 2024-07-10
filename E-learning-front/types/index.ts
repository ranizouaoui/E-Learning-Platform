export enum ERole {
  ROLE_PARENT = "ROLE_PARENT",
  ROLE_TEACHER = "ROLE_TEACHER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export interface Role {
  id: string;
  name: ERole;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  roles: Role[];
}

export interface Student {
  id: string;
  firstname: string;
  lastname: string;
  school_level: string;
}

export interface Parent {
  id: string;
  user: User;
  children: Student[];
}

export interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  password: string;
  roles: Role[];
  verified: boolean;
  subjects: string[];
}

export interface Quiz {

  question: string;
  option1: string;
  option2: string;
  option3: string;
  correct_option: string;
}

export interface Course {
  id: string;
  video_url: string;
  pdf_url: string;
  name: string;
  term: number;
  teacher: Teacher;
  schoolLevel: string;
  subject: string;
  date_of_addition: string;
  quizzes?: Quiz[];
}

export interface Test {
  id: string;
  name: string;
  pdf_url: string;
  description: string;
  schoolLevel: string;
  difficulty: number;
  subject: string;
  duration: number;
  teacher: Teacher;
  correction_pdf_url: string;
  term:string
}

export interface GroupClass {
  id: string;
  teacher_id: string;
  subject: string;
  school_level: string;
  date: string;
  start_time: string;
  end_time: string;
  students: number[];
}

export interface LiveMeeting {
  subject: string | undefined;
  term: string | undefined;
  id: string;
  name: string;
  description: string;
  dateTime: string;
  teacher: Teacher;
}
