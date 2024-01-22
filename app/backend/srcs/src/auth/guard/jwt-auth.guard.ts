import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard is a custom guard that extends the AuthGuard class from the @nestjs/passport package.
// The AuthGuard class implements the CanActivate() method from the @nestjs/common package.
// The CanActivate() method is executed before the route handler is executed.
// If the CanActivate() method returns true, the route handler is executed.

// The JwtAuthGuard class is used to verify the JWT token in the Authorization header.
// The canActivate() method returns true if the JWT token is valid.
// If the JWT token is not valid, the AuthGuard class throws an UnauthorizedException.

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
