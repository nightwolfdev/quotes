import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { ViewAuthorComponent } from './view-author/view-author.component';


@NgModule({
  declarations: [
    AuthorsComponent,
    ViewAuthorComponent
  ],
  imports: [
    ClarityModule,
    CommonModule,
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
