import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';
import { User } from './auth/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DoorWinBell',
      database: 'nest_test',
      entities: [Cat, User, Post],
      synchronize: true,
      logging: false,
    }),
    CatsModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
