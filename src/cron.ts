import { CronJob } from 'cron';
import { CONFIG } from './config';

export function createDailyJob(callback: () => void): CronJob | undefined {
  console.log('creating cron job');
  try {
    const dailyJob = new CronJob(
      CONFIG.cron.schedule.daily,
      () => {
        callback();
      },
      null,
      false,
      CONFIG.cron.tz
    );
    console.log('cron job created');
    return dailyJob;
  } catch (error) {
    console.log('failed to create cron job', error);
    return undefined;
  }
}
