import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import {UpdateBrandDto} from "./dto/update-brand.dto";

@Injectable()
export class BrandsService {
    constructor(private readonly prisma: PrismaService) {}

    // Get
    findAll() {
        return this.prisma.brand.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    // Get brand by id /brand/:id
    async findOne(id: string) {
        const brand = await this.prisma.brand.findUnique({
            where: {
                id
            }
        })

        if(!brand) {
            throw new NotFoundException('Brand not found')
        }

        return brand;
    }

    // POST /brands
    async create(createBrandDto: CreateBrandDto) {
        try {
            return await this.prisma.brand.create({
                data: {
                    name: createBrandDto.name,
                },
            });
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2002'
            ) {
                throw new ConflictException('Brand already exists');
            }

            throw err;
        }
    }

    async update(id: string, updateBrandDto: UpdateBrandDto) {
        try {
            return await this.prisma.brand.update({
                where: {
                    id,
                },
                data: updateBrandDto,
            });
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2025'
            ) {
                throw new NotFoundException('Brand not found');
            }

            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2002'
            ) {
                throw new ConflictException('Brand already exists');
            }

            throw err;
        }
    }

    async remove(id: string) {
        try {
            return await this.prisma.brand.delete({
                where: {
                    id
                }
            })
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException("Brand not found");
            }
            throw err;
        }
    }
}


// Delete /brand/id
// If get wrong id don't return prisma error to front end
// {
//   "statusCode": 404,
//   "message": "Brand not found"
// }

// P2025 => Record not found
// P2002 => Unique constraint violation