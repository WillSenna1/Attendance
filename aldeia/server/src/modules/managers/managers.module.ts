import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ManagersRepository } from './managers.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [ManagersController],
  providers: [ManagersService, ManagersRepository],
  exports: [ManagersRepository]
})
export class ManagersModule { }
