export interface ICreateCategoryCommand {
  name: string;
  parentId?: string;
  description?: string;
}