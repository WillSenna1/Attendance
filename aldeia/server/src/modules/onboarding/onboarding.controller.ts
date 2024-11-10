import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CompleteOnboarding } from './dto/complete-onboarding.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@Controller('onboarding')
@ApiTags('onboarding')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }

  @Post(':userId')
  completeOnboarding(@Param('userId') userId: string, @Body() completeOnboarding: CompleteOnboarding) {
    return this.onboardingService.completeOnboarding(userId, completeOnboarding);
  }
}
