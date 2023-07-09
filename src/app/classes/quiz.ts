export class Quiz {
  categoryId:number;
  categoryName:string;
  questionsAmount:number;
  constructor(categoryId: number, categoryName: string, questionsAmount: number){
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.questionsAmount = questionsAmount;
  }
}
