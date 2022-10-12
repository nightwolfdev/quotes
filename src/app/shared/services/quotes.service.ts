import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Author, AuthorsService } from '../../authors/authors.service';

import { environment } from 'src/environments/environment';

export interface QuoteList {
  count: number;
  lastItemIndex: number;
  page: number;
  totalCount: number;
  totalPages: number;
  results: QuoteListItem[];
}

export interface RandomQuote extends RandomQuoteResponse {
  author: Author | undefined;
}

interface QuoteListItem {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  length: number;
  page: number;
  tags: string[];
}

interface RandomQuoteResponse {
  _id: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  constructor(
    private authorsSvc: AuthorsService,
    private http: HttpClient
  ) { }

  getQuotes(author?: string, tag?: string, page: number = 1): Observable<QuoteList> {
    const urlArgs = `${ author ? '&author=' + author : '' }${ tag ? '&tags=' + tag : '' }`;

    return this.http.get<QuoteList>(`${environment.apiServer}/quotes?limit=50&page=${page + urlArgs}`);
  }

  getRandomQuote(): Observable<RandomQuote> {
    return this.http.get<RandomQuoteResponse>(`${environment.apiServer}/random`).pipe(
      mergeMap(quote => this.authorsSvc.getAuthorBySlug(quote.authorSlug).pipe(map(author => ({ ...quote, author }))))
    );
  }
}
