/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   registerUserDto.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 16:09:30 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 17:57:12 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

const enumRole = ['user', 'admin'];

export class RegisterUserDto {
  @IsAlphanumeric()
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  // Role is optional, default value is 'user',
  @IsEnum(enumRole)
  role: string = enumRole[0];
}
