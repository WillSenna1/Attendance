import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ManagersModule } from './modules/managers/managers.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { ClassesModule } from './modules/classes/classes.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { OnboardingModule } from './modules/onboarding/onboarding.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, StudentsModule, TeachersModule, ManagersModule, LessonsModule, ClassesModule, UsersModule, OnboardingModule],
})
export class AppModule { }
