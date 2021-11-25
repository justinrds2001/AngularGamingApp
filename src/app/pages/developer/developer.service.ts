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
              'Jamie King'
            ]
        },
        {
            id: 2,
            name: 'CD PROJEKT RED',
            foundedInLocation: 'Poland',
            foundedAtDate: new Date(2002, 2, 1),
            founders: [
              'Michał Kiciński',
              'Marcin Iwiński'
            ]
        },
        {
            id: 3,
            name: 'Treyarch',
            foundedInLocation: 'California - USA',
            foundedAtDate: new Date(1998, 12, 1),
            founders: [
              'Doğan Köslü',
              'Peter Akemann'
            ]
        },
        {
            id: 4,
            name: 'DICE',
            foundedInLocation: 'Växjö - Zweden',
            foundedAtDate: new Date(1992, 5, 1),
            founders: [
              'Fredrik Liliegren',
              'Olof Gustafsson',
              'Andreas Axelsson'
            ]
        },
        {
            id: 5,
            name: 'Playground Games',
            foundedInLocation: 'United Kingdom',
            foundedAtDate: new Date(2010, 1, 1),
            founders: []
        }
    ]

    getDevelopers(): Observable<Developer[]> {
        console.log('getGamesAsObservable called');
        return of(this.developers);
    }

    getDeveloperById(id: Number):Developer {
        return this.developers.filter((developer) => developer.id === id)[0];
    }

    addDeveloper(developer: Developer) {
        this.developers.push(developer)
    }
}
