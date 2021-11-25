import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about/about-us/about-us.component';
import { DetailGameComponent } from './pages/game/detail-game/detail-game.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';
import { GamesComponent } from './pages/game/games/games.component';
import { EditReviewComponent } from './pages/review/edit-review/edit-review.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game' },
  { path: 'game', pathMatch: 'full', component: GamesComponent },
  { path: 'game/add', pathMatch: 'full', component: EditGameComponent },
  { path: 'game/edit/:id', pathMatch: 'full', component: EditGameComponent },
  {
    path: 'game/:id',
    pathMatch: 'full',
    component: DetailGameComponent,
  },
  {
    path: 'game/:id/review',
    pathMatch: 'full',
    component: EditReviewComponent,
  },
  {
    path: 'game/:id/review/:reviewid',
    pathMatch: 'full',
    component: EditReviewComponent,
  },
  { path: 'about/about-us', pathMatch: 'full', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
