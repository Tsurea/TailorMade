/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   users.service.ts                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/11 17:23:30 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:08:35 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUserDto';
import { User, userRoleEnum } from './entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // This method is used by the AuthController to create a new user.
  async create(registerUserDto: RegisterUserDto): Promise<User> {
    // Extract the data from the DTO.
    const { username, email, password } = registerUserDto;

    if (!username || !email || !password) {
      throw new UnauthorizedException('Missing data');
    }

    // Check if a user with the same username already exists.
    const userWithSameUsername = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (userWithSameUsername) {
      throw new UnauthorizedException('Username already exists');
    }

    // Hash the password before saving it to the database.
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save it to the database.
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    if (user.id === 1) {
      user.role = userRoleEnum.admin;
    } else {
      user.role = userRoleEnum.user;
    }
    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getById(
    id: number,
  ): Promise<{ username: string; email: string } | null> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const partialUser = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return partialUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
