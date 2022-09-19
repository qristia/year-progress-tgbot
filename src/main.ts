import YearProgress from './year-progress';
import {config} from 'dotenv';
config();

import { run } from './bot';

run();

YearProgress.update();
console.log(YearProgress.getProgressBar(true));
