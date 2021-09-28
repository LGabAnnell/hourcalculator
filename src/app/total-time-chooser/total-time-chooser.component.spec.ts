import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTimeChooserComponent } from './total-time-chooser.component';

describe('TotalTimeChooserComponent', () => {
  let component: TotalTimeChooserComponent;
  let fixture: ComponentFixture<TotalTimeChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalTimeChooserComponent ]
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
