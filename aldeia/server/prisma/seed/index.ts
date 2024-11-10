import { PrismaClient } from "@prisma/client"
import { CreateTeachersByClasses } from "./teachers";
import { CreateAdminManager, CreateManagers } from "./managers";
import { CreateClasses } from "./classes";
import { CreateStudentsByClasses } from "./students";
import { CreateLessonsByClasses } from "./lessons";
import 'dotenv/config';

const prisma = new PrismaClient()

const main = async () => {
    console.log('Seeding database...');

    await CreateAdminManager(prisma);
    await CreateManagers(20, prisma);
    const classes = await CreateClasses(10, prisma);
    await CreateTeachersByClasses(20, classes, prisma);
    await CreateStudentsByClasses(1, classes, prisma);
    await CreateLessonsByClasses(2, classes, prisma);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });