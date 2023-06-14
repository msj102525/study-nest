import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';
import { User } from './auth/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { Posts } from './post/entities/post.entity';
import { TagTypesModule } from './tag_types/tag_types.module';
import { TagTypes } from './tag_types/entities/tag_type.entity';
import { Tags } from './tag_types/entities/tags.entity';
import { TagStatus } from './tag_types/entities/tag_state.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DoorWinBell',
      database: 'nest_test',
      entities: [Cat, User, Posts, TagTypes, Tags, TagStatus],
      synchronize: true,
      logging: true,
    }),
    CatsModule,
    AuthModule,
    PostModule,
    TagTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
