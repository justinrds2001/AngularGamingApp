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
      headquartersLocation: 'New York - USA',
      dateOfEstablishment: new Date(1998, 12, 1),
      founders: [
        'Dan Houser',
        'Sam Houser',
        'Terry Donovan',
        'Gary Foreman',
        'Jamie King',
      ],
      website: new URL('https://www.rockstargames.com/'),
    },
    {
      id: 2,
      name: 'CD PROJEKT RED',
      headquartersLocation: 'Poland',
      dateOfEstablishment: new Date(2002, 2, 1),
      founders: ['Michał Kiciński', 'Marcin Iwiński'],
      website: new URL('https://www.cdprojekt.com/'),
    },
    {
      id: 3,
      name: 'Treyarch',
      headquartersLocation: 'California - USA',
      dateOfEstablishment: new Date(1998, 12, 1),
      founders: ['Doğan Köslü', 'Peter Akemann'],
      website: new URL('https://www.treyarch.com/'),
    },
    {
      id: 4,
      name: 'DICE',
      headquartersLocation: 'Växjö - Zweden',
      dateOfEstablishment: new Date(1992, 5, 1),
      founders: ['Fredrik Liliegren', 'Olof Gustafsson', 'Andreas Axelsson'],
      website: new URL('https://www.dice.se/'),
    },
    {
      id: 5,
      name: 'Playground Games',
      headquartersLocation: 'United Kingdom',
      dateOfEstablishment: new Date(2010, 1, 1),
      founders: [],
      website: new URL('https://www.playground-games.com/'),
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
    oldDev.headquartersLocation = developer.headquartersLocation;
    oldDev.dateOfEstablishment = developer.dateOfEstablishment;
    oldDev.website = developer.website;
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
