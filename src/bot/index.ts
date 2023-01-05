import { Telegraf } from 'telegraf';
import { CONFIG, userController } from '../config';
import { createJob } from '../cron';
import YearProgress from '../year-progress';
import commands from './commands';
import { bongBongClock } from './commands/bong_bong_clock';
import { markdownYearProgress } from './commands/get_year_progress';

const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;
if (BOT_TOKEN == null) {
  throw new Error('a token should be specified');
}

const BOT = new Telegraf(BOT_TOKEN);

BOT.command('start', commands.start);
BOT.command('yearprogress', commands.getYearProgress);
BOT.command('stop', commands.stop);
BOT.command('bong', commands.bongBong)

const sendMessageDaily = createJob(CONFIG.cron.schedule.daily, async () => {
  const users = await userController.getAll();
  YearProgress.update();
  for (const user of users) {
    BOT.telegram
      .sendMessage(Number(user.chatId), markdownYearProgress(), {
        parse_mode: 'MarkdownV2',
      })
      .then(() => {})
      .catch((err) => console.error('error sending message', err));
  }
});

const sendMessageEveryHour = createJob(CONFIG.cron.schedule.everyHour, async () => {
  const users = await userController.getAll();
  for (const user of users) {
    BOT.telegram
      .sendMessage(Number(user.chatId), bongBongClock())
      .then(() => {})
      .catch((err) => console.log('error sending message', err))
  }
})

console.log('starting daily cron');
sendMessageDaily?.start();
console.log('daily cron started');


console.log('starting every hour cron');
sendMessageEveryHour?.start();
console.log('every hour cron started');

export function run(): void {
  BOT.launch();
}
