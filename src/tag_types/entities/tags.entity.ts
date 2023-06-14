import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagTypes } from './tag_type.entity';

@Entity('tags')
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tag_name' })
  tagName: string;

  @ManyToOne(() => TagTypes, (tag_types) => tag_types.id)
  @JoinColumn({ name: 'tag_type_id' })
  tagTypeId: number;
}
