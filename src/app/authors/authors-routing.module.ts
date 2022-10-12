import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './authors.component';
import { ViewAuthorComponent } from './view-author/view-author.component';

const routes: Routes = [
  {
    path: ':slug/view',
    component: ViewAuthorComponent,
    title: 'View Author'
  },
  {
    path: '',
    component: AuthorsComponent,
    title: 'Authors'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
