import { Injectable } from '@nestjs/common';
import { paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LessonsRepository {
    private readonly paginate = paginator({ page: 1, perPage: 10 });

    constructor(private readonly db: DatabaseService) { }

    async create(data: Prisma.LessonCreateInput) {
        return await this.db.lesson.create({ data })
    }

    async findAllPaginated(page: number, perPage: number, search: string) {
        if (search) {
            return await this.paginate(this.db.lesson, {
                where: {
                    OR: [
                        { name: { mode: 'insensitive', contains: search.toLowerCase() } },
                    ]
                },
                include: { classe: true }
            }, { page, perPage });
        } else {
            return await this.paginate(this.db.lesson, { include: { classe: true } }, { page, perPage });
        }
    }

    async findOneWithName(name: string) {
        return await this.db.lesson.findFirst({ where: { name } })
    }

    async findOne(id: string) {
        return await this.db.lesson.findUnique({ where: { id } })
    }

    async update(id: string, data: Prisma.LessonUpdateInput) {
        return await this.db.lesson.update({ where: { id }, data })
    }

    async remove(id: string) {
        return await this.db.lesson.delete({ where: { id } })
    }

}
