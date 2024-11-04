import { BaseEntity } from '@src/app/base';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';

@Entity('users')
@Index('users__by_supertokens_id', ['supertokensId'], { unique: true })
@Index('users__by_email', ['email'], { unique: true })
@Index('users_mods', ['isMod'])
@Index('users_admins', ['isAdmin'])

export class User extends BaseEntity {

    @Column({ type: 'varchar', length: 256, unique: true })
    supertokensId: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    name?: string;

    @Column({ type: 'varchar', length: 256, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 512, nullable: true })
    picture?: string;

    @Column({ type: 'boolean', default: false })
    isMod: boolean;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    constructor() {
        super();
    }

}
