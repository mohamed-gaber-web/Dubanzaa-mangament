import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;
}