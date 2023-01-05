import YearProgress from './year-progress';
import { config } from 'dotenv';
import { run } from './bot';

config();
run();

YearProgress.update();
console.log(YearProgress.getProgressBar(true));
