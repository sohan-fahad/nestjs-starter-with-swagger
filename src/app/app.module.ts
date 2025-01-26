import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@src/database/database.module';
import { APIGatewayModule } from './api-gateway/api-gateway.module';
import { AuthMiddleware } from './middlewares';
import { HelpersModule } from './helpers/helper.module';

@Module({
  imports: [
    DatabaseModule,
    APIGatewayModule,
    HelpersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/web/auth*',
          method: RequestMethod.ALL,
        },
        // {
        //   path: '/v1/dm/auth/*',
        //   method: RequestMethod.ALL,
        // },
      )
      .forRoutes(
        { path: '/web/donations*', method: RequestMethod.ALL },


      );
    // const prefix = '';

    // consumer
    //   .apply(AuthMiddleware)
    //   .exclude(
    //     {
    //       path: `${prefix}/seed-db`,
    //       method: RequestMethod.GET,
    //     },
    //     {
    //       path: `${prefix}/auth/login`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/auth/register`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/auth/refresh-token`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/auth/reset-password-request`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/auth/reset-password-verify`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/web/auth/refresh-token`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/web/auth/send-otp`,
    //       method: RequestMethod.POST,
    //     },
    //     {
    //       path: `${prefix}/web/auth/verify-otp`,
    //       method: RequestMethod.POST,
    //     },
    //   )
    //   .forRoutes('*');
  }
}
