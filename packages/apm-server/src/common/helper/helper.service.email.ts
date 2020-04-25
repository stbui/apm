import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { Config } from '../../config/config';

export interface IEmailOptions {
    to: string;
    subject: string;
    text: string;
    html: string;
}

@Injectable()
export class EmailService {
    private transporter: nodemailer;
    private clientIsValid: boolean;

    constructor() {
        this.transporter = nodemailer.createTransport(Config.email);
    }

    // 验证有效性
    private verifyClient(): void {
        return this.transporter.verify((error, success) => {
            if (error) {
                this.clientIsValid = false;
                setTimeout(this.verifyClient.bind(this), 1000 * 60 * 60);
                setTimeout(() => console.warn('邮件客户端初始化连接失败，将在一小时后重试', error.message), 0);
            } else {
                this.clientIsValid = true;
                setTimeout(() => console.info('邮件客户端初始化连接成功，随时可发送邮件'), 0);
            }
        });
    }

    // 发邮件
    public sendMail(mailOptions: IEmailOptions) {
        if (!this.clientIsValid) {
            console.warn('由于未初始化成功，邮件客户端发送被拒绝');
            return false;
        }
        const options = Object.assign(mailOptions, { from: Config.email_from });
        this.transporter.sendMail(options, (error, info) => {
            if (error) {
                console.warn('邮件发送失败', error);
            } else {
                console.info('邮件发送成功', info.messageId, info.response);
            }
        });
    }
}
