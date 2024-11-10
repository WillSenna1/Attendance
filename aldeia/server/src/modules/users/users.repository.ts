import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly db: DatabaseService) { }

    async findByEmail(email: string) {
        return this.db.user.findFirst({ where: { email } });
    }

    async findById(userId: string) {
        return this.db.user.findUnique({ where: { id: userId }, include: { employments: true, onboardings: true } });
    }

    async updateById(id: string, data: Prisma.UserUpdateInput) {
        return this.db.user.update({ where: { id }, data });
    }

}