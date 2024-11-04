import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const entities = [User];
const services = [];
const subscribers = [];
const controllers = [];
const webControllers = [];
const modules = [];

@Module({
    imports: [TypeOrmModule.forFeature(entities), ...modules],
    providers: [...services, ...subscribers],
    exports: [...services, ...subscribers],
    controllers: [...controllers, ...webControllers],
})
export class UserModule { }
