
export interface ICreateServiceCommand {
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
  userId: string;
  workspaceId?: string;
  categoryIds?: string[];
}
