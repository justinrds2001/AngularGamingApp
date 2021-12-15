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
  routeSubscription?: Subscription;
  gameSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.gameSubscription = this.gameService
        .getGameById(this.id)
        .subscribe((game) => {
          this.game = game;
          console.log('component game: ' + this.game);
        });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.routeSubscription?.unsubscribe();
    this.gameSubscription?.unsubscribe();
  }
}
