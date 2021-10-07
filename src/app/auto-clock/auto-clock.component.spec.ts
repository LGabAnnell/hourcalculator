import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppModule, autoClocks, manualClocks, timeChange } from '../app.module';

import { AutoClockComponent } from './auto-clock.component';

describe('AutoClockComponent', () => {
  let component: AutoClockComponent;
  let fixture: ComponentFixture<AutoClockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoClockComponent],
      providers: [
        provideMockStore()
      ],
      imports: []
    }).compileComponents();
    TestBed.inject(MockStore)
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
