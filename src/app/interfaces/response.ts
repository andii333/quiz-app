import { Question } from "./question";

export interface ApiResponse {
  response_code:number;
  results:Question[]
}

export interface ApiCategoriesResponse {
  trivia_categories: [{ id: number, name: string }]
}
