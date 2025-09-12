import type { Course, Instructor, UserCourse } from './types';

export const instructors: Instructor[] = [
  { id: '1', name: 'Jane Doe', bio: 'Expert in Web Development with over 10 years of experience.', avatarUrl: 'https://picsum.photos/seed/instructor1/100/100', rating: 4.8, reviews: 1200 },
  { id: '2', name: 'John Smith', bio: 'Data Science enthusiast and practitioner, helping students learn complex topics easily.', avatarUrl: 'https://picsum.photos/seed/instructor2/100/100', rating: 4.9, reviews: 3500 },
  { id: '3', name: 'Emily White', bio: 'Digital Marketing guru with a focus on practical, real-world strategies.', avatarUrl: 'https://picsum.photos/seed/instructor3/100/100', rating: 4.7, reviews: 850 },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Modern Web Development',
    subtitle: 'From fundamentals to building full-stack applications.',
    description: 'A comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and more. Optimized for offline learning.',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    rating: 4.8,
    reviewsCount: 1250,
    studentsCount: 15000,
    price: 49.99,
    instructor: instructors[0],
    totalDownloadSize: 45.5,
    category: 'Development',
    curriculum: [
      { id: 's1', title: 'Introduction to HTML & CSS', lessons: [
        { id: 'l1', title: 'HTML Basics', type: 'slide', duration: 15, downloadSize: 1.2 },
        { id: 'l2', title: 'CSS Fundamentals', type: 'audio', duration: 25, downloadSize: 3.5 },
      ]},
      { id: 's2', title: 'JavaScript Essentials', lessons: [
        { id: 'l3', title: 'Variables and Data Types', type: 'text', duration: 10, downloadSize: 0.5 },
        { id: 'l4', title: 'Functions and Scopes', type: 'quiz', duration: 20, downloadSize: 0.8 },
      ]},
    ],
  },
  {
    id: '2',
    title: 'Data Science with Python',
    subtitle: 'Unlock the power of data with Python, Pandas, and Matplotlib.',
    description: 'Learn to analyze data, create beautiful visualizations, and use machine learning algorithms.',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    rating: 4.9,
    reviewsCount: 3500,
    studentsCount: 22000,
    price: 59.99,
    instructor: instructors[1],
    totalDownloadSize: 52.1,
    category: 'Data Science',
    curriculum: [
      { id: 's1', title: 'Python for Data Science', lessons: [
        { id: 'l1', title: 'Setting up your environment', type: 'slide', duration: 10, downloadSize: 1.0 },
        { id: 'l2', title: 'NumPy and Pandas', type: 'audio', duration: 45, downloadSize: 6.2 },
      ]},
      { id: 's2', title: 'Data Visualization', lessons: [
        { id: 'l3', title: 'Introduction to Matplotlib', type: 'audio', duration: 30, downloadSize: 4.1 },
        { id: 'l4', title: 'Advanced Plotting', type: 'slide', duration: 25, downloadSize: 2.5 },
      ]},
    ],
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery',
    subtitle: 'Learn SEO, SEM, social media marketing, and content strategy.',
    description: 'A complete guide to becoming a digital marketing expert, with actionable tips and strategies.',
    imageUrl: 'https://picsum.photos/seed/course3/600/400',
    rating: 4.7,
    reviewsCount: 850,
    studentsCount: 9500,
    price: 39.99,
    instructor: instructors[2],
    totalDownloadSize: 38.0,
    category: 'Marketing',
    curriculum: [
      { id: 's1', title: 'SEO Fundamentals', lessons: [
        { id: 'l1', title: 'Keyword Research', type: 'audio', duration: 30, downloadSize: 4.0 },
        { id: 'l2', title: 'On-Page and Off-Page SEO', type: 'slide', duration: 40, downloadSize: 3.8 },
      ]},
    ],
  },
  {
    id: '4',
    title: 'Graphic Design Basics',
    subtitle: 'Master the fundamentals of design theory and practice.',
    description: 'Learn about color theory, typography, layout, and composition to create stunning visuals.',
    imageUrl: 'https://picsum.photos/seed/course4/600/400',
    rating: 4.8,
    reviewsCount: 1500,
    studentsCount: 18000,
    price: 44.99,
    instructor: instructors[0],
    totalDownloadSize: 60.2,
    category: 'Design',
    curriculum: [],
  },
    {
    id: '5',
    title: 'Project Management Essentials',
    subtitle: 'Learn Agile, Scrum, and deliver projects on time.',
    description: 'This course provides the essential skills to manage projects effectively from start to finish.',
    imageUrl: 'https://picsum.photos/seed/course5/600/400',
    rating: 4.6,
    reviewsCount: 980,
    studentsCount: 11000,
    price: 54.99,
    instructor: instructors[1],
    totalDownloadSize: 35.7,
    category: 'Business',
    curriculum: [],
  },
  {
    id: '6',
    title: 'Introduction to Machine Learning',
    subtitle: 'Understand the core concepts of ML and build your first models.',
    description: 'A beginner-friendly introduction to machine learning concepts and algorithms.',
    imageUrl: 'https://picsum.photos/seed/course6/600/400',
    rating: 4.9,
    reviewsCount: 4200,
    studentsCount: 25000,
    price: 69.99,
    instructor: instructors[1],
    totalDownloadSize: 48.9,
    category: 'Data Science',
    curriculum: [],
  },
  {
    id: '7',
    title: 'Mobile App Development with React Native',
    subtitle: 'Build cross-platform mobile apps with JavaScript.',
    description: 'Go from zero to hero in mobile app development using the popular React Native framework.',
    imageUrl: 'https://picsum.photos/seed/course7/600/400',
    rating: 4.7,
    reviewsCount: 1800,
    studentsCount: 16500,
    price: 59.99,
    instructor: instructors[0],
    totalDownloadSize: 55.0,
    category: 'Development',
    curriculum: [],
  },
  {
    id: '8',
    title: 'Business Analytics Fundamentals',
    subtitle: 'Make data-driven decisions to grow your business.',
    description: 'Learn how to use data analytics to gain insights and improve business performance.',
    imageUrl: 'https://picsum.photos/seed/course8/600/400',
    rating: 4.8,
    reviewsCount: 1100,
    studentsCount: 13000,
    price: 49.99,
    instructor: instructors[2],
    totalDownloadSize: 42.3,
    category: 'Business',
    curriculum: [],
  },
];

export const userCourses: UserCourse[] = [
    { courseId: '1', progress: 75 },
    { courseId: '3', progress: 30 },
];

// Simulate API calls
export async function getCourses(options?: { limit?: number; category?: string }): Promise<Course[]> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  let filteredCourses = courses;
  if (options?.category) {
    filteredCourses = courses.filter(c => c.category === options.category);
  }
  if (options?.limit) {
    return filteredCourses.slice(0, options.limit);
  }
  return filteredCourses;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  return courses.find(course => course.id === id);
}

export async function getUserCourses(): Promise<UserCourse[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return userCourses;
}
