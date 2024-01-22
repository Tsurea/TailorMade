/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   local.strategy.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 17:41:23 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:19:15 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // This strategy uses the AuthService's validateUser method to validate the
  // provided username and password. If the user is not found or the password
  // is not valid, an UnauthorizedException is thrown.

  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    // The validateUser method retrieves the user by username using the
    // UsersService and checks if the provided password is valid using the
    // validatePassword method from the User entity.
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // Invalid username or password.
      throw new UnauthorizedException();
    }

    // Username and password are valid.
    // The user object is attached to the request object.
    return user;
  }
}
