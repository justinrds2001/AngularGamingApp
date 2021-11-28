import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Developer } from 'src/app/pages/developer/developer.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styles: [],
})
export class DetailGameComponent implements OnInit {
  game: Game = new Game();
  id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.game = this.gameService.getGameById(this.id);
    });
  }
}
