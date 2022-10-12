import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

export interface Tag {
  _id: string;
  name: string;
  quoteCount: number;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly _tags = new BehaviorSubject<Tag[] | null>(null);

  readonly tags$ = this._tags.asObservable();

  constructor(private http: HttpClient) {
    this.getTags().subscribe();
  }

  private getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiServer}/tags`).pipe(
      map(tags => tags.map(tag => ({ ...tag, name: tag.name.replace('-', ' ')}))),
      tap(tags => this._tags.next(tags))
    );
  }
}
