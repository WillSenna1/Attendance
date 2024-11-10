import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StudentsRepository {
  private readonly paginate = paginator({ page: 1, perPage: 10 });

  constructor(private readonly db: DatabaseService) { }

  async create(data: Prisma.StudentCreateInput) {
    return await this.db.student.create({ data })
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    if (search) {
      return await this.paginate(this.db.student, {
        where: {
          OR: [
            { name: { mode: 'insensitive', contains: search.toLowerCase() } },
            { email: { mode: 'insensitive', contains: search.toLowerCase() } },
            { phone: { mode: 'insensitive', contains: search.toLowerCase() } },
            { cpf: { mode: 'insensitive', contains: search.toLowerCase() } },
            { rg: { mode: 'insensitive', contains: search.toLowerCase() } },
          ]
        },
        include: { responsibles: true, classes: true }
      }, { page, perPage });
    } else {
      return await this.paginate(this.db.student, { include: { responsibles: true, classes: true } }, { page, perPage });
    }
  }

  async findAllClassPaginated(studentId: string, page: number, perPage: number) {
    return await this.paginate(this.db.classe, { where: { students: { some: { id: studentId } } } }, { page, perPage });
  }

  async findWithEmail(email: string) {
    return await this.db.student.findFirst({ where: { email } })
  }

  async findOne(id: string) {
    return await this.db.student.findUnique({ where: { id } })
  }

  async update(id: string, data: Prisma.StudentUpdateInput) {
    return await this.db.student.update({ where: { id }, data })
  }

  async remove(id: string) {
    await this.db.responsible.deleteMany({ where: { studentId: id } })
    return await this.db.student.delete({ where: { id } })
  }

}
