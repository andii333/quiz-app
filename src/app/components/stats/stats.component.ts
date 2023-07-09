import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsComponent {
  constructor(private lsService:LocalStorageService){}
  amounQuizzes = this.lsService.getStats().amountQuizzes
  amounQuestions = this.lsService.getStats().amounQuestions
  sumTime = this.lsService.getStats().sumTime / this.amounQuizzes
  correct = this.lsService.getStats().correctQuestions
  incorrect = this.lsService.getStats().incorrectQuestions
  correctPercent = (this.correct / (this.correct + this.incorrect) * 100).toFixed(0)
  incorrectPercent = 100 - +this.correctPercent
  pie = `conic-gradient(#7bdf01 0, #7bdf01 ${this.correctPercent}%, #ff0000 0, #ff0000 ${this.incorrectPercent}% 100%)`
}
