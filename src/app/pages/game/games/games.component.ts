import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.games = this.gameService.getGames();
  }

  onDelete(id: Number) {
    if (confirm('Are you sure you want to delete this game?')) {
      console.log(id);
      this.gameService.removeGame(id);
      this.games = this.gameService.getGames();
    }
  }
}
