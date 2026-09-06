import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateCategoryDTO} from "./dto/create-category.dto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";
import {UpdateCategoriesDto} from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {

    constructor(private prismaService: PrismaService) {}

    async create(createCategory: CreateCategoryDTO) {
        try {
            return await this.prismaService.category.create({
                data: createCategory
            })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ConflictException("Category already exists");
            }

            throw error;
        }
    }

    async findAll() {
        return this.prismaService.category.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async findOne(id: string) {

        const category = await this.prismaService.category.findUnique({
            where: {
                id
            }
        })

        if(!category) {
            throw new NotFoundException("Category not found");
        }

        return category;
    }

    async remove(id: string) {
        try {
            return await this.prismaService.category.delete({
                where: {
                    id
                }
            })
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw  new NotFoundException("Category not found");
            }

            throw error;
        }
    }

    async update(id: string, updateCategoriesDto: UpdateCategoriesDto) {
        try {
            return this.prismaService.category.update({
                where: {
                    id: id,
                },
                data: updateCategoriesDto
            })
        }
        catch(error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new NotFoundException("Category not found");
            }

            if(error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
                throw new ConflictException("Category already exists");
            }

            throw error;

        }
    }
}