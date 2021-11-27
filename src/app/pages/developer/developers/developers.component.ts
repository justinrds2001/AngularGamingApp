import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
})
export class DevelopersComponent implements OnInit {
  developers: Developer[] = [];
  subscription?: Subscription;

  constructor(private developerService: DeveloperService) {}

  ngOnInit(): void {
    console.log('ngOnInit() called');
    this.subscription = this.developerService
      .getDevelopers()
      .subscribe((developers) => (this.developers = developers));
  }

  onDelete(id: Number) {
    console.log('onDelete() called');
    if (confirm('Are you sure you want to delete this developer?')) {
      console.log(id);
      this.developerService.removeDeveloper(id);
      this.subscription = this.developerService
        .getDevelopers()
        .subscribe((developers) => (this.developers = developers));
    }
  }
}
