/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   contact.service.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/14 21:54:16 by cmariot           #+#    #+#             */
/*   Updated: 2023/11/01 14:54:14 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import { MailingService } from './mail.service';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailingService) {}

  async send(
    email: string,
    subject: string,
    message: string,
  ): Promise<boolean> {
    return await this.mailService.sendContactEmail(email, subject, message);
  }
}
