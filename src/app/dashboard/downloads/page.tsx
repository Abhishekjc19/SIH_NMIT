import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, FileDown } from "lucide-react";

const downloads = [
  { id: 1, title: 'Modern Web Development', size: '45.5 MB', status: 'Completed' },
  { id: 2, title: 'Digital Marketing Mastery', size: '38.0 MB', status: 'Completed' },
  { id: 3, title: 'Data Science with Python', size: '22.1 MB / 52.1 MB', status: 'Downloading' },
];

export default function DownloadsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-6">My Downloads</h1>
      <div className="border rounded-lg">
        <Table>
          <TableCaption>A list of your downloaded course materials for offline access.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60%]">Course Title</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {downloads.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'Completed' ? 'secondary' : 'default'}>{item.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
             {downloads.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    You have no downloaded courses.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <FileDown className="h-4 w-4" />
        <p>Schedule downloads for off-peak hours from any course page.</p>
      </div>
    </div>
  );
}
