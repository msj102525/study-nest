import { User } from 'src/auth/entities/users.entity';

export class CreatePostDto {
  id: number;
  title: string;
  content: string;
  userId: Partial<User>;
  createdAt: Date;
  updatedAt: Date;
}
