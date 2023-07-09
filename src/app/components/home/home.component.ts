import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  quizzes$ = this.apiService.quizzes$;
  downloading = false;
  subscription = new Subscription;
  categories = this.apiService.selectedCategories;
  ngOnInit() {
    this.subscription.add(this.quizzes$.subscribe(quizzes =>
       quizzes.length < 10 ? this.downloading = false : this.downloading = true
    ))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  play(categoryId?: number): void {
    const random = this.randomNumber(0, this.categories.length);
    categoryId ? this.router.navigate(['play', categoryId, '1']) :
      this.router.navigate(['play', this.categories[random].id, '1'])

  }
}
