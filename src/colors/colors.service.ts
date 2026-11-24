import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorsService {
  constructor(private readonly prismaService: PrismaService) {}

  fetchAll() {
    return this.prismaService.color.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const color = await this.prismaService.color.findUnique({ where: { id } });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }

  async create(createColorDto: CreateColorDto) {
    await this.assertNameAvailable(createColorDto.name);

    try {
      return await this.prismaService.color.create({
        data: {
          name: createColorDto.name,
          hexCode: createColorDto.hexCode,
        },
      });
    } catch (err) {
      this.handlePrismaError(err);
    }
  }

  async update(id: string, updateColorDto: UpdateColorDto) {
    // Fields are declared on the DTO class, so absent ones exist as undefined.
    const hasChanges = Object.values(updateColorDto).some(
      (value) => value !== undefined,
    );
    if (!hasChanges) {
      throw new BadRequestException('At least one field must be provided');
    }

    if (updateColorDto.name !== undefined) {
      await this.assertNameAvailable(updateColorDto.name, id);
    }

    try {
      return await this.prismaService.color.update({
        where: { id },
        data: {
          name: updateColorDto.name,
          hexCode: updateColorDto.hexCode,
        },
      });
    } catch (err) {
      this.handlePrismaError(err);
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.color.delete({ where: { id } });
    } catch (err) {
      this.handlePrismaError(err);
    }
  }

  // The DB unique index is case-sensitive, so reject "red" when "Red" exists.
  // The P2002 handler below still covers exact-match races.
  private async assertNameAvailable(name: string, excludeId?: string) {
    const existing = await this.prismaService.color.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException('Color name already exists');
    }
  }

  private handlePrismaError(err: unknown): never {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw new NotFoundException('Color not found');
      }
      if (err.code === 'P2002') {
        throw new ConflictException('Color name already exists');
      }
    }
    throw err;
  }
}
