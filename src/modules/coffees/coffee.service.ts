import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findAll(limit: number, page: number) {
    limit = (limit <= 0 ? 10 : limit) || 10;
    page = (page <= 0 ? 1 : page) || 1;
    const skip = (page - 1) * limit;

    const [coffees, totalResults] = await this.coffeeRepository.findAndCount({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalResults / limit);

    return {
      meta: {
        totalResults,
        totalPages,
        page,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
      data: { coffees },
    };
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id });

    if (!coffee) throw new NotFoundException('No coffee with that ID');

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto);

    await this.coffeeRepository.save(coffee);

    return coffee;
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });

    if (!coffee) throw new NotFoundException('No coffee with that ID');

    await this.coffeeRepository.save(coffee);

    return coffee;
  }

  async remove(id: number) {
    const result = await this.coffeeRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('No coffee with that ID');
  }
}
