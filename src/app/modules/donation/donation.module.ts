import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpersModule } from '@src/app/helpers/helper.module';
import { Donation } from './entities/donation.entity';
import { DonationService } from './services/donation.service';

const entities = [Donation];
const services = [DonationService];
const subscribers = [];
const controllers = [];
const webControllers = [];
const modules = [HelpersModule];

@Module({
    imports: [TypeOrmModule.forFeature(entities), ...modules],
    providers: [...services, ...subscribers],
    exports: [...services, ...subscribers],
    controllers: [...controllers, ...webControllers],
})
export class DonationModule { }
