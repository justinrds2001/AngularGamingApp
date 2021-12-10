import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
})
export class DevelopersComponent implements OnInit, OnDestroy {
  developers: Developer[] = [];
  subscription?: Subscription;

  constructor(
    private developerService: DeveloperService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.subscription = this.developerService
      .getDevelopers()
      .subscribe((developers) => (this.developers = developers));
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.subscription?.unsubscribe();
  }

  onDelete(id: Number) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this developer?')) {
      console.log(id);
      this.developerService.removeDeveloper(id).subscribe(() => {
        this.subscription = this.developerService
          .getDevelopers()
          .subscribe((developers) => {
            this.developers = developers;
            console.log('developers: ' + this.developers);
          });
      });
    }
  }

  canEdit(userId: any) {
    console.log('can edit developers: ' + userId);
    return this.authService.userMayEditSync(userId);
  }
}
