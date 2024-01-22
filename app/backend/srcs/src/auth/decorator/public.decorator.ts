/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   public.decorator.ts                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 16:31:56 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/12 16:35:59 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { SetMetadata } from '@nestjs/common';

// This decorator is used to make a route public.
// The route will be accessible without authentication if @Public() is used.

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
