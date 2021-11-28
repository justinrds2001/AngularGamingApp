import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Developer } from '../developer.model';
import { DeveloperService } from '../developer.service';

@Component({
  selector: 'app-detail-developer',
  templateUrl: './detail-developer.component.html',
  styleUrls: ['./detail-developer.component.css'],
})
export class DetailDeveloperComponent implements OnInit {
  developer: Developer = new Developer();
  id: Number = 0;

  constructor(
    private route: ActivatedRoute,
    private developerService: DeveloperService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.developer = this.developerService.getDeveloperById(this.id);
    });
  }
}
