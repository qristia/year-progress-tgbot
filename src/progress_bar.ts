import { CONFIG } from './config';

export default class ProgressBar {
  private chars: string[] = CONFIG.progressBar.chars;
  private wrapper: string[] = CONFIG.progressBar.wrapper;
  private width: number = CONFIG.progressBar.width;
  protected percentage: number;

  constructor(percentage = 0) {
    this.percentage = percentage;
  }

  update(value: number): void {
    if (value < 0) value = 0;
    this.percentage = value;
  }

  getProgress(): number {
    return this.percentage;
  }

  getLabel() {
    return `${(this.percentage * 100).toFixed(2)}%`
  }

  getBar(label: boolean, wrap: boolean): string {
    let bar = '';
    const value = this.percentage * this.width;

    const dones = Math.floor(value);
    for (let i = 0; i < dones; i++) {
      bar += this.chars[0];
    }
    if (this.percentage < 1) bar += this.chars[1];

    const remainings = this.width - dones - 1;
    for (let i = 0; i < remainings; i++) {
      bar += this.chars[2];
    }

    if (wrap) {
      bar = `${this.wrapper[0]}${bar}${this.wrapper[1]}`;
    }
    if (label) {
      bar = `${bar} ${this.getLabel()}`;
    }
    return bar;
  }
}
