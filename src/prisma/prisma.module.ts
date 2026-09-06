import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // =>> prisma services make available on all modules without to import prisma module
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
