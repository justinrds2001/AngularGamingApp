import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from '../auth/user.model';
import { Developer } from '../developer/developer.model';
import { Game } from './game.model';
import { GameService } from './game.service';

const expectedUserData: User = {
  _id: '619bdb5e3b174a700c923de8',
  username: 'Justinrds2001',
  password: 'password',
  token: 'some.dummy.token',
};

const expectedDev: Developer = {
  _id: '61b2446245f6dcea1eb7f05b',
  name: 'Test company',
  headquartersLocation: 'The Netherlands',
  dateOfEstablishment: new Date(),
  founders: ['Justin'],
  website: new URL('https://www.bol.com/'),
  createdBy: expectedUserData,
};

// Global mock objects
const expectedGames: Game[] = [
  {
    _id: '61b2450845f6dcea1eb7f06f',
    name: 'Test Game',
    description: 'daskdjhb alhksdbvsakhdklshavdb lkhsadasdad',
    releaseDate: new Date(),
    developer: expectedDev,
    tags: ['testtag'],
    createdBy: expectedUserData,
  },
  {
    _id: '61b2495845f6dcea1eb7f0a1',
    name: 'Grand Theft Auto 6',
    description:
      'dsaliduhba lihdbaslkhvbskalihvbdkashjsvd likashbdlkahsvdkjhas a dsadasdasdasda',
    releaseDate: new Date(),
    developer: expectedDev,
    tags: ['dasda', 'dasda'],
    createdBy: expectedUserData,
  },
];

describe('GameService', () => {
  let service: GameService;
  let httpSpy: any;
  // let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(GameService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of movies', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedGames));
    service.getGames().subscribe((games: Game[]) => {
      console.log(games);
      expect(games.length).toBe(2);
      expect(games[0]._id).toEqual(expectedGames[0]._id);
      done();
    });
  });

  it('should return a single game with given id', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedGames[0]));
    service.getGameById('61b2446245f6dcea1eb7f05b').subscribe((game) => {
      console.log(game);
      expect(game._id).toEqual(expectedGames[0]._id);
      done();
    });
  });

  it('should add a game', (done: DoneFn) => {
    const gameToAdd: Game = {
      _id: '61b2450845f6dcea1eb7f06f',
      name: 'Test Game',
      description: 'daskdjhb alhksdbvsakhdklshavdb lkhsadasdad',
      releaseDate: new Date(),
      developer: expectedDev,
      tags: ['testtag'],
      createdBy: expectedUserData,
    };
    httpSpy.post.and.returnValue(of(gameToAdd));
    service.addGame(gameToAdd).subscribe((game: Game) => {
      console.log(game);
      expect(game.name).toBe(gameToAdd.name);
      expect(game._id).toEqual(gameToAdd._id);
      done();
    });
  });

  it('should update a game with given id', (done: DoneFn) => {
    const gameToUpdate: Game = {
      _id: '61b2450845f6dcea1eb7f06f',
      name: 'Test Game (updated)',
      description: 'daskdjhb alhksdbvsakhdklshavdb lkhsadasdad',
      releaseDate: new Date(),
      developer: expectedDev,
      tags: ['testtag'],
      createdBy: expectedUserData,
    };
    httpSpy.put.and.returnValue(of(gameToUpdate));
    service.updateGame(gameToUpdate._id, gameToUpdate).subscribe((game) => {
      expect(game._id).toEqual(gameToUpdate._id);
      expect(game.name).toEqual(gameToUpdate.name);
      done();
    });
  });

  it('should delete a game with given id', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(of(expectedGames[0]));
    service.removeGame(expectedGames).subscribe((game) => {
      expect(game._id).toEqual(expectedGames[0]._id);
      expect(game.name).toEqual(expectedGames[0].name);
      done();
    });
  });
});
