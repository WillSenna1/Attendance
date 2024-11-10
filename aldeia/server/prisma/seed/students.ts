import { Classe, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker/locale/pt_BR'


export const CreateStudentsByClasses = async (count: number, classes: Classe[], prisma: PrismaClient) => {

    classes.map(async (classe) => {
        for (let i = 0; i < count; i++) {
            const name = faker.person.fullName();
            await prisma.student.create({
                data: {
                    name: name,
                    email: faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] }),
                    phone: faker.phone.number(),
                    cpf: faker.string.numeric(11),
                    imageUrl: faker.image.avatarGitHub(),
                    rg: faker.string.numeric(9),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    street: faker.location.street(),
                    neighborhood: faker.location.streetAddress(),
                    zipCode: faker.location.zipCode(),
                    classes: {
                        connect: {
                            id: classe.id
                        }
                    },
                    responsibles: {
                        createMany: {
                            data: [
                                {
                                    name: faker.person.fullName(),
                                    phone: faker.phone.number(),
                                },
                                {
                                    name: faker.person.fullName(),
                                    phone: faker.phone.number(),
                                }
                            ]
                        }
                    }
                },
                include: {
                    responsibles: true
                }
            })
        }
    })

    console.log("Students created")
}
