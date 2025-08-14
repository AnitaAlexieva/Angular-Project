export interface Recipe {
  id?: string;
  imageUrl:string;
  title: string;
  protein: number;
  calories?: number;
  prepTime?: string;
  description?: string;
  steps?: string[];
  authId: string
}
