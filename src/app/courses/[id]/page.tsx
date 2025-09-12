import { getCourseById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, PlayCircle, Download, Radio, Users, BarChart2 } from "lucide-react";
import CurriculumAccordion from "@/components/courses/curriculum-accordion";

type CoursePageProps = {
  params: {
    id: string;
  };
};

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{course.title}</h1>
            <p className="mt-2 text-lg md:text-xl text-primary-foreground/80">{course.subtitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <span>{course.rating}</span>
                <Star className="w-4 h-4 fill-current" />
                <span className="text-primary-foreground/70">({course.reviewsCount} ratings)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{course.studentsCount.toLocaleString()} students</span>
              </div>
            </div>
             <div className="mt-4 flex items-center gap-2 text-sm">
                <span>Created by</span>
                <div className="flex items-center gap-2 font-semibold">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{course.instructor.name}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sticky top-16 z-40 lg:hidden bg-primary py-4">
          <div className="container mx-auto px-4">
              <div className="relative aspect-video">
                <Image src={course.imageUrl} alt={course.title} fill className="object-cover rounded-md" data-ai-hint="course thumbnail"/>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                    <PlayCircle className="w-16 h-16 text-white/80"/>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-white mb-4">${course.price}</p>
                <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enroll Now</Button>
            </div>
          </div>
      </div>

      <div className="bg-background text-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{course.description}</p>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h2 className="text-2xl font-bold font-headline mb-4">Course Content</h2>
                <CurriculumAccordion curriculum={course.curriculum} />
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold font-headline mb-4">About the Instructor</h2>
                <Card className="flex items-start gap-6 p-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span>{course.instructor.rating} Instructor Rating</span>
                    </div>
                    <p className="mt-2 text-muted-foreground">{course.instructor.bio}</p>
                  </div>
                </Card>
              </div>

            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-24 hidden lg:block">
                  <div className="relative aspect-video">
                     <Image src={course.imageUrl} alt={course.title} fill className="object-cover rounded-t-lg" data-ai-hint="course thumbnail"/>
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                        <PlayCircle className="w-16 h-16 text-white/80"/>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold mb-4">${course.price}</p>
                    <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Enroll Now</Button>
                    <div className="mt-6 space-y-4 text-sm">
                        <h3 className="font-bold text-base">This course package includes:</h3>
                        <div className="flex items-center gap-3">
                            <Radio className="w-5 h-5 text-muted-foreground" />
                            <span>Audio-first live sessions</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-muted-foreground" />
                            <span>Downloadable resources ({course.totalDownloadSize} MB)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5 text-muted-foreground" />
                            <span>Progress tracking</span>
                        </div>
                         <Button variant="outline" className="w-full">
                            Download Package ({course.totalDownloadSize} MB)
                         </Button>
                         <p className="text-xs text-center text-muted-foreground">Download audio, slides & quizzes for offline access.</p>
                    </div>
                  </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
