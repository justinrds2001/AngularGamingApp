import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Directive, HostListener } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { GamesComponent } from './games.component';
import { of, Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { Developer } from '../../developer/developer.model';
import { AuthService } from '../../auth/auth.service';

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
  let authSpy;

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    gameServiceSpy = jasmine.createSpyObj('GameService', [
      'getGames',
      'getGameById',
      'addGame',
      'removeGame',
      'updateGame',
      'getReviews',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    authSpy = jasmine.createSpyObj('AuthService', ['userMayEditSync']);

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
        { provide: AuthService, useValue: authSpy },
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
    gameServiceSpy.getGames.and.returnValue(of(expectedGames));

    component.gamesSubscription = new Subscription();
    component.deleteSubscription = new Subscription();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.games).toEqual(expectedGames);
    done();
  });
});
