import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('teachers')
@ApiTags('teachers')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  findAll(@Query("page") page: number, @Query("perPage") perPage: number, @Query("search") search: string) {
    return this.teachersService.findAllPaginated(page, perPage, search);
  }

  @Get(':id/classes')
  findAllClassPaginated(@Param('id') teacherId: string, @Query("page") page: number, @Query("perPage") perPage: number) {
    return this.teachersService.findAllClassPaginated(teacherId, page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }

  @Get(':id/reset-onboarding')
  resetOnboarding(@Param('id') id: string) {
    return this.teachersService.resetOnboarding(id);
  }
}
