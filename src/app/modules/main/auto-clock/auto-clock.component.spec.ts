import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

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
