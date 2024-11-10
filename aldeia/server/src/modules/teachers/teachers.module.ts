import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { DatabaseModule } from 'src/database/database.module';
import { TeachersRepository } from './teacher.repository';
import { TeachersController } from './teachers.controller';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TeachersController],
  providers: [TeachersService, TeachersRepository],
  exports: [TeachersRepository],
})
export class TeachersModule {}
