import { User } from 'src/auth/entities/users.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: '255',
  })
  content: string;

  @JoinColumn({
    name: 'user_id',
  })
  @ManyToOne(() => User, (user) => user.id)
  user_id: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
