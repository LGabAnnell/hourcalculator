import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPauseCalculationComponent } from './start-pause-calculation.component';

describe('StartPauseCalculationComponent', () => {
  let component: StartPauseCalculationComponent;
  let fixture: ComponentFixture<StartPauseCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartPauseCalculationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPauseCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
