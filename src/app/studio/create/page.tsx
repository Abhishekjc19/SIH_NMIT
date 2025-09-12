import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

export default function CreateCoursePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">Create a New Course</h1>
      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>Fill in the details for your new course. Keep it concise and clear for low-bandwidth users.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" placeholder="e.g., Introduction to Python" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Course Subtitle</Label>
                <Input id="subtitle" placeholder="A one-line summary of your course" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what students will learn in this course." rows={5} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="e.g., 49.99" />
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="slides">Upload Compressed Slides & Resources</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Drag & drop your .zip file here, or click to browse</p>
                    <Input id="slides" type="file" className="sr-only" />
                    <Button variant="outline" className="mt-4">Select File</Button>
                    <p className="mt-2 text-xs text-muted-foreground">Max file size: 100MB. Ensure images are compressed.</p>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Publish Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
