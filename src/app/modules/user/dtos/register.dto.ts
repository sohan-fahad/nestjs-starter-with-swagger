import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class RegisterDTO {
    @ApiProperty({
        type: String,
        required: false,
        example: '01838560500',
    })
    @IsOptional()
    @IsNumberString()
    @MinLength(11)
    @MaxLength(11)
    readonly phoneNumber!: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'sohan@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Abdul Khalek',
    })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;


    @ApiProperty({
        type: String,
        required: true,
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    readonly password!: string;
}
