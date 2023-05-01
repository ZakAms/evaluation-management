import { IsNotEmpty } from "class-validator";

export class UpdateCategoryNameDto {
  @IsNotEmpty()
  name: string;
}