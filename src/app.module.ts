import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from './config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({      
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    QuizModule, 
    CategoriesModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:  (configService: ConfigService) => ({
        type: "postgres",
        autoLoadEntities: true,
        synchronize: true,
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USERNAME"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_DATABASE"),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
