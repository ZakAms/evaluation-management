import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Category } from "./category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { CategoriesService } from "./categories.service";

@Controller("categories")
export class CategoriesController {
  constructor(private CategoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.CategoriesService.getAllCategories();
  }

  @Get('/:id')
  getCategoryById(@Param('id') id: string) : Category {
    return this.CategoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Body() createTaskDto: CreateCategoryDto
  ): Category {
   
    return this.CategoriesService.createCategory(createTaskDto) 
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string) : void {
    return this.CategoriesService.deleteCategory(id);
  }
}
