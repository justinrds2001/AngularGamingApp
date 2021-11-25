import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about/about-us/about-us.component';
import { DevelopersComponent } from './pages/developer/developers/developers.component';
import { EditDeveloperComponent } from './pages/developer/edit-developer/edit-developer.component';
import { DetailGameComponent } from './pages/game/detail-game/detail-game.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';
import { GamesComponent } from './pages/game/games/games.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game' },
  { path: 'game', pathMatch: 'full', component: GamesComponent },
  { path: 'game/add', pathMatch: 'full', component: EditGameComponent },
  { path: 'game/edit/:id', pathMatch: 'full', component: EditGameComponent },
  {
    path: 'game/detail/:id',
    pathMatch: 'full',
    component: DetailGameComponent,
  },
  {path: 'developer', pathMatch: 'full', component: DevelopersComponent},
  {path: 'developer/add', pathMatch: 'full', component: EditDeveloperComponent},
  {path: 'developer/edit/:id', pathMatch: 'full', component: EditDeveloperComponent},
  { path: 'about/about-us', pathMatch: 'full', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
