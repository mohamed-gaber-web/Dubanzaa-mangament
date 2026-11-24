import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// Normalization runs before validation (ValidationPipe transform: true),
// so length/emptiness checks apply to the cleaned value.
const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const trimUpper = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateColorDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Transform(trimUpper)
  @IsString()
  @IsNotEmpty()
  @Matches(/^#[0-9A-F]{6}$/, {
    message: 'hexCode must be a valid HEX color code (e.g. #FF0000)',
  })
  hexCode: string;
}
