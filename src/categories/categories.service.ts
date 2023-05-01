import { getCategoryFilterDto } from "./dto/get-category-filter.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Category } from "./category.model";
import { v4 as uuid } from "uuid";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  getCategoriesWithFilters(filterDto: getCategoryFilterDto): Category[] {
    const { search, parentId } = filterDto;

    let categories = this.getAllCategories(); 

    if (search) {
      categories = categories.filter((category) => {
        if (
          category.name.includes(search) ||
          category.description.includes(search)
        ) {
          return true;
        }

        return false;
      });
    }

    // get all subCategories
    if (parentId) {
      categories = categories.filter(
        (category) => category.parentId === parentId
      );
    }

    return categories;
  }

  getAllCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: string): Category {
    const found = this.categories.find((category) => category.id === id);

    if (!found){
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return found;
  }

  createCategory(createCategoryDto: CreateCategoryDto): Category {
    const { name, description, parentId } = createCategoryDto;

    const category: Category = {
      id: uuid(),
      name,
      description,
      parentId,
    };

    this.categories.push(category);
    return category;
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter((category) => category.id !== id);
  }

  updateCategoryName(id: string, name: string): Category {
    const category = this.getCategoryById(id);

    category.name = name;
    return category;
  }

  updateCategoryDescription(id: string, description: string): Category {
    const category = this.getCategoryById(id);

    //allow description to be empty no error check
    category.description = description;
    return category;
  }
}
