

export enum DayTime {
  night = 'night',
  morning = 'morning',
  afternoon = 'afternoon',
  evening = 'evening'
};


export class GameTime {
  day: number;
  time: DayTime;
  steps: number;

  lastTimeTwittedDay: number;
  lastTimeNewspaperReleasedDay: number;

  constructor() {
    this.steps = 0;
    this.day = 1
    this.time = DayTime.morning

    this.lastTimeTwittedDay = 1;
    this.lastTimeNewspaperReleasedDay = 1;
  }

  clone() {
    const clone = new GameTime();

    clone.day = this.day;
    clone.time = this.time;
    clone.steps = this.steps;
    clone.lastTimeTwittedDay = this.lastTimeTwittedDay;
    clone.lastTimeNewspaperReleasedDay = this.lastTimeNewspaperReleasedDay;
    return clone;
  }

  compare(other: GameTime) {
    return this.steps - other.steps;
  }

  step() {
    this.steps += 1;

    if (this.time === DayTime.night) {
      this.time = DayTime.morning;
      this.day += 1;
      return;
    }

    if (this.time === DayTime.morning) {
      this.time = DayTime.afternoon;
      return;
    }

    if (this.time === DayTime.afternoon) {
      this.time = DayTime.evening;
      return;
    }

    if (this.time === DayTime.evening) {
      this.time = DayTime.night;
      return;
    }

    throw new Error(`Unknown time ${this.time}`);
  }

  markTwitted() {
    this.lastTimeTwittedDay = this.day;
  }

  markNewspaperReleased() {
    this.lastTimeNewspaperReleasedDay = this.day;
  }

  shouldTwitToday() {
    return this.day !== this.lastTimeTwittedDay;
  }

  mustTwit() {
    return this.shouldTwitToday() && this.time === DayTime.evening;
  }

  shouldReleaseNewspaperToday() {
    return this.day - this.lastTimeNewspaperReleasedDay >= 6;
  }

  mustReleaseNewspaper() {
    return this.shouldReleaseNewspaperToday() && this.time === DayTime.evening;
  }

  stepAllowed() {
    return !this.mustTwit() && !this.mustReleaseNewspaper();
  }

}
