import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
@ApiTags('students')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAllPaginated(@Query("page") page: number, @Query("perPage") perPage: number, @Query("search") search: string) {
    return this.studentsService.findAllPaginated(page, perPage, search);
  }

  @Get(':id/classes')
  findAllClassPaginated(@Param("id") studentId: string, @Query("page") page: number, @Query("perPage") perPage: number) {
    return this.studentsService.findAllClassPaginated(studentId, page, perPage);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}
