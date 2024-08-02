import { Injectable, Logger } from '@nestjs/common'
import { createTransport } from 'nodemailer'
import * as Mail from 'nodemailer/lib/mailer'

import Config from 'src/utils/configs/config'

import {
  changeMail,
  changePasswordInfo,
  confirmMail,
  resetPassword,
} from './templates'

@Injectable()
export class MailSenderService {
  private transporter: Mail

  private socials: string

  private logger = new Logger('MailSenderService')

  constructor() {
    this.transporter = createTransport({
      auth: {
        user: Config().mail_service.user,
        pass: Config().mail_service.pass,
      },
      host: Config().mail_service.host,
      port: Config().mail_service.port,
      secure: Config().mail_service.secure,
    })
    this.socials = Config()
      .project.socials.map(
        (social) =>
          `<a href="${social[1]}" style="box-sizing:border-box;color:${Config().project.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`,
      )
      .join('')
  }

  async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${Config().project.mailVerificationUrl}?token=${token}`

    const mail = confirmMail
      .replace(/--PersonName--/g, name)
      .replace(/--ProjectName--/g, Config().project.name)
      .replace(/--ProjectAddress--/g, Config().project.address)
      .replace(/--ProjectLogo--/g, Config().project.logoUrl)
      .replace(/--ProjectSlogan--/g, Config().project.slogan)
      .replace(/--ProjectColor--/g, Config().project.color)
      .replace(/--ProjectLink--/g, Config().project.url)
      .replace(/--Socials--/g, this.socials)
      .replace(/--ButtonLink--/g, buttonLink)
      .replace(/--TermsOfServiceLink--/g, Config().project.termsOfServiceUrl)

    const mailOptions = {
      from: `"${Config().mail_service.credentials.name}" <${Config().mail_service.credentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${Config().project.name} ${name}! Confirm Your Email`,
      html: mail,
    }

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          )
          resolve(false)
        }
        resolve(true)
      }),
    )
  }

  async sendChangeEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${Config().project.mailChangeUrl}?token=${token}`

    const mail = changeMail
      .replace(/--PersonName--/g, name)
      .replace(/--ProjectName--/g, Config().project.name)
      .replace(/--ProjectAddress--/g, Config().project.address)
      .replace(/--ProjectLogo--/g, Config().project.logoUrl)
      .replace(/--ProjectSlogan--/g, Config().project.slogan)
      .replace(/--ProjectColor--/g, Config().project.color)
      .replace(/--ProjectLink--/g, Config().project.url)
      .replace(/--Socials--/g, this.socials)
      .replace(/--ButtonLink--/g, buttonLink)

    const mailOptions = {
      from: `"${Config().mail_service.credentials.name}" <${Config().mail_service.credentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Change Your ${Config().project.name} Account's Email`,
      html: mail,
    }

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          )
          resolve(false)
        }
        resolve(true)
      }),
    )
  }

  async sendResetPasswordMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${Config().project.resetPasswordUrl}?token=${token}`

    const mail = resetPassword
      .replace(/--PersonName--/g, name)
      .replace(/--ProjectName--/g, Config().project.name)
      .replace(/--ProjectAddress--/g, Config().project.address)
      .replace(/--ProjectLogo--/g, Config().project.logoUrl)
      .replace(/--ProjectSlogan--/g, Config().project.slogan)
      .replace(/--ProjectColor--/g, Config().project.color)
      .replace(/--ProjectLink--/g, Config().project.url)
      .replace(/--Socials--/g, this.socials)
      .replace(/--ButtonLink--/g, buttonLink)

    const mailOptions = {
      from: `"${Config().mail_service.credentials.name}" <${Config().mail_service.credentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Reset Your ${Config().project.name} Account's Password`,
      html: mail,
    }

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          )
          resolve(false)
        }
        resolve(true)
      }),
    )
  }

  async sendPasswordChangeInfoMail(
    name: string,
    email: string,
  ): Promise<boolean> {
    const buttonLink = Config().project.url
    const mail = changePasswordInfo
      .replace(/--PersonName--/g, name)
      .replace(/--ProjectName--/g, Config().project.name)
      .replace(/--ProjectAddress--/g, Config().project.address)
      .replace(/--ProjectLogo--/g, Config().project.logoUrl)
      .replace(/--ProjectSlogan--/g, Config().project.slogan)
      .replace(/--ProjectColor--/g, Config().project.color)
      .replace(/--ProjectLink--/g, Config().project.url)
      .replace(/--Socials--/g, this.socials)
      .replace(/--ButtonLink--/g, buttonLink)

    const mailOptions = {
      from: `"${Config().mail_service.credentials.name}" <${Config().mail_service.credentials.email}>`,
      to: email, // list of receivers (separated by ,)
      subject: `Your ${Config().project.name} Account's Password is Changed`,
      html: mail,
    }

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          this.logger.warn(
            'Mail sending failed, check your service credentials.',
          )
          resolve(false)
        }
        resolve(true)
      }),
    )
  }
}
