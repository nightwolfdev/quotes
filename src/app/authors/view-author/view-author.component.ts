import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Author, AuthorsService } from '../authors.service';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.scss']
})
export class ViewAuthorComponent implements OnInit {
  author$: Observable<Author | undefined>;

  constructor(
    private authorsSvc: AuthorsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.author$ = this.route.paramMap.pipe(
      switchMap(params => this.authorsSvc.getAuthorBySlug(params.get('slug')!))
    );
  }
}
