import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Developer } from './developer.model';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  developers: Developer[] = [
    {
      id: 1,
      name: 'Rockstar Games',
      foundedInLocation: 'New York - USA',
      foundedAtDate: new Date(1998, 12, 1),
      founders: [
        'Dan Houser',
        'Sam Houser',
        'Terry Donovan',
        'Gary Foreman',
        'Jamie King',
      ],
    },
    {
      id: 2,
      name: 'CD PROJEKT RED',
      foundedInLocation: 'Poland',
      foundedAtDate: new Date(2002, 2, 1),
      founders: ['Michał Kiciński', 'Marcin Iwiński'],
    },
    {
      id: 3,
      name: 'Treyarch',
      foundedInLocation: 'California - USA',
      foundedAtDate: new Date(1998, 12, 1),
      founders: ['Doğan Köslü', 'Peter Akemann'],
    },
    {
      id: 4,
      name: 'DICE',
      foundedInLocation: 'Växjö - Zweden',
      foundedAtDate: new Date(1992, 5, 1),
      founders: ['Fredrik Liliegren', 'Olof Gustafsson', 'Andreas Axelsson'],
    },
    {
      id: 5,
      name: 'Playground Games',
      foundedInLocation: 'United Kingdom',
      foundedAtDate: new Date(2010, 1, 1),
      founders: [],
    },
  ];

  getDevelopers(): Observable<Developer[]> {
    console.log('getDevelopers called');
    return of(this.developers);
  }

  getDevelopersNormally(): Developer[] {
    console.log('getDevelopersNormally called');
    return this.developers;
  }

  getDeveloperById(id: Number): Developer {
    console.log('getDeveloperById: ' + this.getDevelopers());
    return this.developers.find((developer) => developer.id == id)!;
  }

  addDeveloper(developer: Developer) {
    this.developers.push(developer);
  }

  updateDeveloper(developer: Developer) {
    let oldDev = this.developers.find((x) => x.id == developer.id)!;
    oldDev.name = developer.name;
    oldDev.foundedInLocation = developer.foundedInLocation;
    oldDev.foundedAtDate = developer.foundedAtDate;
    oldDev.founders = developer.founders;
  }

  removeDeveloper(id: Number) {
    console.log('id: ' + id);
    let developer = this.developers.find((x) => x.id == id)!;
    let index = this.developers.indexOf(developer, 0);
    console.log('index: ' + index);
    console.log(this.developers);
    this.developers = this.developers.filter((item) => item != developer);
    console.log(this.developers);
  }
}
