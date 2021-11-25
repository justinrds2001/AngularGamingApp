import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer } from 'src/app/pages/developer/developer.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styles: [],
})
export class EditGameComponent implements OnInit {
  id: Number = 0;
  header: String = '';
  game: Game = new Game();
  developer: String = '';
  inputString: any;
  tagList: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.header = !this.id ? 'Add Game' : 'Edit Game';

      if (this.id) {
        this.game = this.gameService.getGameById(this.id);
        this.tagList = this.game.tags.concat();
        this.developer = this.game.developer.name;
      } else {
        this.game = new Game();
      }
    });
  }

  onSubmit(form: NgForm) {
    let game: Game = {
      id: form.value.id,
      name: form.value.name,
      description: form.value.description,
      releaseDate: form.value.releaseDate,
      tags: this.tagList,
      developer: {
        id: 0,
        name: form.value.developer,
        foundedInLocation: 'Tilburg - The Netherlands',
        foundedAtDate: new Date(2001, 3, 3),
      },
      reviews: [],
    };
    if (!this.id || form.value.id === '') {
      let lastGame = this.gameService.games[this.gameService.games.length - 1];
      if (lastGame) {
        game.id = +lastGame.id! + 1;
      } else {
        game.id = 1;
      }
      console.log(game);
      console.log('addGame() called');
      this.gameService.addGame(game);
    } else {
      game.id = this.id;
      console.log(game);
      console.log('updateGame() called');
      this.gameService.updateGame(game);
    }
    this.router.navigateByUrl('');
  }

  addTag() {
    this.tagList.push(this.inputString);
    this.inputString = '';
  }

  deleteTag(tag: String) {
    this.tagList = this.tagList.filter((item) => item != tag);
  }
}
