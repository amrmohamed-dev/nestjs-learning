import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Injectable()
export class CoffeeService {
  coffees: Coffee[] = [
    {
      id: 1,
      name: 'Espresso Roast',
      brand: 'Lavazza',
      flavors: ['Chocolate', 'Caramel', 'Nutty'],
    },
    {
      id: 2,
      name: 'Colombian Supremo',
      brand: 'Juan Valdez',
      flavors: ['Citrus', 'Caramel', 'Sweet'],
    },
    {
      id: 3,
      name: 'Ethiopian Yirgacheffe',
      brand: 'Starbucks',
      flavors: ['Floral', 'Berry', 'Citrus'],
    },
    {
      id: 4,
      name: 'French Roast',
      brand: 'Peet’s Coffee',
      flavors: ['Smoky', 'Dark Chocolate', 'Roasted'],
    },
    {
      id: 5,
      name: 'House Blend',
      brand: 'Dunkin’',
      flavors: ['Cocoa', 'Nutty', 'Sweet'],
    },
  ];

  private getCoffeeIndex(id: number) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id);
    if (coffeeIndex === -1)
      throw new HttpException('No coffee with that ID', HttpStatus.NOT_FOUND);

    return coffeeIndex;
  }

  findAll(limit: number, page: number) {
    limit = limit <= 0 ? 10 : limit || 10;
    page = page <= 0 ? 1 : page || 1;
    const start = (page - 1) * limit;

    return {
      meta: { page, limit },
      coffees: this.coffees.slice(start, start + limit),
    };
  }

  findOne(id: number) {
    const coffee = this.coffees[this.getCoffeeIndex(id)];

    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    let lastCoffeeId = 0;

    if (this.coffees.length > 0)
      lastCoffeeId = this.coffees[this.coffees.length - 1].id;

    this.coffees.push({ id: lastCoffeeId + 1, ...createCoffeeDto });

    return { id: lastCoffeeId + 1, ...createCoffeeDto };
  }

  update(id: number, updateCoffeeDto) {
    const coffeeIndex = this.getCoffeeIndex(id);

    this.coffees[coffeeIndex] = {
      ...this.coffees[coffeeIndex],
      ...updateCoffeeDto,
    };

    return this.coffees[coffeeIndex];
  }

  remove(id: number): void {
    this.getCoffeeIndex(id);

    this.coffees = this.coffees.filter((coffee) => coffee.id !== Number(id));
  }
}
