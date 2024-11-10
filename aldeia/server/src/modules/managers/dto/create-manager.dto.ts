
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateManagerDto {
    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Manager name must be at least 3 characters long' })
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
