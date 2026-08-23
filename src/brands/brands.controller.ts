import { Body, Controller, Post } from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";

// routes ==> /brands 
@Controller("brands") 

export class BrandsController {

    constructor(private readonly brandService: BrandsService) {}

    // Create brand
    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.brandService.create(createBrandDto)
    }
}