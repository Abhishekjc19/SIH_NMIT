import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video">
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={600}
              height={400}
              className="object-cover"
              data-ai-hint="course thumbnail"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-bold leading-tight mb-2 line-clamp-2 font-headline">
            {course.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{course.instructor.name}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <span>{course.rating}</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <Badge variant="secondary" className="font-bold text-base">${course.price}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
