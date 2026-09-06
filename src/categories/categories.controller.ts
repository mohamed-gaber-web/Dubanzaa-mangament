import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CategoriesService} from "./categories.service";
import {CreateCategoryDTO} from "./dto/create-category.dto";
import {Query} from "pg";
import {UpdateCategoriesDto} from "./dto/update-category.dto";

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDTO) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() updateCategoriesDto: UpdateCategoriesDto ) {
        return this.categoriesService.update(id, updateCategoriesDto);
    }
}


// findUnique => query
// database => category not found => null
// if(!category) { handle error  } null

// delete => mutation
// say prisma delete record
// database => delete category > if found => deleted
// if not found => prisma don't execute operation ==> P2025 [ Record required for this operation was not found. ]