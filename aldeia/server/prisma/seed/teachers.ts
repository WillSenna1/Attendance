import { faker } from "@faker-js/faker/locale/pt_BR";
import { Classe, PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";



export const CreateTeachersByClasses = async (count: number, classes: Classe[], prisma: PrismaClient) => {
    classes.map(async (classe) => {
        for (let i = 0; i < count; i++) {
            const employmentType = faker.helpers.arrayElement(['CLT', 'CNPJ']) as 'CLT' | 'CNPJ';
            const name = faker.person.fullName();
            await prisma.teacher.create({
                data: {
                    user: {
                        create: {
                            name: name,
                            email: faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] }),
                            phone: faker.phone.number(),
                            imageUrl: faker.image.avatarGitHub(),
                            password: await hash("password", 10),
                            role: 'TEACHER',
                            city: faker.location.city(),
                            neighborhood: faker.location.streetAddress(),
                            state: faker.location.state(),
                            street: faker.location.street(),
                            zipCode: faker.location.zipCode(),
                            employments: {
                                create: {
                                    type: employmentType,
                                    cnpj: employmentType === 'CNPJ' ? faker.string.numeric(14) : undefined,
                                    companyName: employmentType === 'CNPJ' ? faker.company.name() : undefined,
                                    cpf: employmentType === 'CLT' ? faker.string.numeric(11) : undefined,
                                    rg: employmentType === 'CLT' ? faker.string.numeric(9) : undefined,
                                }
                            },
                            onboardings: {
                                create: {
                                    done: true,
                                }
                            },
                        }
                    },
                    classes: {
                        connect: {
                            id: classe.id
                        }
                    }
                },
            });
        }
    });


    console.log("Teachers created")
}