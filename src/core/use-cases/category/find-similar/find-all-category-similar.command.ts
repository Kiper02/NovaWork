export class IFindAllCategorySimilarCommand {
  name?: string;
  parentId?: string;
  tags?: string[];
  excludeIds?: string[];
  page: number;
  limit: number;
}