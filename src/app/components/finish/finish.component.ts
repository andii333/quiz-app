import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FinishComponent implements OnInit, OnDestroy {
  time = this.lsService.getTime();
  score = this.lsService.getScore();
  maxscore = this.lsService.getMaxScore();
  pointPercent!:number;
  correct = this.lsService.getStatisticQuestions().correct;
  incorrect = this.lsService.getStatisticQuestions().incorrect;
  amount = this.lsService.getStatisticQuestions().amount;
  questionPercent!:number;
  constructor(
    private lsService: LocalStorageService,
  ) { }

  ngOnInit() {
      const rightPercent = this.score / this.maxscore *100;
      this.pointPercent = +rightPercent.toFixed(0)
    const questionPercent = this.correct / this.amount *100;
    this.questionPercent = +questionPercent.toFixed(0)
  }

  ngOnDestroy() {
    this.lsService.removeTimeScore();
    this.lsService.removeStatisticQuestions();
  }

}
