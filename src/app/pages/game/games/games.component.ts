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
  subscription?: Subscription;

  constructor(
    private gameService: GameService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.subscription = this.gameService.getGames().subscribe((games) => {
      this.games = games;
      console.log('component games: ' + this.games);
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }

  onDelete(id: any) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this game?')) {
      console.log(id);
      this.gameService.removeGame(id).subscribe(() => {
        console.log('Game was deleted');
        this.subscription = this.gameService.getGames().subscribe((games) => {
          this.games = games;
          console.log('games: ' + this.games);
        });
      });
    }
  }

  canEdit(userId: any) {
    console.log('can edit games: ' + userId);
    return this.authService.userMayEditSync(userId);
  }
}
