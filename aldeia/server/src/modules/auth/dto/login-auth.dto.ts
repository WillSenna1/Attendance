import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';


export class LoginAuthDto {
    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string;
}
