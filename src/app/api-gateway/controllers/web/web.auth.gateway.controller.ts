import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JWTHelper } from "@src/app/helpers";
import { LoginDTO } from "@src/app/modules/user/dtos/login.dto";
import { RegisterDTO } from "@src/app/modules/user/dtos/register.dto";
import { UserService } from "@src/app/modules/user/services/user.service";
import { SuccessResponse } from "@src/app/types";

@ApiTags('Web Auth')
@Controller('web/auth')
export class WebAuthGatewayController {
    RELATIONS = [];
    constructor(
        private readonly service: UserService,
        private readonly jwtHelper: JWTHelper,
    ) { }


    @Post('login')
    async loginUser(@Body() body: LoginDTO) {
        const existUser = await this.service.loginUser(body);
        const tokenPayload = {
            user: existUser,
        };
        const token = this.jwtHelper.makeAccessToken(tokenPayload);
        return new SuccessResponse("User logged in successfully", { token, user: existUser });
    }

    @Post('register')
    async registerUser(@Body() body: RegisterDTO) {
        const createUser = await this.service.registerUser(body);
        return new SuccessResponse("User registered successfully", createUser);
    }
}
