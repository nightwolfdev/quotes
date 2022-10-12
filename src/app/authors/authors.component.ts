import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Author, AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$: Observable<Author[] | null>;

  constructor(private authorsSvc: AuthorsService) { }

  ngOnInit(): void {
    this.authors$ = this.authorsSvc.authors$;
  }

}
