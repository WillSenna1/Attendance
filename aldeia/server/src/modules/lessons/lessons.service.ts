import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsRepository } from './lessons.repository';
import { ClassesRepository } from '../classes/classes.repository';
import { TeachersRepository } from '../teachers/teacher.repository';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonsRepository: LessonsRepository,
    private readonly classesRepository: ClassesRepository,
    private readonly teachersRepository: TeachersRepository,
  ) { }

  async create(userId: string, classId: string, createLessonDto: CreateLessonDto) {
    // const teacher = await this.teachersRepository.findOne(userId);

    // if (!teacher) {
    //   throw new BadRequestException('Teacher not found');
    // }

    const lesson = await this.lessonsRepository.findOneWithName(createLessonDto.name);

    if (lesson) {
      throw new ConflictException('Lesson already exists');
    }

    const classe = await this.classesRepository.findOne(classId);

    if (!classe) {
      throw new BadRequestException('Class not found');
    }

    return await this.lessonsRepository.create({
      classe: {
        connect: { id: classe.id }
      },
      name: createLessonDto.name,
    });
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    return await this.lessonsRepository.findAllPaginated(page, perPage, search);
  }

  async findOne(id: string) {
    const lesson = this.lessonsRepository.findOne(id);

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = this.lessonsRepository.findOne(id);

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    return this.lessonsRepository.update(id, updateLessonDto);
  }

  async remove(id: string) {
    const lesson = this.lessonsRepository.findOne(id);

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    return this.lessonsRepository.remove(id);
  }
}
