// sms.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendSms(to: string, text: string) {
    console.log(to, text);
    try {
      const response = await fetch(process.env.MTS_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.MTS_API_KEY}`,
        },
        body: JSON.stringify({
          number: 'KVN',
          destination: to,
          text: text,
        }),
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
