import { faker } from "@faker-js/faker/locale/pt_BR";
import { Classe, PrismaClient } from "@prisma/client";


export const CreateLessonsByClasses = async (count: number, classes: Classe[], prisma: PrismaClient) => {

    classes.map(async (classe) => {
        for (let i = 0; i < count; i++) {
            await prisma.lesson.create({
                data: {
                    name: faker.lorem.words(2),
                    classe: {
                        connect: {
                            id: classe.id
                        }
                    }
                }
            });
        }
    });

    console.log("Lessons created")
}