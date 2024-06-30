// sms.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendSms(to: string, text: string) {
    console.log(to.slice(1), text);
    try {
      const response = await fetch(process.env.MTS_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MTS_API_KEY}`,
        },
        body: JSON.stringify({
          number: process.env.MTS_NUMBER,
          destination: to.slice(1),
          text: text,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
