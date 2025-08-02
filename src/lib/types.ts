export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'Pothole' | 'Broken Streetlight' | 'Graffiti' | 'Trash' | 'Other';
  status: 'Reported' | 'In Progress' | 'Resolved';
  imageUrl?: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  reporter: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  upvotes: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
