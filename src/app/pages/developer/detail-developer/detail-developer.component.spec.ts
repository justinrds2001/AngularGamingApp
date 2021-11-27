import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDeveloperComponent } from './detail-developer.component';

describe('DetailDeveloperComponent', () => {
  let component: DetailDeveloperComponent;
  let fixture: ComponentFixture<DetailDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDeveloperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
