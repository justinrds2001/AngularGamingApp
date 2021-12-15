import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  gamesSubscription?: Subscription;
  deleteSubscription?: Subscription;

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.gamesSubscription = this.gameService.getGames().subscribe((games) => {
      this.games = games;
      console.log('component games: ' + this.games);
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.gamesSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

  onDelete(id: any) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this game?')) {
      console.log(id);
      this.deleteSubscription = this.gameService
        .removeGame(id)
        .subscribe(() => {
          console.log('Game was deleted');
          this.gamesSubscription = this.gameService
            .getGames()
            .subscribe((games) => {
              this.games = games;
              console.log('games: ' + this.games);
            });
        });
    }
  }

  canEdit(userId: any) {
    return this.authService.userMayEditSync(userId);
  }
}
