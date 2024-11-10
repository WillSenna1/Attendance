import { BadRequestException, Body, Controller, Get, Patch, UseGuards,  } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ReqUser } from "../auth/decorators/user.decorator";
import { User } from "@prisma/client";
import { UpdateMeDto } from "./dtos/updated-me.dto";
import { UsersService } from "./users.service";

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get("me")
  GetMe(@ReqUser() user: User) {
    return user;
  }

  @Patch("me")
  async UpdateMe(@ReqUser() user: User, @Body() updateMe: UpdateMeDto) {
    return await this.usersService.updateMe(user.id, updateMe);
  }

}
