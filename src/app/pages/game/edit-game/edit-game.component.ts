import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Developer } from '../../developer/developer.model';
import { DeveloperService } from '../../developer/developer.service';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styles: [],
})
export class EditGameComponent implements OnInit, OnDestroy {
  id: any;
  header: String = '';
  game: Game = new Game();
  developer: String = '';
  inputString: any;
  tagList: String[] = [];
  developers: Developer[] = [];
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private developerService: DeveloperService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.header = !this.id ? 'Add Game' : 'Edit Game';
      this.subscription = this.developerService
        .getDevelopers()
        .subscribe((developers) => {
          this.developers = developers;
          if (this.id) {
            this.gameService.getGameById(this.id).subscribe((game) => {
              this.game = game;
              this.tagList = this.game.tags.concat();
            });
          } else {
            this.game = new Game();
          }
        });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let game: Game = {
      _id: undefined,
      name: form.value.name,
      description: form.value.description,
      releaseDate: form.value.releaseDate,
      tags: this.tagList,
      developer: form.value.developer,
      createdBy: form.value.createdBy,
    };
    this.authService.currentUser$.subscribe((user) => {
      game.createdBy = user!;
      this.developerService
        .getDeveloperById(form.value.developer)
        .subscribe((developer) => {
          game.developer = developer;
          console.log('OnSubmit: ' + form.value.developer);
          console.log('OnSubmit: ' + game.developer.name);
          if (!this.id || form.value.id === '') {
            this.gameService.addGame(game).subscribe((game) => {
              console.log('added game' + game);
              this.router.navigate(['../'], { relativeTo: this.route });
            });
          } else {
            console.log(game);
            this.gameService
              .updateGame(this.id, game)
              .subscribe((updatedGame) => {
                console.log('updated game' + updatedGame);
                this.router.navigate(['../../'], { relativeTo: this.route });
              });
          }
        });
    });
  }

  addTag() {
    this.tagList.push(this.inputString);
    this.inputString = '';
  }

  deleteTag(tag: String) {
    this.tagList = this.tagList.filter((item) => item != tag);
  }
}
