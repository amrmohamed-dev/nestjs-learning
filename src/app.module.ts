import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './modules/coffees/coffee.module';

@Module({
  imports: [CoffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
