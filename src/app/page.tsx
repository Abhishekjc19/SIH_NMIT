import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CourseCard } from '@/components/courses/course-card';
import { getCourses } from '@/lib/data';
import { RecommendationTool } from '@/components/recommendations/recommendation-tool';
import { ArrowRight } from 'lucide-react';

export default async function Home() {
  const featuredCourses = await getCourses({ limit: 4 });

  return (
    <div className="flex flex-col">
      <section className="bg-card py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
            Learn Anywhere, Anytime.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            ShikshaLite delivers quality education optimized for low networks and basic devices. Start your learning journey with zero barriers.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <RecommendationTool />
        </div>
      </section>

      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-headline font-bold">Featured Courses</h2>
            <Button variant="link" asChild>
              <Link href="/courses">View All <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
