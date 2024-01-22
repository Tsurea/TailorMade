/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   jwt-refresh-token.strategy.ts                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 17:06:50 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:19:03 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from '../interface/jwt-payload.interface';

// This is a Passport strategy used for handling refresh tokens.
// It’s used in your refresh - token endpoint which is guarded by
// JwtRefreshTokenGuard that utilizes this strategy.

// This strategy extracts the JWT from the Authorization header, decodes it and
// then calls the validate method. In the validate method, it is checked whether
// a user with the ID contained in the payload of the refresh token exists.
// If the user exists, the user's data is returned and added to the request.user
// object.
// If not, null is returned, which makes Passport to consider the authentication
// as failed, and as a result, an UnauthorizedException is thrown.

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
