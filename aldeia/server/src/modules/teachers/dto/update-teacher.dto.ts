import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EmploymentType } from '@prisma/client';

export class UpdateTeacherDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    street?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    addressNum?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    neighborhood?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    zipCode?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    cpf?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    rg?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    cnpj?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    companyName?: string;

    @ApiProperty()
    @IsEnum(EmploymentType)
    employment: EmploymentType;
}
