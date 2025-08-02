import { Building, Landmark } from 'lucide-react';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AuthFormWrapperProps {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function AuthFormWrapper({ title, children, footer }: AuthFormWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
       <div className="flex items-center gap-2 mb-6">
        <Landmark className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Civic Connect
        </h1>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
       <div className="mt-4 text-center text-sm text-muted-foreground">
        {footer}
      </div>
    </div>
  );
}
