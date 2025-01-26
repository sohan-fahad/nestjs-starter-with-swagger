import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { BaseService } from "@src/app/base";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterDTO } from "../dtos/register.dto";
import { UserRole } from "@src/shared";
import { LoginDTO } from "../dtos/login.dto";
import { BcryptHelper } from "@src/app/helpers";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        private readonly _repo: Repository<User>,
        private readonly bcrypt: BcryptHelper,
    ) {
        super(_repo);
    }

    async loginUser(payload: LoginDTO): Promise<User> {
        const existUser = await this.findOne({
            where: { phoneNumber: payload.phoneNumber },
            select: [
                'id',
                'name',
                'email',
                'phoneNumber',
                'role',
                'password'
            ],
        });

        if (!existUser) {
            throw new NotFoundException('User not found!');
        }

        const isPasswordMatch = await this.bcrypt.compareHash(
            payload.password,
            existUser.password
        );

        if (!isPasswordMatch) {
            throw new BadRequestException('Password does not match');
        }

        delete existUser.password;


        return existUser;
    }

    async registerUser(payload: RegisterDTO): Promise<User> {
        const existUser = await this.findOne({
            where: [
                { phoneNumber: payload.phoneNumber },
            ]
        })

        if (existUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await this.bcrypt.hash(payload.password);

        const createUser = await this.createOneBase({ ...payload, role: UserRole.USER, password: hashedPassword });

        delete createUser.password;

        return createUser;
    }
}