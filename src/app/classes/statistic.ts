export class Statistic {
  correct: number;
  incorrect: number;
  amount: number
  constructor(correct: number, incorrect: number, amount: number) {
    this.correct = correct,
      this.incorrect = incorrect,
      this.amount = amount
  }
}
