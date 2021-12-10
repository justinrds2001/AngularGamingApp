import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Developer } from 'src/app/pages/developer/developer.model';
import { DeveloperService } from '../../developer/developer.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-detail-game',
  templateUrl: './detail-game.component.html',
  styles: [],
})
export class DetailGameComponent implements OnInit, OnDestroy {
  game: Game = new Game();
  id: any;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.gameService.getGameById(this.id).subscribe((game) => {
        this.game = game;
        console.log('component game: ' + this.game);
      });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }
}
