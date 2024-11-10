import { ConflictException, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagersRepository } from './managers.repository';
import { UsersRepository } from '../users/users.repository';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker';

@Injectable()
export class ManagersService {
  constructor(
    private readonly managerRepository: ManagersRepository,
    private readonly usersRepository: UsersRepository
  ) { }

  async create(createManagerDto: CreateManagerDto) {
    const manager = await this.usersRepository.findByEmail(createManagerDto.email);

    if (manager) {
      throw new ConflictException('Manager already exists');
    }

    return await this.managerRepository.create({
      user: {
        create: {
          name: createManagerDto.name,
          email: createManagerDto.email,
          password: await hash(createManagerDto.password, 10),
          imageUrl: faker.image.urlPlaceholder({ text: createManagerDto.name.slice(0, 2), backgroundColor: faker.color.rgb().replace("#", "") , textColor: "fff", width: 200, height: 200}),
          role: 'MANAGER',

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
    return await this.managerRepository.findAllPaginated(page, perPage, search);
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne(id);

    if (!manager) {
      throw new ConflictException('Manager not found');
    }

    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const manager = await this.managerRepository.findOne(id);

    if (!manager) {
      throw new ConflictException('Manager not found');
    }

    return await this.managerRepository.update(id, {
      user: {
        update: {
          name: updateManagerDto.name,
          email: updateManagerDto.email,
          password: updateManagerDto.password
        }
      }
    });
  }

  async remove(id: string) {
    const manager = await this.managerRepository.findOne(id);

    if (!manager) {
      throw new ConflictException('Manager not found');
    }

    return await this.managerRepository.remove(id);
  }
}
