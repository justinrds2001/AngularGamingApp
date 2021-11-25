import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../game/game.model';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.css']
})
export class EditDeveloperComponent implements OnInit {
  id: Number = 0
  header: String = ''
  developer: Developer = {
    id: 0,
    name: '',
    foundedInLocation: '',
    foundedAtDate: new Date(),
    founders: []
  }
  founderInput: any;
  founderList: String[] = []

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.header = !this.id ? 'Add Developer' : 'Edit Developer';

      if (this.id) {
        this.developer = this.developerService.getDeveloperById(this.id);
        this.founderList = this.developer.founders.concat();
      } else {
        this.developer = new Developer();
      }
    });
  }

  onSubmit(form: NgForm) {
    let developer: Developer = {
      id: form.value.id,
      name: form.value.name,
      foundedInLocation: form.value.foundedInLocation,
      foundedAtDate: form.value.foundedAtDate,
      founders: this.founderList
    }
    if (!this.id || form.value.id === '') {
      let lastDeveloper = this.developerService.developers[this.developerService
        .developers.length - 1]
        if (lastDeveloper) {
          developer.id = +lastDeveloper.id! + 1
        } else {
          developer.id
        }
        console.log(developer);
        console.log('addDeveloper() called');
        this.developerService.addDeveloper(developer)
    } else {
      developer.id = this.id
      console.log(developer)
      console.log('updateDeveloper() called')
      // update developer here
    }
    this.router.navigateByUrl('')
  }
}
