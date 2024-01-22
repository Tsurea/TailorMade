/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   contact.controller.ts                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 21:01:23 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 21:12:23 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorator/public.decorator';
import { ContactService } from './contact.service';

class contactDTO {
  email: string;
  subject: string;
  message: string;
}

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Public()
  @Post()
  private(@Body() body: contactDTO) {
    return this.contactService.send(body.email, body.subject, body.message);
  }
}
