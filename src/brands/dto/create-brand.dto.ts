import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateBrandDto {

    // validation 
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;
}