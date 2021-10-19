import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StartStopCalculationComponent } from './start-stop-calculation.component';

describe('StartStopCalculationComponent', () => {
  let component: StartStopCalculationComponent;
  let fixture: ComponentFixture<StartStopCalculationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StartStopCalculationComponent],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
    TestBed.inject(MockStore);
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
