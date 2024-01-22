/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   user.ts                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/11 17:12:30 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:06:06 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Role enum
export enum userRoleEnum {
  'user' = 'user',
  'moderator' = 'moderator',
  'admin' = 'admin',
}

@Entity() // This decorator tells TypeORM that this is a database table.
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: userRoleEnum,
    default: userRoleEnum.user,
  })
  role: userRoleEnum;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
