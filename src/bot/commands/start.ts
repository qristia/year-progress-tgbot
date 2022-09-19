import { Context } from 'telegraf';
import { userController } from '../../config';

export default function start(ctx: Context): void {
  const chatId = ctx.chat?.id;
  if (chatId != undefined) {
    userController
      .add(chatId.toString())
      .then(() => {
        ctx.replyWithMarkdownV2(`hello, ${ctx.from
          .first_name!}\\. i'll be sending you the progress of the year every day from now on\\!
      if you want me to stop, you can just say \`/stop\` anytime\\!`);
      })
      .catch((err) => {
        ctx.reply('hello!');
      });
  }
}
