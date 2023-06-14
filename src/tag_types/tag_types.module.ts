import { Module } from '@nestjs/common';
import { TagTypesService } from './services/tag_types.service';
import { TagTypesController } from './controllers/tag_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagTypes } from './entities/tag_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagTypes])],
  controllers: [TagTypesController],
  providers: [TagTypesService],
})
export class TagTypesModule {}
