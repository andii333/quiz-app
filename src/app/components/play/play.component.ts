import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, timer } from 'rxjs';
import { Question } from 'src/app/interfaces/question';
import { ApiService } from 'src/app/services/api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayComponent implements OnInit, OnDestroy {
  categoryId!: number;
  questionId!: number;
  question!: Question;
  questions!: Question[];
  subscription = new Subscription;
  timer$ = timer(1000, 1000);
  time!: number;
  correct = 0;
  incorrect = 0;
  constructor(
    private apiService: ApiService,
    private lsService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const allQuestions$ = this.route.params.pipe(switchMap(() => {
      return this.apiService.allQuestions$
    }));
    this.subscription.add(this.route.params.subscribe(params => {
      this.questionId = +params['questionId'] - 1;
      this.categoryId = +params['categoryId'];
    }));
    this.subscription.add(allQuestions$.subscribe((questions) => {
      const questionType = questions.filter(question => question.categoryId === this.categoryId)[0]
      this.questions = questionType.questions;
      this.questions = this.sort(this.questions)
      this.question = this.questions[this.questionId];
    }))
    this.subscription.add(this.timer$.subscribe(time => this.time = time));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sort(questions: Question[]) {
    return questions.sort((a: { difficulty: string; }, b: { difficulty: string; }) => {
      if (this.difficulty(a.difficulty) > (this.difficulty(b.difficulty))) { return 1 }
      if (this.difficulty(a.difficulty) < (this.difficulty(b.difficulty))) { return -1 }
      return 0
    })
  }

  actionsAnswer(lastQuestion: number, correctness: number) {
    correctness ? this.correct++ : this.incorrect++
    if (this.questionId === lastQuestion - 1) {
      this.router.navigate(['/finish']);
      this.lsService.setTime(this.time);
      this.lsService.setStatisticQuestions(this.correct, this.incorrect, this.questions.length)
      this.lsService.updateStats(this.questions.length, 1, this.time, this.correct, this.incorrect)
    } else {
      this.router.navigate(['play', this.categoryId, this.questionId + 2])
    }
  }

  difficulty(difficulty: string): number {
    if (difficulty === 'easy') { return 1 } else
      if (difficulty === 'medium') { return 2 } else {
        return 3
      }
  }

  sendToLocalStorage(correctness: number, difficulty: string) {
    const count = correctness * this.difficulty(difficulty);
    const score = this.lsService.getScore();
    score ? this.lsService.setScore(score + count) : this.lsService.setScore(count);
    const maxcount = this.difficulty(difficulty);
    const maxscore = this.lsService.getMaxScore();
    maxscore ? this.lsService.setMaxScore(maxscore + maxcount) : this.lsService.setMaxScore(maxcount);
  }

  answer(correctness: number, lastQuestion: number, difficulty: string) {
    this.actionsAnswer(lastQuestion, correctness);
    this.sendToLocalStorage(correctness, difficulty);
  }

}
