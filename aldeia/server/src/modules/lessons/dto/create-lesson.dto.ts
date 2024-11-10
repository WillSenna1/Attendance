import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Lesson name must be at least 3 characters long' })
    name: string;
}
