import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { expand, map, reduce, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface Author {
  _id: string;
  bio: string;
  dateAdded: string;
  dateModified: string;
  description: string;
  link: string;
  name: string;
  slug: string;
  quoteCount: number;
}

interface AuthorListResponse {
  count: number;
  lastItemIndex: number;
  page: number;
  results: Author[];
  totalCount: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private readonly _authors = new BehaviorSubject<Author[] | null>(null);

  readonly authors$ = this._authors.asObservable();

  constructor(private http: HttpClient) {
    this.getAuthors().subscribe();
  }

  private getAuthors(): Observable<Author[]> {
    let page = 1;

    return this.http.get<AuthorListResponse>(this.getAuthorsUrl(page)).pipe(
      expand(response => {
        if (response.page < response.totalPages) {
          page++;
          return this.http.get<AuthorListResponse>(this.getAuthorsUrl(page));
        }

        return EMPTY;
      }),
      reduce((acc: Author[], current) => acc.concat(current.results), []),
      map(authors => authors.filter(author => author.quoteCount > 0)),
      tap(authors => this._authors.next(authors))
    );
  }

  private getAuthorsUrl(page: number): string {
    return `${environment.apiServer}/authors?limit=150&page=${page}`;
  }

  getAuthorBySlug(slug: string): Observable<Author | undefined> {
    return this.authors$.pipe(map(authors => authors?.find(author => author.slug === slug)));
  }
}
