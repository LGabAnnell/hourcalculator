import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { timeChange } from '../app.module';

import { TotalTimeChooserComponent } from './total-time-chooser.component';

describe('TotalTimeChooserComponent', () => {
  let component: TotalTimeChooserComponent;
  let fixture: ComponentFixture<TotalTimeChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTimeChooserComponent ],
      imports: [
        StoreModule.forRoot([
          timeChange
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTimeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
