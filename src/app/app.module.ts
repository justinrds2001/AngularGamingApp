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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    GamesComponent,
    EditGameComponent,
    DetailGameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
