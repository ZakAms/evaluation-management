import { IsOptional, IsString } from "class-validator";


export class getCategoryFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  parentId?: string | null;
}