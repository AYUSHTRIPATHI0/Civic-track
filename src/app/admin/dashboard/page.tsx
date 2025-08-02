import {
  Badge,
} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UserNav } from '@/components/user-nav';

const issues = [
  {
    id: 'ISSUE-8782',
    title: 'Large Pothole on Main St',
    status: 'In Progress',
    reporter: 'John Doe',
    avatar: 'https://placehold.co/32x32.png',
    date: '2023-10-26',
    category: 'Pothole',
  },
  {
    id: 'ISSUE-7878',
    title: 'Broken Streetlight at Elm Park',
    status: 'Resolved',
    reporter: 'Jane Smith',
    avatar: 'https://placehold.co/32x32.png',
    date: '2023-10-25',
    category: 'Broken Streetlight',
  },
    {
    id: 'ISSUE-4567',
    title: 'Overflowing trash can',
    status: 'Reported',
    reporter: 'Emily White',
    avatar: 'https://placehold.co/32x32.png',
    date: '2023-10-28',
    category: 'Trash',
  },
  {
    id: 'ISSUE-3456',
    title: 'Graffiti on wall',
    status: 'Resolved',
    reporter: 'Sam Wilson',
    avatar: 'https://placehold.co/32x32.png',
    date: '2023-10-20',
    category: 'Graffiti',
  },
];

const statusStyles: { [key: string]: string } = {
  'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Reported: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
};

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
           <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New Manual Report
                    </span>
                </Button>
                <UserNav />
           </div>
       </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>All Reported Issues</CardTitle>
            <CardDescription>
              View, manage, and moderate all reported issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    ID
                  </TableHead>
                  <TableHead>Title</TableHead>
                   <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Reporter</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="hidden sm:table-cell font-medium">
                      {issue.id}
                    </TableCell>
                    <TableCell className="font-medium">{issue.title}</TableCell>
                     <TableCell>
                      <Badge variant="outline">{issue.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusStyles[issue.status]}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Image
                          className="aspect-square rounded-full object-cover"
                          height="32"
                          src={issue.avatar}
                          width="32"
                          alt="Avatar"
                          data-ai-hint="person avatar"
                        />
                        <span>{issue.reporter}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{issue.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Change Status</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
