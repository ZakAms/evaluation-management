import { IsNotEmpty } from "class-validator";
export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  parentId: string | null;
}