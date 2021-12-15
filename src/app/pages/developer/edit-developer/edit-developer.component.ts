import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Game } from '../../game/game.model';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-edit-developer',
  templateUrl: './edit-developer.component.html',
  styleUrls: ['./edit-developer.component.css'],
})
export class EditDeveloperComponent implements OnInit, OnDestroy {
  id: any;
  header: String = '';
  developer: Developer = new Developer();
  founderInput: any;
  founderList: String[] = [];
  routeSubscription?: Subscription;
  devSubscription?: Subscription;
  editDevSubscription?: Subscription;
  userSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.header = !this.id ? 'Add Developer' : 'Edit Developer';
      if (this.id) {
        this.devSubscription = this.developerService
          .getDeveloperById(this.id)
          .subscribe((developer) => {
            this.developer = developer;
            this.founderList = this.developer.founders.concat();
          });
      } else {
        this.developer = new Developer();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.routeSubscription?.unsubscribe();
    this.devSubscription?.unsubscribe();
    this.editDevSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  onSubmit(form: NgForm) {
    let developer: Developer = {
      _id: form.value.id,
      name: form.value.name,
      headquartersLocation: form.value.headquartersLocation,
      dateOfEstablishment: form.value.dateOfEstablishment,
      founders: this.founderList,
      website: form.value.website,
      createdBy: form.value.createdBy,
    };
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      developer.createdBy = user!;
      if (!this.id || form.value.id === '') {
        console.log(developer);
        console.log('addDeveloper() called');
        this.editDevSubscription = this.developerService
          .addDeveloper(developer)
          .subscribe((developer) => {
            console.log('added developer' + developer);
            this.router.navigate(['../'], { relativeTo: this.route });
          });
      } else {
        console.log(developer);
        console.log('updateDeveloper() called');
        // update developer here
        this.developerService
          .updateDeveloper(this.id, developer)
          .subscribe(() => {
            this.router.navigate(['../../'], { relativeTo: this.route });
          });
      }
    });
  }

  addFounder() {
    this.founderList.push(this.founderInput);
    this.founderInput = '';
  }

  deleteFounder(founder: String) {
    this.founderList = this.founderList.filter((item) => item != founder);
  }
}
