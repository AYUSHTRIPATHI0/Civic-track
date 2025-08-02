'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Landmark } from 'lucide-react';
import type { Issue } from '@/lib/types';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface MapPlaceholderProps {
  issues: Issue[];
}

const statusColors: Record<Issue['status'], string> = {
  Reported: 'bg-yellow-500',
  'In Progress': 'bg-blue-500',
  Resolved: 'bg-green-500',
};

export default function MapPlaceholder({ issues }: MapPlaceholderProps) {
  // Simple hashing function to distribute pins
  const hash = (s: string) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h;
  };

  return (
    <Card className="h-full w-full shadow-md">
      <CardContent className="p-2 h-full">
        <div className="relative h-full w-full rounded-md bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-map-pattern opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Landmark className="mx-auto h-12 w-12 mb-2" />
              <p className="font-semibold">Google Maps API</p>
              <p className="text-sm">Map will be loaded here</p>
            </div>
          </div>
          {issues.map((issue, index) => {
            const top = `${(Math.abs(hash(issue.id + 'lat')) % 80) + 10}%`;
            const left = `${(Math.abs(hash(issue.id + 'lng')) % 80) + 10}%`;
            
            return (
              <Popover key={issue.id}>
                <PopoverTrigger asChild>
                  <button
                    className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-transform hover:scale-125 focus:outline-none"
                    style={{ top, left }}
                    aria-label={`Issue: ${issue.title}`}
                  >
                    <MapPinIcon className={statusColors[issue.status]} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium leading-none">{issue.title}</h4>
                      <Badge variant="secondary">{issue.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{issue.address}</p>
                    <div className="flex items-center pt-2">
                       <Avatar className="h-5 w-5 mr-2">
                        <AvatarImage src={issue.reporter.avatarUrl} alt={issue.reporter.name} data-ai-hint="person avatar" />
                        <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        Reported by {issue.reporter.name}
                      </span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white drop-shadow-lg">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="4" className={`fill-current ${className}`} />
    </svg>
  );
}
