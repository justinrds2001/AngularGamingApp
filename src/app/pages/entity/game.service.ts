import { Injectable } from '@angular/core';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly games: Game[] = [
    {
      id: 0,
      name: 'Grand Theft Auto 5',
      description:
        'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.',
      tags: ['Open World', 'Action', 'Multiplayer', 'Automobile Sim'],
      releaseDate: new Date(2013, 9, 17),
      developer: {
        id: 0,
        name: 'Rockstar Games',
        foundedInLocation: 'New York - USA',
        foundedAtDate: new Date(1998, 12, 1),
      },
    },
    {
      id: 1,
      name: 'The Witcher® 3: Wild Hunt',
      description:
        'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.',
      tags: ['Open World', 'RPG', 'Story Rich', 'Atmospheric'],
      releaseDate: new Date(2015, 5, 18),
      developer: {
        id: 1,
        name: 'CD PROJEKT RED',
        foundedInLocation: 'Poland',
        foundedAtDate: new Date(2002, 2, 1),
      },
    },
    {
      id: 2,
      name: 'Call of Duty®: Black Ops II',
      description:
        'Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War',
      tags: ['Action', 'Multiplayer', 'FPS', 'Shooter', 'First-Person'],
      releaseDate: new Date(2012, 11, 12),
      developer: {
        id: 2,
        name: 'Treyarch',
        foundedInLocation: 'California - USA',
        foundedAtDate: new Date(1998, 12, 1),
      },
    },
    {
      id: 3,
      name: 'Battlefield™ 2042',
      description:
        'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. Begin Your Horizon Adventure today and add to your Wishlist!',
      tags: ['Action', 'Multiplayer', 'FPS', 'Shooter', 'Military'],
      releaseDate: new Date(2021, 11, 12),
      developer: {
        id: 3,
        name: 'DICE',
        foundedInLocation: 'Växjö - Zweden',
        foundedAtDate: new Date(1992, 5, 1),
      },
    },
    {
      id: 4,
      name: 'Forza Horizon 5',
      description:
        'Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War',
      tags: ['Racing', 'Open World', 'Adventure', 'Driving', 'Sports'],
      releaseDate: new Date(2021, 11, 9),
      developer: {
        id: 4,
        name: 'Playground Games',
        foundedInLocation: 'United Kingdom',
        foundedAtDate: new Date(2010, 1, 1),
      },
    },
  ];

  constructor() {}

  getGames(): Game[] {
    console.log('getGames called');
    return this.games;
  }

  getGameById(id: number): Game {
    return this.games.filter((game) => game.id === id)[0];
  }
}