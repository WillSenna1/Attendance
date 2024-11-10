import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsRepository } from './students.repository';
import { faker } from '@faker-js/faker';

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepository: StudentsRepository) { }

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.findWithEmail(createStudentDto.email);
    console.log(createStudentDto)

    if (student) {
      throw new ConflictException('Student already exists');
    }

    if (createStudentDto.responsibles.length > 0) {
      return await this.studentRepository.create({
        name: createStudentDto.name,
        email: createStudentDto.email,
        phone: createStudentDto.phone,
        cpf: createStudentDto.cpf,
        imageUrl: faker.image.urlPlaceholder({ text: createStudentDto.name.slice(0, 2), backgroundColor: faker.color.rgb().replace("#", ""), textColor: "fff", width: 200, height: 200 }),
        rg: createStudentDto.rg,
        nis: createStudentDto.nis,
        forwarding: createStudentDto.forwarding,
        priorityGroup: createStudentDto.priorityGroup,
        recordNumber: createStudentDto.recordNumber,
        city: createStudentDto.city,
        neighborhood: createStudentDto.neighborhood,
        state: createStudentDto.state,
        street: createStudentDto.street,
        zipCode: createStudentDto.zipCode,
        responsibles: {
          createMany: {
            data: createStudentDto.responsibles
          }
        }
      });
    } else {
      return await this.studentRepository.create({
        name: createStudentDto.name,
        email: createStudentDto.email,
        phone: createStudentDto.phone,
        cpf: createStudentDto.cpf,
        imageUrl: faker.image.urlPlaceholder({ text: createStudentDto.name.slice(0, 2), backgroundColor: faker.color.rgb().replace("#", ""), textColor: "fff", width: 200, height: 200 }),
        rg: createStudentDto.rg,
        nis: createStudentDto.nis,
        forwarding: createStudentDto.forwarding,
        priorityGroup: createStudentDto.priorityGroup,
        recordNumber: createStudentDto.recordNumber,
        city: createStudentDto.city,
        neighborhood: createStudentDto.neighborhood,
        state: createStudentDto.state,
        street: createStudentDto.street,
        zipCode: createStudentDto.zipCode,
      });
    }
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    return await this.studentRepository.findAllPaginated(page, perPage, search);
  }

  async findAllClassPaginated(studentId: string, page: number, perPage: number) {
    return await this.studentRepository.findAllClassPaginated(studentId, page, perPage);
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOne(id);

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentRepository.findOne(id);

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return await this.studentRepository.update(id, {
      name: updateStudentDto.name,
      email: updateStudentDto.email,
      phone: updateStudentDto.phone,
      cpf: updateStudentDto.cpf,
      observation: updateStudentDto.observation,
      rg: updateStudentDto.rg,
      state: updateStudentDto.state,
      neighborhood: updateStudentDto.neighborhood,
      street: updateStudentDto.street,
      zipCode: updateStudentDto.zipCode,
      city: updateStudentDto.city,

      responsibles: {
        updateMany: updateStudentDto.responsibles.map(responsible => ({
          where: { id: responsible.id },
          data: responsible,
        }))
      }
    });
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOne(id);

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return await this.studentRepository.remove(id);
  }
}
