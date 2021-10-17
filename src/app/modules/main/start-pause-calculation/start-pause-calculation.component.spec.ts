import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { AppModule, timeChange } from '../app.module';
import { DurationToStringPipe } from '../pipes/duration-to-string';

import { StartPauseCalculationComponent } from './start-pause-calculation.component';

describe('StartPauseCalculationComponent', () => {
  let component: StartPauseCalculationComponent;
  let fixture: ComponentFixture<StartPauseCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule
      ]
    }).compileComponents();
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
