import { Module, Global } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer/dist';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: config.get("MAIL_SERVICE"),
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASSWORD"),
          },
          tls: { rejectUnauthorized: false },
          default: {
            from: `noreply`,
          },
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
