import {
  Badge,
} from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Header from '@/components/header';
import IssueCard from '@/components/issue-card';
import MapPlaceholder from '@/components/map-placeholder';
import type { Issue } from '@/lib/types';
import { Filter, List } from 'lucide-react';

const issues: Issue[] = [
  {
    id: '1',
    title: 'Large Pothole on Main St',
    description: 'A large and dangerous pothole has formed in the eastbound lane of Main St, just past the intersection with Oak Ave. It has already caused a flat tire on my vehicle.',
    category: 'Pothole',
    status: 'Reported',
    imageUrl: 'https://placehold.co/600x400.png',
    location: { lat: 34.0522, lng: -118.2437 },
    address: '123 Main St, Los Angeles, CA',
    reporter: {
      id: 'user1',
      name: 'John Doe',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    upvotes: 12,
  },
  {
    id: '2',
    title: 'Broken Streetlight at Elm Park',
    description: 'The streetlight at the entrance of Elm Park is out, making the area very dark and unsafe at night.',
    category: 'Broken Streetlight',
    status: 'In Progress',
    imageUrl: 'https://placehold.co/600x400.png',
    location: { lat: 34.055, lng: -118.245 },
    address: '456 Elm St, Los Angeles, CA',
    reporter: {
      id: 'user2',
      name: 'Jane Smith',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
    upvotes: 5,
  },
  {
    id: '3',
    title: 'Graffiti on wall',
    description: 'Offensive graffiti has been sprayed on the wall of the public library. Needs to be removed quickly.',
    category: 'Graffiti',
    status: 'Resolved',
    imageUrl: 'https://placehold.co/600x400.png',
    location: { lat: 34.05, lng: -118.24 },
    address: '789 Library Ave, Los Angeles, CA',
    reporter: {
      id: 'user3',
      name: 'Sam Wilson',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 10)),
    upvotes: 2,
  },
  {
    id: '4',
    title: 'Overflowing trash can',
    description: 'The public trash can on the corner of 5th and Broadway has been overflowing for days.',
    category: 'Trash',
    status: 'Reported',
    imageUrl: 'https://placehold.co/600x400.png',
    location: { lat: 34.048, lng: -118.25 },
    address: '5th & Broadway, Los Angeles, CA',
    reporter: {
      id: 'user4',
      name: 'Emily White',
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    upvotes: 8,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 md:p-6">
        <div className="xl:col-span-2 lg:col-span-1 h-[calc(100vh-10rem)] lg:h-auto">
          <MapPlaceholder issues={issues} />
        </div>
        <div className="flex flex-col gap-4 h-[calc(100vh-10rem)] lg:h-auto">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Local Issues</h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Reported
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>In Progress</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Resolved</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <List className="mr-2 h-4 w-4" />
                  Sort by
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
