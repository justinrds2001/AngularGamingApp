import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about/about-us/about-us.component';
import { ArticlesComponent } from './pages/article/articles/articles.component';
import { DetailArticleComponent } from './pages/article/detail-article/detail-article.component';
import { EditArticleComponent } from './pages/article/edit-article/edit-article.component';
import { LoggedInAuthGuard } from './pages/auth/auth.guards';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DetailDeveloperComponent } from './pages/developer/detail-developer/detail-developer.component';
import { DevelopersComponent } from './pages/developer/developers/developers.component';
import { EditDeveloperComponent } from './pages/developer/edit-developer/edit-developer.component';
import { DetailGameComponent } from './pages/game/detail-game/detail-game.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';
import { GamesComponent } from './pages/game/games/games.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'game' },
  { path: 'game', pathMatch: 'full', component: GamesComponent },
  {
    path: 'game/add',
    pathMatch: 'full',
    component: EditGameComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'game/edit/:id',
    pathMatch: 'full',
    component: EditGameComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'game/:id',
    pathMatch: 'full',
    component: DetailGameComponent,
  },
  { path: 'developer', pathMatch: 'full', component: DevelopersComponent },
  {
    path: 'developer/add',
    pathMatch: 'full',
    component: EditDeveloperComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'developer/edit/:id',
    pathMatch: 'full',
    component: EditDeveloperComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'developer/:id',
    pathMatch: 'full',
    component: DetailDeveloperComponent,
  },
  { path: 'article', pathMatch: 'full', component: ArticlesComponent },
  {
    path: 'article/add',
    pathMatch: 'full',
    component: EditArticleComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'article/edit/:id',
    pathMatch: 'full',
    component: EditArticleComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'article/:id',
    pathMatch: 'full',
    component: DetailArticleComponent,
  },
  { path: 'about/about-us', pathMatch: 'full', component: AboutUsComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
