export class CreateCategoryDto {
  name: string;
  description: string;
  parentId: string | null;
}