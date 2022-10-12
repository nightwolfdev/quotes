import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    ClarityModule,
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
