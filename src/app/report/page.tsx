'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const reportFormSchema = z.object({
  title: z.string().min(10, {
    message: 'Title must be at least 10 characters.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  category: z.enum(['Pothole', 'Broken Streetlight', 'Graffiti', 'Trash', 'Other']),
  image: z.any().optional(),
});

type ReportFormValues = z.infer<typeof reportFormSchema>;

const defaultValues: Partial<ReportFormValues> = {
  title: '',
  description: '',
};

export default function ReportPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  function onSubmit(data: ReportFormValues) {
    console.log(data);
    toast({
      title: "Issue Reported!",
      description: "Thank you for helping improve our community.",
    });
    router.push('/');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Report a New Issue</CardTitle>
            <p className="text-muted-foreground">
              Help us improve your community by reporting issues you see.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Large pothole on Elm Street" {...field} />
                      </FormControl>
                      <FormDescription>
                        A brief, descriptive title for the issue.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide as much detail as possible..."
                          className="resize-y"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include details like the exact location, size, and potential danger.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pothole">Pothole</SelectItem>
                          <SelectItem value="Broken Streetlight">Broken Streetlight</SelectItem>
                          <SelectItem value="Graffiti">Graffiti</SelectItem>
                          <SelectItem value="Trash">Trash</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 p-3 rounded-md border border-dashed">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground text-sm">Location will be detected automatically.</span>
                    </div>
                  </FormControl>
                </FormItem>

                 <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image (Optional)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 p-3 rounded-md border border-dashed">
                            <ImageIcon className="h-5 w-5 text-primary" />
                             <Input id="picture" type="file" className="border-none shadow-none p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        A picture is worth a thousand words.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Submit Report</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
