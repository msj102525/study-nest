import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagTypes } from './tag_type.entity';

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn({ name: 'id' })
  tagId: number;

  @Column({ name: 'tag_name' })
  tagName: string;

  @ManyToOne(() => TagTypes, (tagTypes) => tagTypes.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_type_id' })
  tagTypeId: TagTypes;
}
