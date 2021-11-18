import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  subscription?: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.subscription = this.gameService
      .getGamesAsObservable()
      .subscribe((games) => (this.games = games));
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }

  onDelete(id: Number) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this game?')) {
      console.log(id);
      this.gameService.removeGame(id);
      this.subscription = this.gameService
        .getGamesAsObservable()
        .subscribe((games) => (this.games = games));
    }
  }
}
