import { getCourses } from "@/lib/data";
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Radio, Users, Star, Edit } from 'lucide-react';

export default async function MyStudioCoursesPage() {
  // Assuming all courses belong to the current instructor for this mock
  const instructorCourses = await getCourses();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">My Courses</h1>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/studio/create">Create New Course</Link>
        </Button>
      </div>

      {instructorCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map(course => (
            <Card key={course.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-video">
                <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg font-bold line-clamp-2">{course.title}</CardTitle>
                <Badge variant="outline" className="w-fit">{course.category}</Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                 <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4"/> {course.studentsCount.toLocaleString()}
                    </div>
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4"/> {course.rating}
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline"><Edit className="mr-2 h-4 w-4"/> Edit</Button>
                <Button><Radio className="mr-2 h-4 w-4"/> Start Live Class</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">You haven't created any courses yet.</h2>
          <p className="text-muted-foreground mt-2">Start sharing your knowledge with the world!</p>
          <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/studio/create">Create Your First Course</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
