import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Developer } from 'src/app/developer/developer.model';
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
  game: Game = {
    id: 0,
    name: '',
    description: '',
    releaseDate: new Date(),
    developer: new Developer(),
    tags: [],
  };
  tags: any;
  inputString: any;
  tagList: String[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.header = this.id === 0 ? 'Add Game' : 'Edit Game';

    if (this.id != 0) {
      this.game = this.gameService.getGameById(this.id);
      this.tags = this.game.tags.join(', ').toString();
      this.tagList = this.game.tags.concat();
    }
  }

  onSubmit(form: NgForm) {
    let tagsFromForm = this.tags.split(', ');
    console.log(tagsFromForm);
    let game: Game = {
      id: Number(form.value.id),
      name: form.value.name,
      description: form.value.description,
      releaseDate: form.value.releaseDate,
      tags: tagsFromForm,
      developer: {
        id: 0,
        name: 'Default developer',
        foundedInLocation: 'Tilburg - The Netherlands',
        foundedAtDate: new Date(2001, 3, 3),
      },
    };
    if (this.id === 0) {
      this.gameService.addGame(game);
    } else {
      this.gameService.updateGame(game);
    }
    this.router.navigateByUrl('');
  }

  changeLabelName() {
    if (this.tags === undefined) {
      this.tags = this.inputString;
      this.tagList[0] = this.inputString;
    } else {
      this.tags += ', ' + this.inputString;
      this.tagList.push(this.inputString);
    }
    this.inputString = '';
  }
}
