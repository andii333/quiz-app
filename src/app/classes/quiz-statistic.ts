export class QuizStatistic {
  amounQuestions: number;
  amountQuizzes: number;
  sumTime: number;
  correctQuestions: number;
  incorrectQuestions: number;
  constructor(
    amounQuestions: number, amountQuizzes: number, sumTime: number, correctQuestions: number, incorrectQuestions: number
    ) {
    this.amounQuestions = amounQuestions,
    this.amountQuizzes = amountQuizzes,
    this.sumTime = sumTime,
    this.correctQuestions = correctQuestions,
    this.incorrectQuestions = incorrectQuestions
  }
}
