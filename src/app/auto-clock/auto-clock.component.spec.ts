import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { autoClocks, manualClocks, timeChange } from '../app.module';

import { AutoClockComponent } from './auto-clock.component';

describe('AutoClockComponent', () => {
  let component: AutoClockComponent;
  let fixture: ComponentFixture<AutoClockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoClockComponent ],
      imports: [
        StoreModule.forRoot({
          autoClocks,
          manualClocks,
          timeChange
        }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
