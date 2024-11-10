import { faker } from "@faker-js/faker/locale/pt_BR";
import { Classe, PrismaClient, Student } from "@prisma/client";


export const CreateClasses = async (count: number, prisma: PrismaClient) => {
    const classes: Classe[] = []

    for (let i = 0; i < count; i++) {
        const newClasse = await prisma.classe.create({
            data: {
                name: faker.lorem.words(2),
            }
        });
        classes.push(newClasse);
    }
    console.log("Classes created")
    return classes;
}