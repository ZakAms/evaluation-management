import { getCategoryFilterDto } from './dto/get-category-filter.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Category } from "./category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { CategoriesService } from "./categories.service";
import { IsNegative, IsNotEmpty } from 'class-validator';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';

@Controller("categories")
export class CategoriesController {
  constructor(private CategoriesService: CategoriesService) {}

  @Get()
  getCategories(@Query() filterDto: getCategoryFilterDto): Category[] {
    if(Object.keys(filterDto).length) {
       this.CategoriesService.getCategoriesWithFilters(filterDto);
    } else {
      return this.CategoriesService.getAllCategories();
    }

  }

  @Get("/:id")
  getCategoryById(@Param("id") id: string): Category {
    return this.CategoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() createTaskDto: CreateCategoryDto): Category {
    return this.CategoriesService.createCategory(createTaskDto);
  }

  @Delete("/:id")
  deleteCategory(@Param("id") id: string): void {
    return this.CategoriesService.deleteCategory(id);
  }

  @Patch("/:id/name")
  updateCategoryName(
    @Param("id") id: string,
    @Body
    ("name") updateCategoryName: UpdateCategoryNameDto
  ): Category {
    const { name }  = updateCategoryName;
    return this.CategoriesService.updateCategoryName(id, name);
  }

  @Patch("/:id/description")
  updateCategoryDescription(
    @Param("id") id: string,
    @Body("description") description: string
  ): Category {
    return this.CategoriesService.updateCategoryDescription(id, description);
  }
}
