import { UserController } from './db/controller/UserController';

export const userController = new UserController();
export const CONFIG = {
  progressBar: {
    width: 15,
    wrapper: ['[', ']'],
    chars: ['=', '>', '.'],
  },
  cron: {
    schedule: {
      daily: '00 00 * * *',
      every30Seconds: '*/30 * * * * *',
    },
    tz: 'America/Sao_Paulo',
  },
};
