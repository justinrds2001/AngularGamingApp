import { Directive, Input, HostListener } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { User } from '../../auth/user.model';
import { Developer } from '../../developer/developer.model';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { DetailGameComponent } from './detail-game.component';

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
  let component: DetailGameComponent;
  let fixture: ComponentFixture<DetailGameComponent>;

  // Mock services die de constructor nodig heeft
  let gameServiceSpy: any;

  /**
   *
   */
  beforeEach(() => {
    // Initialiseer de services als Jasmine Spy objecten
    gameServiceSpy = jasmine.createSpyObj('GameService', ['getGameById']);

    TestBed.configureTestingModule({
      // The declared components needed to test the UsersComponent.
      declarations: [
        DetailGameComponent, // The 'real' component that we will test
        // RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
      ],
      imports: [FormsModule],
      //
      // The constructor of our real component uses dependency injected services
      // Never provide the real service in testcases!
      //
      providers: [
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

    fixture = TestBed.createComponent(DetailGameComponent);
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
    gameServiceSpy.getGameById.and.returnValue(of(expectedGame));

    // Deze zijn nodig zodat we in ngOnDestroy kunnen unsubsciben.
    component.routeSubscription = new Subscription();
    component.gameSubscription = new Subscription();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.game).toEqual(expectedGame);
    done();
  });
});
