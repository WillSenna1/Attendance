import { faker } from "@faker-js/faker/locale/pt_BR";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";



export const CreateManagers = async (count: number, prisma: PrismaClient) => {

    for (let i = 0; i < count; i++) {
        const employmentType = faker.helpers.arrayElement(['CLT', 'CNPJ']) as 'CLT' | 'CNPJ';
        const name = faker.person.fullName();
        await prisma.manager.create({
            data: {
                user: {
                    create: {
                        name: name,
                        email: faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] }),
                        phone: faker.phone.number(),
                        imageUrl: faker.image.avatarGitHub(),
                        password: await hash("password", 10),
                        role: 'MANAGER',
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
                                done: faker.datatype.boolean(),
                            }
                        }
                    }
                }
            }
        });
    }

    console.log("Managers created")
}


export const CreateAdminManager = async (prisma: PrismaClient) => {
    const manager = await prisma.manager.findFirst({ where: { user: { email: "admin@admin.com" } } });
    const employmentType = faker.helpers.arrayElement(['CLT', 'CNPJ']) as 'CLT' | 'CNPJ';
    if (!manager) {
        await prisma.manager.create({
            data: {
                user: {
                    // create: {
                    //     name: "Admin",
                    //     email: "admin@admin.com",
                    //     password: await hash("password", 10),
                    //     role: 'MANAGER',
                    //     onboardings: {
                    //         create: {
                    //             done: false,
                    //         }
                    //     },
                    // },


                    create: {
                        name: "Admin",
                        email: "admin@admin.com",
                        phone: faker.phone.number(),
                        imageUrl: faker.image.urlPlaceholder({ text: "admin".slice(0, 2), backgroundColor: faker.color.rgb().replace("#", "") , textColor: "fff", width: 200, height: 200}),
                        password: await hash("password", 10),
                        role: 'MANAGER',
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
                                done: faker.datatype.boolean(),
                            }
                        }
                    }
                }
            }
        });

        console.log("Admin Manager created")
    } else {
        console.log("Admin Manager already exists")
    }


}