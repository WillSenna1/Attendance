import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, MinLength, Length, IsPostalCode, IsArray, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Student name must be at least 3 characters long' })
    name: string;

    @ApiProperty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty()
    @IsString()
    cpf?: string;

    @ApiProperty()
    @IsString()
    rg?: string;

    @ApiProperty()
    @IsString()
    phone?: string;


    @ApiProperty()
    @IsString()
    nis?: string;

    @ApiProperty()
    @IsString()
    priorityGroup?: string;

    @ApiProperty()
    @IsString()
    recordNumber?: string;

    @ApiProperty()
    @IsString()
    forwarding?: string;

    @ApiProperty()
    @IsOptional()
    imageBuffer?: {
        type: string;
        data: string;
    }

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    street?: string | null;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    neighborhood?: string | null;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    city?: string | null;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    state?: string | null;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    zipCode?: string | null;

    @ApiProperty({ type: () => [Responsible] })
    @IsArray()
    @IsOptional()
    responsibles?: Responsible[];
}


class Responsible {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @Length(10, 11)
    phone: string;
}