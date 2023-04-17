import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [QuizModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
