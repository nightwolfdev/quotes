import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Author, AuthorsService } from '../authors/authors.service';
import { QuoteList, QuotesService } from '../shared/services/quotes.service';
import { Tag, TagsService } from '../shared/services/tags.service';

interface QuotesForm {
  author?: FormControl<string | null>;
  tag?: FormControl<string | null>;
}

interface RouteState {
  author?: string;
  navigationId: number;
  tag?: string;
}

interface SearchCriteria {
  author?: string;
  page: number;
  tag?: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  authors$: Observable<Author[] | null>;
  form: FormGroup<QuotesForm>;
  quoteList$: Observable<QuoteList>;
  searchBtnState: ClrLoadingState;
  tags$: Observable<Tag[] | null>;

  constructor(
    private authorsSvc: AuthorsService,
    private location: Location,
    private quotesSvc: QuotesService,
    private tagsSvc: TagsService
  ) { }

  ngOnInit(): void {
    const state = this.location.getState() as RouteState;

    this.authors$ = this.authorsSvc.authors$;

    this.form = new FormGroup<QuotesForm>({
      author: new FormControl(''),
      tag: new FormControl('')
    });

    if (state.author || state.tag) {
      this.updateFormFields(state.author, state.tag);

      this.onSearch({
        author: state.author,
        page: 1,
        tag: state.tag
      });
    }

    this.tags$ = this.tagsSvc.tags$;
  }

  private getQuotes(author: string, tag: string, page: number): Observable<QuoteList> {
    return this.quotesSvc.getQuotes(author, tag, page);
  }

  private updateFormFields(author?: string, tag?: string) {
    this.form.patchValue({
      author: author || '',
      tag: tag || ''
    });
  }

  onSearch(searchCriteria: SearchCriteria): void {
    const formData = this.form.value;

    if (searchCriteria.author || searchCriteria.tag) {
      this.updateFormFields(searchCriteria.author, searchCriteria.tag);
    }

    this.searchBtnState = ClrLoadingState.LOADING;

    this.quoteList$ = this.getQuotes(searchCriteria.author! || formData.author!, searchCriteria.tag! || formData.tag!, searchCriteria.page).pipe(
      finalize(() => this.searchBtnState = ClrLoadingState.DEFAULT)
    );
  }
}
