import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TotalTimeChooserComponent } from './total-time-chooser.component';

describe('TotalTimeChooserComponent', () => {
  let component: TotalTimeChooserComponent;
  let fixture: ComponentFixture<TotalTimeChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalTimeChooserComponent],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
    TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTimeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));
});
