import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";



export class LoginDTO {
    @ApiProperty({
        type: String,
        required: true,
        example: '01838560500',
    })
    @IsNotEmpty()
    @IsNumberString()
    readonly phoneNumber!: string;

    @ApiProperty({
        type: String,
        required: true,
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    readonly password!: string;
}