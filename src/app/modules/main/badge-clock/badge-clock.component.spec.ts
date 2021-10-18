import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeClockComponent } from './badge-clock.component';

describe('BadgeClockComponent', () => {
  let component: BadgeClockComponent;
  let fixture: ComponentFixture<BadgeClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
