import { Module } from "@nestjs/common";
import { UserModule } from "../modules/user/user.module";
import { WebAuthGatewayController } from "./controllers/web/web.auth.gateway.controller";
import { HelpersModule } from "../helpers/helper.module";
import { DonationModule } from "../modules/donation/donation.module";
import { WebDonationGatewayController } from "./controllers/web/web.donation.gateway.controller";

const services = [];
const opsGatewayControllers = []
const webGatewayControllers = [WebAuthGatewayController, WebDonationGatewayController]

const modules = [UserModule, DonationModule, HelpersModule];

@Module({
    imports: [...modules],
    providers: [...services],
    controllers: [...webGatewayControllers, ...opsGatewayControllers],
})
export class APIGatewayModule { }
