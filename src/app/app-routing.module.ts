import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  {
    path: 'todo/:id',
    component: IndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
