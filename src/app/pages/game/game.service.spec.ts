import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Game } from './game.model';
import { GameService } from './game.service';

const expectedGames: Game[] = [
  {
    id: 1,
    name: 'Grand Theft Auto 5',
    description:
      'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.',
    tags: ['Open World', 'Action', 'Multiplayer', 'Automobile Sim'],
    releaseDate: new Date(2013, 9, 17),
    developer: {
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
    reviews: [],
  },
];

describe('GameService', () => {
  let service: GameService;
  // let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    /*TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }],
    });*/
    service = TestBed.inject(GameService);
    // httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of movies', (done: DoneFn) => {
    // httpSpy.get.and.returnValue(of(expectedGames));
    service.getGamesAsObservable().subscribe((games: Game[]) => {
      console.log(games);
      expect(games.length).toBe(5);
      expect(games[0].id).toEqual(expectedGames[0].id);
      done();
    });
  });

  it('should return a single game with given id', (done: DoneFn) => {
    // httpSpy.get.and.returnValue(of(expectedGames));
    let game = service.getGameById(1);
    console.log(game);
    expect(game.id).toEqual(expectedGames[0].id);
    done();
  });

  it('should add a game', (done: DoneFn) => {
    // httpSpy.get.and.returnValue(of(expectedGames));
    let game = {
      id: 6,
      name: 'Grand Theft Auto 6',
      description: 'test',
      tags: ['Open World'],
      releaseDate: new Date(),
      developer: {
        id: 10,
        name: 'JRDS Games',
        headquartersLocation: 'The Netherlands',
        dateOfEstablishment: new Date(),
        founders: ['Justin Rodrigues da Silva'],
        website: new URL('https://www.bol.com/'),
      },
      reviews: [],
    };
    console.log(game);
    service.addGame(game);
    service.getGamesAsObservable().subscribe((games: Game[]) => {
      console.log(games);
      expect(games.length).toBe(6);
      expect(games[games.length - 1].id).toEqual(game.id);
      done();
    });
  });

  it('should update a game with given id', (done: DoneFn) => {
    // httpSpy.get.and.returnValue(of(expectedGames));
    let updatedGame = {
      id: 1,
      name: 'Grand Theft Auto 5 (Updated)',
      description:
        'Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.',
      tags: ['Open World', 'Action', 'Multiplayer', 'Automobile Sim'],
      releaseDate: new Date(2013, 9, 17),
      developer: {
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
        website: new URL('https://www.bol.com/'),
      },
      reviews: [],
    };
    console.log(updatedGame);
    service.updateGame(updatedGame);
    let game = service.getGameById(1);
    expect(game.name).toEqual('Grand Theft Auto 5 (Updated)');
    done();
  });

  it('should delete a game with given id', (done: DoneFn) => {
    // httpSpy.get.and.returnValue(of(expectedGames));
    service.removeGame(1);
    service.getGamesAsObservable().subscribe((games: Game[]) => {
      console.log(games);
      expect(games.length).toBe(4);
      done();
    });
  });
});
