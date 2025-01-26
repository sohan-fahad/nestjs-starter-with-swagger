import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Request } from 'express';
import { JWTHelper } from '../helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtHelper: JWTHelper) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from headers
    const token = this.jwtHelper.extractToken(request.headers);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify and decode the token
      const decodedToken = this.jwtHelper.verify(token);

      // Attach decoded token to the request object
      (request as any).authUser = decodedToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}