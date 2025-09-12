export interface Instructor {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  reviews: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'audio' | 'slide' | 'text' | 'quiz';
  duration: number; // in minutes
  downloadSize: number; // in MB
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  price: number;
  instructor: Instructor;
  curriculum: Section[];
  totalDownloadSize: number;
  category: string;
}

export type UserCourse = {
  courseId: string;
  progress: number; // Percentage
};
