import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoClockComponent } from './auto-clock.component';

describe('AutoClockComponent', () => {
  let component: AutoClockComponent;
  let fixture: ComponentFixture<AutoClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
