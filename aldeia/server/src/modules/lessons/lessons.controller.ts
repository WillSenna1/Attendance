import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('lessons')
@ApiTags('lessons')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post(":classeId")
  create(@ReqUser() user: User, @Param("classeId") classId: string, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(user.id, classId, createLessonDto);
  }

  @Get()
  findAll(@Query("page") page: number, @Query("perPage") perPage: number, @Query("search") search: string) {
    return this.lessonsService.findAllPaginated(page, perPage, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
