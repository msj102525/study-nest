import { IsNotEmpty } from 'class-validator';

export class CreateTagTypeDto {
  @IsNotEmpty()
  tagType: string;

  @IsNotEmpty()
  tagStateId: number;

  constructor(tagType: string, tagStateId: number) {
    this.tagType = tagType;
    this.tagStateId = tagStateId;
  }
}
