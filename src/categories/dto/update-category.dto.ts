import {PartialType} from "@nestjs/mapped-types";
import {CreateCategoryDTO} from "./create-category.dto";

export class UpdateCategoriesDto extends PartialType(CreateCategoryDTO) {}

// why to use PartialType ??
// create [ name: string ]
// update [ name?: string ]
// mean in the update by use patch update part from object
// { name: string, age: string, work: string } update work: string only