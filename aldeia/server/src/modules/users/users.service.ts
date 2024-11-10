import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UpdateMeDto } from "./dtos/updated-me.dto";



@Injectable()
export class UsersService {
    constructor(readonly usersRepository: UsersRepository) { }


    async updateMe(userId: string, updateMeDto: UpdateMeDto) {
        const user = await this.usersRepository.findById(userId);
        if (!user) throw new BadRequestException('user not found');

        await this.usersRepository.updateById(userId, {
            name: updateMeDto.name,
            email: updateMeDto.email,
            phone: updateMeDto.phone,
            street: updateMeDto.street,
            neighborhood: updateMeDto.neighborhood,
            city: updateMeDto.city,
            state: updateMeDto.state,
            zipCode: updateMeDto.zipCode,
            employments: {
                update: {
                    where: { id: user.employments[0].id },
                    data: {
                        type: updateMeDto.employment,
                        cnpj: updateMeDto.cnpj,
                        companyName: updateMeDto.companyName,
                        cpf: updateMeDto.cpf,
                        rg: updateMeDto.rg,
                    }

                }
            },
            onboardings: {
                update: {
                    where: { userId: userId, id: user.onboardings[0].id },
                    data: {
                        done: true
                    }
                }
            }
        })
    }
}