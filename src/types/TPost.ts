export interface TPost {
  completed: number;
  id?: string;
  title: string;
  description: string;
  category: { id: number; name: string };
  imageUrl?: string;
}
