import { Question } from "../interfaces/question";

export class AllQuestions {
  categoryId: number;
  categoryName: string;
  questions: Question[];
  constructor(categoryId: number,
    categoryName: string,
    questions: Question[]) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.questions = questions;
  }
}
