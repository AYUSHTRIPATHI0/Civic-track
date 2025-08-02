import Image from 'next/image';
import {
  ArrowUp,
  MessageSquare,
  MapPin,
  Pencil,
  Trash2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Issue } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface IssueCardProps {
  issue: Issue;
}

const statusConfig = {
  Reported: {
    icon: Clock,
    color: 'bg-yellow-500',
    label: 'Reported',
  },
  'In Progress': {
    icon: Pencil,
    color: 'bg-blue-500',
    label: 'In Progress',
  },
  Resolved: {
    icon: CheckCircle,
    color: 'bg-green-500',
    label: 'Resolved',
  },
};

export default function IssueCard({ issue }: IssueCardProps) {
  const { icon: StatusIcon, color: statusColor, label: statusLabel } = statusConfig[issue.status];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Image
          src={issue.imageUrl || 'https://placehold.co/600x400.png'}
          alt={issue.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint="civic issue"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{issue.category}</Badge>
            <Badge className={`${statusColor} text-white hover:${statusColor}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusLabel}
            </Badge>
        </div>
        <CardTitle className="text-lg font-bold mb-2 leading-tight">{issue.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{issue.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Avatar className="h-6 w-6">
            <AvatarImage src={issue.reporter.avatarUrl} alt={issue.reporter.name} data-ai-hint="person avatar" />
            <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{issue.reporter.name}</span>
          <span>&middot;</span>
          <span>
            {formatDistanceToNow(new Date(issue.createdAt), { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
          <ArrowUp className="h-4 w-4" /> {issue.upvotes} Upvotes
        </Button>
        <div className="flex items-center space-x-2">
           <Button variant="ghost" size="sm" className="text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-2" /> Comment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
