import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  sku: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  brandId: string;

  @IsUUID()
  categoryId: string;
}