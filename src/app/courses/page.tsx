import { getCourses } from "@/lib/data";
import { CourseCard } from "@/components/courses/course-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default async function CoursesPage() {
  const courses = await getCourses();
  const categories = [...new Set(courses.map(c => c.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">All Courses</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find the perfect course to kickstart your learning journey.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{courses.length} courses available</h2>
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Filter by category:</span>
             <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                        <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </div>
      <Separator className="mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
