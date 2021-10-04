import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AppModule, manualClocks } from '../app.module';

import { StartStopCalculationComponent } from './start-stop-calculation.component';

describe('StartStopCalculationComponent', () => {
  let component: StartStopCalculationComponent;
  let fixture: ComponentFixture<StartStopCalculationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StartStopCalculationComponent],
      imports: [
        AppModule
      ]
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
