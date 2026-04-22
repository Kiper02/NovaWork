export interface IServiceUpdateCommand {
  id: string;
  title?: string;
  description?: string;
  price?: number;
  isPublished?: boolean;
  userId: string;
  categoryIds?: string[];
}
