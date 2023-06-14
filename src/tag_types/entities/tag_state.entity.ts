import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TagTypes } from './tag_type.entity';

@Entity('tag_status')
export class TagStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tag_state' })
  tagState: string;

  @OneToMany(() => TagTypes, (tagTypes) => tagTypes.tagStateId)
  tagTypes: TagTypes[];
}
