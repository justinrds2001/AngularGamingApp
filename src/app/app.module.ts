import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './pages/a/a.component';
import { BComponent } from './pages/b/b.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './pages/user/list/list.component';
import { DetailComponent } from './pages/user/detail/detail.component';
import { ColumnsComponent } from './pages/user/columns.component';
import { EditComponent } from './pages/user/edit/edit.component';
import { GamesComponent } from './pages/game/games/games.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';

@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent,
    NavComponent,
    FooterComponent,
    ListComponent,
    DetailComponent,
    ColumnsComponent,
    EditComponent,
    GamesComponent,
    AddUserComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
