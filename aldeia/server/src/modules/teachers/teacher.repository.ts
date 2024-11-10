import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class TeachersRepository {
  private readonly paginate = paginator({ page: 1, perPage: 10 });

  constructor(private readonly db: DatabaseService) { }

  async create(data: Prisma.TeacherCreateInput) {
    return this.db.teacher.create({ data });
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    if (search) {
      return await this.paginate(this.db.teacher, {
        where: {
          OR: [
            {
              user: { name: { mode: 'insensitive', contains: search.toLowerCase() } }
            },
            {
              user: { email: { mode: 'insensitive', contains: search.toLowerCase() } }
            },
            {
              user: { phone: { mode: 'insensitive', contains: search.toLowerCase() } }
            },
          ]
        },
        include: { user: { include: { onboardings: true, employments: true } } }
      }, { page, perPage });
    } else {
      return await this.paginate(this.db.teacher, { include: { user: { include: { onboardings: true, employments: true } } } }, { page, perPage });
    }
  }

  async findAllClassPaginated(teacherId: string, page: number, perPage: number) {
    return await this.paginate(this.db.classe, { where: { teachers: { some: { id: teacherId } } } }, { page, perPage });
  }

  async findOne(id: string) {
    return await this.db.teacher.findFirst({ where: { id }, include: { user: { include: { onboardings: true, employments: true } } } });
  }


  async update(id: string, data: Prisma.TeacherUpdateInput) {
    return await this.db.teacher.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.db.teacher.delete({ where: { id } });
  }

  async resetOnboarding(id: string) {
    return this.db.onboarding.update({ where: { id }, data: { done: false } });
  }
}
