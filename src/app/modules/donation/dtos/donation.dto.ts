import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    IsNotEmpty,
    Min,
    IsNumberString,
    IsUUID,
    IsBooleanString
} from 'class-validator';
import { DonationGatewayEnum, DonationStatusEnum, DonationTypeEnum } from '@src/shared';
import { BaseDTO } from '@src/app/base';

export class CreateDonationDto {
    @ApiProperty({
        type: Number,
        required: true,
        example: 500,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiProperty({
        type: String,
        required: true,
        example: 'Abdul Khalek',
    })
    @IsOptional()
    @IsString()
    donorName?: string;

    @ApiProperty({
        type: String,
        required: false,
        example: 'Donation for education fund',
    })
    @IsOptional()
    @IsString()
    message?: string;

    @ApiProperty({
        enum: DonationTypeEnum,
        required: false,
        example: DonationTypeEnum.ONE_TIME,
    })
    @IsOptional()
    @IsEnum(DonationTypeEnum)
    type?: DonationTypeEnum;

    @ApiProperty({
        enum: DonationGatewayEnum,
        required: true,
        example: DonationGatewayEnum.BKASH,
    })
    @IsOptional()
    @IsEnum(DonationGatewayEnum)
    paymentGateway?: DonationGatewayEnum;

    @ApiProperty({
        type: String,
        required: true,
        example: 'TRX123456789',
    })
    @IsOptional()
    @IsString()
    transactionId?: string;
}

export class UpdateDonationDto {
    @ApiProperty({
        type: Number,
        required: false,
        example: 750,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    amount?: number;

    @ApiProperty({
        enum: DonationStatusEnum,
        required: false,
        example: DonationStatusEnum.COMPLETED,
    })
    @IsOptional()
    @IsEnum(DonationStatusEnum)
    status?: DonationStatusEnum;
}

export class DonationReportDto {
    @ApiProperty({
        type: String,
        required: false,
        example: '2024-01-01',
    })
    @IsOptional()
    @IsString()
    startDate?: string;

    @ApiProperty({
        type: String,
        required: false,
        example: '2024-12-31',
    })
    @IsOptional()
    @IsString()
    endDate?: string;
}

export class FilterDonationDTO extends BaseDTO {
    @ApiProperty({
        type: Number,
        description: 'Limit the number of results',
        default: 10,
        required: false,
    })
    @IsOptional()
    @IsNumberString()
    readonly limit: number = 10;

    @ApiProperty({
        type: Number,
        description: 'The page number',
        default: 1,
        required: false,
    })
    @IsOptional()
    @IsNumberString()
    readonly page: number = 1;

    @ApiProperty({
        type: String,
        description: 'The search term',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly searchTerm!: string;

    @ApiProperty({
        type: String,
        required: false,
        description: 'donor id',
    })
    @IsOptional()
    @IsUUID()
    readonly donor!: any;

    @ApiProperty({
        enum: DonationStatusEnum,
        required: false,
        example: DonationStatusEnum.COMPLETED,
    })
    @IsOptional()
    @IsEnum(DonationStatusEnum)
    readonly status?: DonationStatusEnum;

    @ApiProperty({
        enum: DonationGatewayEnum,
        required: false,
        example: DonationGatewayEnum.BANK,
    })
    @IsOptional()
    @IsEnum(DonationGatewayEnum)
    readonly paymentGateway?: DonationGatewayEnum;



    @IsBooleanString()
    @IsOptional()
    @ApiProperty({ required: false })
    includeDeleted: boolean;

    @ApiProperty({
        type: String,
        required: false,
        example: '2024-01-01',
    })
    @IsOptional()
    @IsString()
    startDate?: string;

    @ApiProperty({
        type: String,
        required: false,
        example: '2024-12-31',
    })
    @IsOptional()
    @IsString()
    endDate?: string;
}