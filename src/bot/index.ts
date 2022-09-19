import { Telegraf } from 'telegraf';
import { userController } from '../config';
import { createDailyJob } from '../cron';
import YearProgress from '../year-progress';
import commands from './commands';
import { markdownYearProgress } from './commands/get_year_progress';

const BOT_TOKEN: string | undefined = process.env.BOT_TOKEN;
if (BOT_TOKEN == null) {
  throw new Error('a token should be specified');
}

const BOT = new Telegraf(BOT_TOKEN);

BOT.command('start', commands.start);
BOT.command('yearprogress', commands.getYearProgress);
BOT.command('stop', commands.stop);

const sendMessageDaily = createDailyJob(async () => {
  const users = await userController.getAll();
  YearProgress.update();
  for (const user of users) {
    BOT.telegram
      .sendMessage(Number(user.chatId), markdownYearProgress(), {
        parse_mode: 'MarkdownV2',
      })
      .catch((err) => console.error('error sending message', err));
  }
});

console.log('starting daily cron');
sendMessageDaily?.start();
console.log('daily cron started');

export function run(): void {
  BOT.launch();
}
