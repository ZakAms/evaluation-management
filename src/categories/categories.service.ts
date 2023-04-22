import { Injectable } from "@nestjs/common";
import { Category } from "./category.model";
import { v4 as uuid } from "uuid";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  
  private categories: Category[] = [];

  getAllCategories() {
    return this.categories;
  }

  getCategoryById(id: string) : Category {
     return this.categories.find((category) => category.id === id)
  }

  createCategory(createCategoryDto: CreateCategoryDto) : Category {

    const {name, description, parentId } = createCategoryDto
    

    const category: Category ={
      id: uuid(),
      name,
      description,
      parentId
    };

    this.categories.push(category);
    return category;
  }

  deleteCategory(id: string): void{
    this.categories = this.categories.filter((category) => category.id !== id);

  }
}
