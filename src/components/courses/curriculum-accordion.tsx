import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Section } from "@/lib/types";
import { Headphones, FileText, CheckSquare, Presentation } from "lucide-react";

type CurriculumAccordionProps = {
  curriculum: Section[];
};

const lessonTypeIcons = {
  audio: <Headphones className="w-4 h-4 text-muted-foreground" />,
  slide: <Presentation className="w-4 h-4 text-muted-foreground" />,
  text: <FileText className="w-4 h-4 text-muted-foreground" />,
  quiz: <CheckSquare className="w-4 h-4 text-muted-foreground" />,
};

export default function CurriculumAccordion({ curriculum }: CurriculumAccordionProps) {
  if (!curriculum || curriculum.length === 0) {
    return <p className="text-muted-foreground">No curriculum available for this course yet.</p>
  }
  
  return (
    <Accordion type="single" collapsible className="w-full">
      {curriculum.map((section) => (
        <AccordionItem value={section.id} key={section.id}>
          <AccordionTrigger className="font-bold text-base hover:no-underline">
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {section.lessons.map((lesson) => (
                <li key={lesson.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                  <div className="flex items-center gap-3">
                    {lessonTypeIcons[lesson.type]}
                    <span className="text-sm">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{lesson.duration} min</span>
                    <span className="font-mono bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">{lesson.downloadSize}MB</span>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
