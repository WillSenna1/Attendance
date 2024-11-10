import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeachersRepository } from './teacher.repository';
import { UsersRepository } from '../users/users.repository';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

@Injectable()
export class TeachersService {
  constructor(
    private readonly teachersRepository: TeachersRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  async create(createTeacherDto: CreateTeacherDto) {
    const teacher = await this.usersRepository.findByEmail(createTeacherDto.email);

    if (teacher) {
      throw new ConflictException('Teacher already exists');
    }

    return await this.teachersRepository.create({
      user: {
        create: {
          name: createTeacherDto.name,
          email: createTeacherDto.email,
          password: await hash(createTeacherDto.password, 10),
          imageUrl: faker.image.urlPlaceholder({ text: createTeacherDto.name.slice(0, 2), backgroundColor: faker.color.rgb().replace("#", ""), textColor: "fff", width: 200, height: 200 }),
          role: 'TEACHER',

          onboardings: {
            create: {
              done: false
            }
          }
        }
      }
    });
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    return await this.teachersRepository.findAllPaginated(page, perPage, search);
  }

  async findAllClassPaginated(teacherId: string, page: number, perPage: number) {
    return await this.teachersRepository.findAllClassPaginated(teacherId, page, perPage);
  }

  async findOne(id: string) {
    const teacher = await this.teachersRepository.findOne(id);

    if (!teacher) {
      throw new ConflictException('Teacher not found');
    }

    return teacher;
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teachersRepository.findOne(id);

    if (!teacher) {
      throw new ConflictException('Teacher not found');
    }

    return await this.teachersRepository.update(teacher.id, {
      user: {
        update: {
          name: updateTeacherDto.name,
          email: updateTeacherDto.email,
          phone: updateTeacherDto.phone,
          street: updateTeacherDto.street,
          neighborhood: updateTeacherDto.neighborhood,
          city: updateTeacherDto.city,
          state: updateTeacherDto.state,
          zipCode: updateTeacherDto.zipCode,
          employments: {
            update: {
              where: { id: teacher.user.employments[0].id },
              data: {
                type: updateTeacherDto.employment,
                cnpj: updateTeacherDto.cnpj,
                companyName: updateTeacherDto.companyName,
                cpf: updateTeacherDto.cpf,
                rg: updateTeacherDto.rg
              }
            }
          }
        }
      }
    });
  }

  async remove(id: string) {
    const teacher = await this.teachersRepository.findOne(id);

    if (!teacher) {
      throw new ConflictException('Teacher not found');
    }

    return await this.teachersRepository.remove(id);
  }

  async resetOnboarding(id: string) {
    const teacher = await this.teachersRepository.findOne(id);

    if (!teacher) {
      throw new ConflictException('Teacher not found');
    }

    return await this.teachersRepository.resetOnboarding(teacher.user.onboardings[0].id);
  }
}
