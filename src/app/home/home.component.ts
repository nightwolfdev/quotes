import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RandomQuote, QuotesService } from '../shared/services/quotes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  randomQuote$: Observable<RandomQuote>;

  constructor(private quotesSvc: QuotesService) { }

  ngOnInit(): void {
    this.getRandomQuote();
  }

  private getRandomQuote(): void {
    this.randomQuote$ = this.quotesSvc.getRandomQuote();
  }

  newQuote(): void {
    this.getRandomQuote();
  }

}
