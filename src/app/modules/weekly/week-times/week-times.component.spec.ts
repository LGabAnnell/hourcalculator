import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekTimesComponent } from './week-times.component';

describe('WeekTimesComponent', () => {
  let component: WeekTimesComponent;
  let fixture: ComponentFixture<WeekTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
