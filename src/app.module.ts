import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    PrismaModule,
    BrandsModule,
    CategoriesModule,
    ProductsModule,
    ColorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
