import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entities/coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
