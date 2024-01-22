/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   local-auth.guard.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 17:42:10 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:18:59 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// LocalAuthGuard is a custom guard that extends the AuthGuard class from the @nestjs/passport package.
// The AuthGuard class implements the CanActivate() method from the @nestjs/common package.
// The CanActivate() method is executed before the route handler is executed.
// If the CanActivate() method returns true, the route handler is executed.

// The LocalAuthGuard class is used to protect the /auth/login route.
// The canActivate() method returns true if the authentication is successful.
// If the authentication is not successful, the AuthGuard class throws an UnauthorizedException.

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
