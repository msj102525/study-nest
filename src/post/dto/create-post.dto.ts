import { User } from 'src/auth/entities/users.entity';
import { DeepPartial } from 'typeorm';

export class CreatePostDto {
  title: string;
  content: string;
  userId: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
}
