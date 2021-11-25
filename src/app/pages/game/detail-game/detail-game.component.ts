import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Developer } from '../../developer/developer.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styles: [],
})
export class DetailGameComponent implements OnInit {
  game: Game = {
    id: 0,
    name: '',
    description: '',
    releaseDate: new Date(),
    developer: new Developer(),
    tags: [],
  };
  id: Number = 0;
  releaseDateFormatted: String = '';

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.game = this.gameService.getGameById(this.id);
      this.releaseDateFormatted = new Date(
        this.game.releaseDate
      ).toLocaleDateString();
    });
  }
}
