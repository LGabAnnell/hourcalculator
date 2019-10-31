import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartStopCalculationComponent } from './start-stop-calculation.component';

describe('StartStopCalculationComponent', () => {
  let component: StartStopCalculationComponent;
  let fixture: ComponentFixture<StartStopCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartStopCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartStopCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
