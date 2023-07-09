import { Injectable } from '@angular/core';
import { Statistic } from '../classes/statistic';
import { QuizStatistic } from '../classes/quiz-statistic';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getScore(): number {
    return JSON.parse(localStorage.getItem('score') as string)
  }

  setScore(score: number) {
    localStorage.setItem('score', JSON.stringify(score))
  }

  getMaxScore(): number {
    return JSON.parse(localStorage.getItem('maxscore') as string)
  }

  setMaxScore(score: number) {
    localStorage.setItem('maxscore', JSON.stringify(score))
  }

  setTime(time: number) {
    localStorage.setItem('time', JSON.stringify(time))
  }

  getTime(): number | null {
    return JSON.parse(localStorage.getItem('time') as string)
  }

  removeTimeScore() {
    localStorage.removeItem('score');
    localStorage.removeItem('time');
    localStorage.removeItem('maxscore');
  }

  setStatisticQuestions(correct: number, incorrect: number, amount: number) {
    localStorage.setItem('questions', JSON.stringify(new Statistic(correct, incorrect, amount)))
  }

  getStatisticQuestions(): Statistic {
    return JSON.parse(localStorage.getItem('questions') as string)
  }

  removeStatisticQuestions() {
    localStorage.removeItem('questions');
  }

  getStats(): QuizStatistic {
    return JSON.parse(localStorage.getItem('stats') as string)
  }

  updateStats(questions: number, quiz: number, time: number, correct: number, incorrect: number) {
    if (localStorage.getItem('stats')) {
      const amounQuestions = JSON.parse(localStorage.getItem('stats') as string).amounQuestions
      const amountQuizzes = JSON.parse(localStorage.getItem('stats') as string).amountQuizzes
      const sumTime = JSON.parse(localStorage.getItem('stats') as string).sumTime
      const correctQuestions = JSON.parse(localStorage.getItem('stats') as string).correctQuestions
      const incorrectQuestions = JSON.parse(localStorage.getItem('stats') as string).incorrectQuestions
      localStorage.setItem('stats', JSON.stringify(
        new QuizStatistic(
          amounQuestions + questions, amountQuizzes + quiz, sumTime + time, correctQuestions + correct,
          incorrectQuestions + incorrect
        )
      ))
    } else {
      localStorage.setItem('stats', JSON.stringify(
        new QuizStatistic(questions, quiz, time, correct, incorrect)
      ))
    }
  }

}
