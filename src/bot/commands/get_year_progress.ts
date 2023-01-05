import { Context } from 'telegraf';
import YearProgress from '../../year-progress';

export function markdownYearProgress(): string {
  return 'year progress:\n'.concat(
    '`', YearProgress.getProgressBar(), '`',
    ' _', YearProgress.getLabel().replace('.', '\\.'), '_',
  );
}

export default function getYearProgress(ctx: Context): void {
  YearProgress.update();
  ctx.replyWithMarkdownV2(markdownYearProgress());
}
