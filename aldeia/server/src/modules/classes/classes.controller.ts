import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('classes')
@ApiTags('classes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ClassesController {
  constructor(private readonly classesService: ClassesService) { }

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAllPaginated(@Query("page") page: number, @Query("perPage") perPage: number, @Query("search") search: string) {
    return this.classesService.findAllPaginated(page, perPage, search);
  }

  @Get('all')
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classesService.remove(id);
  }

  @Post(':classeId/students/:studentId')
  addStudentToClass(@Param('classeId') classeId: string, @Param('studentId') studentId: string) {
    return this.classesService.addStudentToClass(classeId, studentId);
  }

  @Get(':classeId/students')
  findAllStudentsFromClass(@Param('classeId') classeId: string) {
    return this.classesService.findAllStudentsFromClass(classeId);
  }

  @Delete(':classeId/students/:studentId')
  removeStudentFromClass(@Param('classeId') classeId: string, @Param('studentId') studentId: string) {
    return this.classesService.removeStudentFromClass(classeId, studentId);
  }

  @Post(':classeId/teachers/:teacherId')
  addTeacherToClass(@Param('classeId') classeId: string, @Param('teacherId') teacherId: string) {
    return this.classesService.addTeacherToClass(classeId, teacherId);
  }

  @Get(':classeId/teachers')
  findAllTeachersFromClass(@Param('classeId') classeId: string) {
    return this.classesService.findAllTeachersFromClass(classeId);
  }

  @Delete(':classeId/teachers/:teacherId')
  removeTeacherFromClass(@Param('classeId') classeId: string, @Param('teacherId') teacherId: string) {
    return this.classesService.removeTeacherFromClass(classeId, teacherId);
  }
}
