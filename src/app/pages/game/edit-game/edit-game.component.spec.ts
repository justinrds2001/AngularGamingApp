import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, Directive, HostListener } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { User } from '../../auth/user.model';
import { EditGameComponent } from './edit-game.component';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../game.service';
import { DeveloperService } from '../../developer/developer.service';
import { Game } from '../game.model';
import { Developer } from '../../developer/developer.model';

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
const expectedUserData: User = {
  _id: '619bdb5e3b174a700c923de8',
  username: 'Justinrds2001',
  password: 'password',
  token: 'some.dummy.token',
};

const expectedDevs: Developer[] = [
  {
    _id: '61b2446245f6dcea1eb7f05b',
    name: 'Test company',
    headquartersLocation: 'The Netherlands',
    dateOfEstablishment: new Date(),
    founders: ['Justin'],
    website: new URL('https://www.bol.com/'),
    createdBy: expectedUserData,
  },
];

const expectedGame: Game = {
  _id: '61b2450845f6dcea1eb7f06f',
  name: 'Test Game',
  description: 'daskdjhb alhksdbvsakhdklshavdb lkhsadasdad',
  releaseDate: new Date(),
  developer: expectedDevs[0],
  tags: ['Aids'],
  createdBy: expectedUserData,
};

/**
 *
 */
describe('EditGameComponent', () => {
  // De 'echte' component-under-test - deze mocken we dus niet!
  let component: EditGameComponent;
  let fixture: ComponentFixture<EditGameComponent>;

  // Mock services die de constructor nodig heeft
  let gameServiceSpy: any;
  let authServiceSpy;
  let devServiceSpy: any;
  let routerSpy;

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'getUserFromLocalStorage',
      'saveUserToLocalStorage',
      'userMayEdit',
    ]);
    const mockUser$ = new BehaviorSubject<User>(expectedUserData);
    authServiceSpy.currentUser$ = mockUser$;

    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameById']);
    devServiceSpy = jasmine.createSpyObj('DeveloperService', ['getDevelopers']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      // The declared components needed to test the UsersComponent.
      declarations: [
        EditGameComponent, // The 'real' component that we will test
        // RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
      ],
      imports: [FormsModule],
      //
      // The constructor of our real component uses dependency injected services
      // Never provide the real service in testcases!
      //
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy },
        { provide: DeveloperService, useValue: devServiceSpy },
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

    fixture = TestBed.createComponent(EditGameComponent);
    component = fixture.componentInstance;
  });

  /**
   *
   */
  afterEach(() => {
    fixture.destroy();
  });

  /**
   *
   */
  it('should create', (done) => {
    devServiceSpy.getDevelopers.and.returnValue(of(expectedDevs));

    // Deze zijn nodig zodat we in ngOnDestroy kunnen unsubsciben.
    component.subscription = new Subscription();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.developers).toEqual(expectedDevs);
    done();
  });
});
