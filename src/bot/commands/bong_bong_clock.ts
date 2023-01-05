import { Context } from 'telegraf';

export function bongBongClock(time = new Date()): string {
  const currentHour = time.getHours();
  let bongString = '';
  for (let i = 0; i < currentHour; i++) {
    bongString = `${bongString} BONG`;
  }
  return bongString;
}

export default function bongBong(ctx: Context) {
  ctx.reply(bongBongClock());
}
