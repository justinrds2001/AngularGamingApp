import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailGameComponent } from './pages/game/detail-game/detail-game.component';
import { EditGameComponent } from './pages/game/edit-game/edit-game.component';
import { GamesComponent } from './pages/game/games/games.component';
import { AboutUsComponent } from './pages/about/about-us/about-us.component';
import { DevelopersComponent } from './pages/developer/developers/developers.component';
import { EditDeveloperComponent } from './pages/developer/edit-developer/edit-developer.component';
import { DetailDeveloperComponent } from './pages/developer/detail-developer/detail-developer.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticlesComponent } from './pages/article/articles/articles.component';
import { EditArticleComponent } from './pages/article/edit-article/edit-article.component';
import { DetailArticleComponent } from './pages/article/detail-article/detail-article.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LoggedInAuthGuard } from './pages/auth/auth.guards';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    GamesComponent,
    EditGameComponent,
    DetailGameComponent,
    AboutUsComponent,
    DevelopersComponent,
    EditDeveloperComponent,
    DetailDeveloperComponent,
    ArticlesComponent,
    EditArticleComponent,
    DetailArticleComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [LoggedInAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
