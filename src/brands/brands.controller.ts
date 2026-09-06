import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";

// routes ==> /brands 
@Controller("brands") 

export class BrandsController {

    constructor(private readonly brandService: BrandsService) {}

    // Create brand
    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.brandService.create(createBrandDto)
    }

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brandService.findOne(id);
    }

    @Patch(":id")
    update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.brandService.update(id, updateBrandDto);
    }

    // Delete Brand
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brandService.remove(id);
    }

}