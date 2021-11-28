import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Directive, HostListener } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { GamesComponent } from './games.component';
import { of, Subscription } from 'rxjs';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

// Global mock objects
let expectedGames: Game[] = [
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
  {
    id: 2,
    name: 'The Witcher® 3',
    description:
      'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.',
    tags: ['Open World', 'RPG', 'Story Rich', 'Atmospheric'],
    releaseDate: new Date(2015, 5, 18),
    developer: {
      id: 2,
      name: 'CD PROJEKT RED',
      headquartersLocation: 'Poland',
      dateOfEstablishment: new Date(2002, 2, 1),
      founders: ['Michał Kiciński', 'Marcin Iwiński'],
      website: new URL('https://www.cdprojekt.com/'),
    },
    reviews: [],
  },
  {
    id: 3,
    name: 'Call of Duty®: Black Ops',
    description:
      'Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War',
    tags: ['Action', 'Multiplayer', 'FPS', 'Shooter', 'First-Person'],
    releaseDate: new Date(2012, 11, 12),
    developer: {
      id: 3,
      name: 'Treyarch',
      headquartersLocation: 'California - USA',
      dateOfEstablishment: new Date(1998, 12, 1),
      founders: ['Doğan Köslü', 'Peter Akemann'],
      website: new URL('https://www.treyarch.com/'),
    },
    reviews: [],
  },
  {
    id: 4,
    name: 'Battlefield™ 2042',
    description:
      'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. Begin Your Horizon Adventure today and add to your Wishlist!',
    tags: ['Action', 'Multiplayer', 'FPS', 'Shooter', 'Military'],
    releaseDate: new Date(2021, 11, 12),
    developer: {
      id: 4,
      name: 'DICE',
      headquartersLocation: 'Växjö - Zweden',
      dateOfEstablishment: new Date(1992, 5, 1),
      founders: ['Fredrik Liliegren', 'Olof Gustafsson', 'Andreas Axelsson'],
      website: new URL('https://www.dice.se/'),
    },
    reviews: [],
  },
  {
    id: 5,
    name: 'Forza Horizon 5',
    description:
      'Pushing the boundaries of what fans have come to expect from the record-setting entertainment franchise, Call of Duty®: Black Ops II propels players into a near future Cold War',
    tags: ['Racing', 'Open World', 'Adventure', 'Driving', 'Sports'],
    releaseDate: new Date(2021, 11, 9),
    developer: {
      id: 5,
      name: 'Playground Games',
      headquartersLocation: 'United Kingdom',
      dateOfEstablishment: new Date(2010, 1, 1),
      founders: [],
      website: new URL('https://www.playground-games.com/'),
    },
    reviews: [],
  },
];
/**
 *
 */
describe('GamesComponent', () => {
  // De 'echte' component-under-test - deze mocken we dus niet!
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  // Mock services die de constructor nodig heeft
  let gameServiceSpy: any;
  let routerSpy;

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      'getGames',
      'getGamesAsObservable',
      'getGameById',
      'addGame',
      'removeGame',
      'updateGame',
      'getReviews',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      // The declared components needed to test the UsersComponent.
      declarations: [
        GamesComponent, // The 'real' component that we will test
        RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
      ],
      imports: [FormsModule],
      //
      // The constructor of our real component uses dependency injected services
      // Never provide the real service in testcases!
      //
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: '619bdb5e3b174a700c923da3',
              })
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
  });

  /**
   *
   */
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', (done) => {
    gameServiceSpy.getGamesAsObservable.and.returnValue(of(expectedGames));

    component.subscription = new Subscription();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.games).toEqual(expectedGames);
    done();
  });
});
