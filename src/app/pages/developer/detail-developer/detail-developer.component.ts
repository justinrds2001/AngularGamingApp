import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-detail-developer',
  templateUrl: './detail-developer.component.html',
  styleUrls: ['./detail-developer.component.css'],
})
export class DetailDeveloperComponent implements OnInit, OnDestroy {
  developer: Developer = new Developer();
  id: any;
  devSubscription?: Subscription;
  routeSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.devSubscription = this.developerService
        .getDeveloperById(this.id)
        .subscribe((developer) => {
          this.developer = developer;
        });
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called');
    this.devSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
