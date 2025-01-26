import { Request } from 'express';
import { createParamDecorator } from '@nestjs/common';
import { IAuthUser } from '@src/interfaces';

export const AuthUser = createParamDecorator(
  (data, req: any): IAuthUser => {
    return req.args[0].authUser;
  },
);
