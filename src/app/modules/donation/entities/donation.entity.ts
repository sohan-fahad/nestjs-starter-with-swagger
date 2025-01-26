import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { DonationGatewayEnum, DonationStatusEnum, DonationTypeEnum } from '@src/shared';
import { BaseEntity } from '@src/app/base';

@Entity('donations')
export class Donation extends BaseEntity {

    @Column('decimal', {
        precision: 10,
        scale: 2,
        nullable: false
    })
    amount?: number;

    @Column('varchar', {
        length: 255,
        nullable: true
    })
    donorName?: string;


    @Column('text', {
        nullable: true
    })
    message?: string;

    @Column('enum', {
        enum: DonationTypeEnum,
        default: DonationTypeEnum.ONE_TIME,
        nullable: true
    })
    type?: DonationTypeEnum;

    @Column('enum', {
        enum: DonationStatusEnum,
        default: DonationStatusEnum.PENDING,
        nullable: true
    })
    status?: DonationStatusEnum;

    @Column('boolean', {
        default: false
    })
    isAnonymous?: boolean;

    @ManyToOne(() => User, {
        nullable: true
    })
    @JoinColumn({ name: 'donor_id' })
    donor?: User;

    @Column('varchar', {
        length: 255,
        nullable: true
    })
    transactionId?: string;

    @Column('enum', {
        enum: DonationGatewayEnum,
        nullable: true
    })
    paymentGateway?: DonationGatewayEnum;

    constructor() {
        super();
    }
}