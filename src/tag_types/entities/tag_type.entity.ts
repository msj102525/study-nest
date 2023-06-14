import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Tags } from './tags.entity';
import { TagStatus } from './tag_state.entity';

@Entity('tag_types')
export class TagTypes extends CommonEntity {
  @Column({ name: 'tag_type' })
  tagType: string;

  @OneToMany(() => Tags, (tags) => tags.tagTypeId)
  tags: Tags[];

  @ManyToOne(() => TagStatus, (tagState) => tagState.id)
  @JoinColumn({ name: 'tag_state_id' })
  public tagStateId: number;
}
