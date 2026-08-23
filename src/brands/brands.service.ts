import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBrandDto } from "./dto/create-brand.dto";

@Injectable()

export class BrandsService {

    constructor(private readonly prisma: PrismaService) {}

    // create brand
    create(createBrandDto: CreateBrandDto) {
        // this.prisma.tableName.create({ data: { data } }) // insert into PostgreSQL
        return this.prisma.brand.create({
            data: {
                name: createBrandDto.name
            }
        })
    }

}