import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './pages/a/a.component';
import { BComponent } from './pages/b/b.component';
import { ColumnsComponent } from './pages/user/columns.component';
import { DetailComponent } from './pages/user/detail/detail.component';
import { EditComponent } from './pages/user/edit/edit.component';
import { GamesComponent } from './pages/game/games/games.component';
import { ListComponent } from './pages/user/list/list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'component-a' },
  { path: 'component-a', component: AComponent },
  { path: 'component-b', pathMatch: 'full', component: BComponent },
  { path: 'users', pathMatch: 'full', component: ListComponent },
  // users/new moet voor users/:id, omdat new anders als de id wordt gezien.
  // Volgorde is belangrijk in routing.
  { path: 'users/new', pathMatch: 'full', component: EditComponent },
  { path: 'users/:id', pathMatch: 'full', component: DetailComponent },
  { path: 'users/:id/edit', pathMatch: 'full', component: EditComponent },
  {
    path: 'columns',
    component: ColumnsComponent,
    children: [
      { path: 'new', pathMatch: 'full', component: EditComponent },
      { path: ':id', pathMatch: 'full', component: DetailComponent },
      { path: ':id/edit', pathMatch: 'full', component: EditComponent },
    ],
  },
  { path: 'games', pathMatch: 'full', component: GamesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
