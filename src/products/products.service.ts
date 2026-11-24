import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      // why to add this condition ??
      // because if not found this product to return [ null ] not error
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto) {
    try{
      return await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          sku: createProductDto.sku,
          description: createProductDto.description,
          brand: {
            connect: {
              id: createProductDto.brandId,
            },
          },
          category: {
            connect: {
              id: createProductDto.categoryId,
            },
          },
        },
      });
    } catch(err) {
      if (
        err instanceof PrismaClientKnownRequestError && // check the error from prisma
        err.code === 'P2002' // p2002 ==> error from type unique constrain
      ) {
        throw new ConflictException('Product SKU already exists'); // convert the error to [ 409 conflict http ]
      }

      throw err; // if found any another error return this error
    }
  }

  async remove(id: string) {
    try{
      return await this.prismaService.product.delete({
        where: { id },
      })
    } catch(err) {
      if (
        err instanceof PrismaClientKnownRequestError && // make sure this error from prisma error
        err.code === 'P2025' // P2025 ==> item not found
      ) {
        throw new NotFoundException('Product not found'); // convert error to [ not found item ]
      }

      throw err;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try{
      return await this.prismaService.product.update({
        where: { id },
        data:  updateProductDto
      })
    } catch(err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Product not found');
      }

      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Product SKU already exists');
      }

      throw err;
    }
  }
}