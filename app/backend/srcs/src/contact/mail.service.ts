/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   mail.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/15 21:36:14 by cmariot           #+#    #+#             */
/*   Updated: 2023/11/01 14:55:01 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailingService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendContactEmail(email: string, subject: string, message: string) {
    try {
      await this.transporter.sendMail({
        to: process.env.EMAIL_USER,
        from: process.env.EMAIL_USER,
        subject: subject,
        html: message + '<br><br>From: ' + email,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
