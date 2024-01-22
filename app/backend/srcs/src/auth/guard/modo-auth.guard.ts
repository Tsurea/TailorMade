/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   modo-auth.guard.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 18:53:11 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 19:12:17 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class ModoGuard extends NestAuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    // If the user is an admin, the request is authorized.
    // If the user is not an admin, the request is unauthorized.
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    if (user.role === 'modo' || user.role === 'admin') {
      return user;
    }
    throw new UnauthorizedException();
  }
}
