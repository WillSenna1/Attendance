import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { DatabaseModule } from 'src/database/database.module';
import { LessonsRepository } from './lessons.repository';
import { ClassesModule } from '../classes/classes.module';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [DatabaseModule, ClassesModule, TeachersModule],
  controllers: [LessonsController],
  providers: [LessonsService, LessonsRepository],
  exports: [LessonsRepository],
})
export class LessonsModule {}
