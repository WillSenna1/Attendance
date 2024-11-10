import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ManagersRepository {
  private readonly paginate = paginator({ page: 1, perPage: 10 });

  constructor(private readonly db: DatabaseService) { }

  async create(data: Prisma.ManagerCreateInput) {
    return await this.db.manager.create({ data, include: { user: true } })
  }

  async findAllPaginated(page: number, perPage: number, search: string) {
    if (search) {
      return await this.paginate(this.db.manager, {
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
        include: { user: { include: { onboardings: true } } }
      }, { page, perPage });
    } else {
      return await this.paginate(this.db.manager, { include: { user: { include: { onboardings: true } } } }, { page, perPage });
    }
  }

  async findUserWithEmail(email: string) {
    return await this.db.user.findFirst({ where: { email } })
  }

  async findOne(id: string) {
    return await this.db.manager.findUnique({ where: { id }, include: { user: true } })
  }

  async update(id: string, data: Prisma.ManagerUpdateInput) {
    return await this.db.manager.update({ where: { id }, data, include: { user: true } })
  }

  async remove(id: string) {
    return await this.db.manager.delete({ where: { id }, include: { user: true } })
  }
}
