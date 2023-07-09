import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Categories } from '../interfaces/categories';
import { ApiCategoriesResponse, ApiResponse } from '../interfaces/response';
import { Quiz } from '../classes/quiz';
import { AllQuestions } from '../classes/all-questions';
@Injectable()
export class ApiService {
  private _allQuestions = new BehaviorSubject<AllQuestions[]>([]);
  readonly allQuestions$: Observable<AllQuestions[]> = this._allQuestions.asObservable();
  private _quizzes = new BehaviorSubject<Quiz[]>([]);
  readonly quizzes$: Observable<Quiz[]> = this._quizzes.asObservable();
  categories: Categories[] = [];
  selectedCategories: Categories[] = [];
  a = 0;
  constructor(
    private http: HttpClient,
  ) {
    this.getCategories()
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getCategories() {
    this.http.get<ApiCategoriesResponse>('https://opentdb.com/api_category.php').subscribe((data) => {
      this.categories = [...data.trivia_categories]
      let i = 1
      while (i < 11) {
        i++
        this.getQuizzes()
      }
    })
  }

  getQuizzes() {
    const rundom = this.randomNumber(0, this.categories.length);
    this.http.get<ApiResponse>(
      `https://opentdb.com/api.php?amount=${this.randomNumber(10, 20)}&category=${this.categories[rundom].id
      }`).subscribe((res) => {
        const categoryId = this.selectedCategories[this.a].id;
        const categoryName = this.selectedCategories[this.a].name;
        const allQuestions = new AllQuestions(categoryId, categoryName, res.results);
        this._allQuestions.next([...this._allQuestions.value, allQuestions]);
        const quiz = new Quiz(categoryId, categoryName, res.results.length)
        this._quizzes.next([...this._quizzes.value, quiz]);
        this.a++
      })
    this.selectedCategories.push(this.categories[rundom]);
    this.categories.splice(rundom, 1)
  }

}
