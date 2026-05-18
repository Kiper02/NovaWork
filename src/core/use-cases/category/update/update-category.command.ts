export interface IUpdateCategoryCommand {
  id: string;
  name?: string;
  description?: string;
  tags?: string[];
}