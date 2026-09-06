import {CreateBrandDto} from "./create-brand.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

// why to make this step on update ??
// 1- i need on update to update all fields
// 2- PartialType ==> convert name: string to name?: string