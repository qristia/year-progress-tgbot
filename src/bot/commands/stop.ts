import { Context } from 'telegraf';
import { userController } from '../../config';

export default function stop(ctx: Context) {
  const chatId = ctx.chat?.id;
  if (chatId != undefined) {
    ctx.reply(`bye, bye ${ctx.from.first_name!}`);
    userController
      .remove(chatId.toString())
      .then(() => {
        console.log('user deleted:', ctx.from.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
