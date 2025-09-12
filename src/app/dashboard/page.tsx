import { getCourses, getUserCourses } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export default async function MyCoursesPage() {
  const allCourses = await getCourses();
  const userCourseData = await getUserCourses();

  const enrolledCourses = userCourseData.map(uc => {
    const courseDetails = allCourses.find(c => c.id === uc.courseId);
    return { ...courseDetails, progress: uc.progress };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">My Courses</h1>
      {enrolledCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map(course => course && (
            <Card key={course.id} className="overflow-hidden">
              <Link href={`/courses/${course.id}`}>
                <div className="relative aspect-video">
                  <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
                </div>
              </Link>
              <CardContent className="p-4">
                <CardTitle className="text-lg font-bold mb-2 line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">by {course.instructor.name}</p>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} aria-label={`${course.progress}% complete`} />
                </div>

                <Button className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href={`/courses/${course.id}`}>
                        <PlayCircle className="mr-2" />
                        Continue Learning
                    </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">You are not enrolled in any courses yet.</h2>
          <p className="text-muted-foreground mt-2">Explore our catalog to find your next learning adventure!</p>
          <Button className="mt-4" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
