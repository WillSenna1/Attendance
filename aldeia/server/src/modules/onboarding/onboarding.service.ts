import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { hash } from 'bcrypt';
import { CompleteOnboarding } from './dto/complete-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly userRepository: UsersRepository

  ) { }


  async completeOnboarding(userId: string, completeOnboarding: CompleteOnboarding) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new BadRequestException('user not found');

    await this.userRepository.updateById(userId, {
      name: completeOnboarding.name,
      email: completeOnboarding.email,
      password: await hash(completeOnboarding.password, 10),
      phone: completeOnboarding.phone,
      street: completeOnboarding.street,
      neighborhood: completeOnboarding.neighborhood,
      city: completeOnboarding.city,
      state: completeOnboarding.state,
      zipCode: completeOnboarding.zipCode,
      employments: {
        create: {
          type: completeOnboarding.employment,
          cnpj: completeOnboarding.cnpj,
          companyName: completeOnboarding.companyName,
          cpf: completeOnboarding.cpf,
          rg: completeOnboarding.rg,

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
