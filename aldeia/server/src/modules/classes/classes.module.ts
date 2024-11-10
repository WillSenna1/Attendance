import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ClassesRepository } from './classes.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  exports: [ClassesRepository],
})
export class ClassesModule {}
