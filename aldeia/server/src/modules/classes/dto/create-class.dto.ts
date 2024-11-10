import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateClassDto {
    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Class name must be at least 3 characters long' })
    name: string;
}
