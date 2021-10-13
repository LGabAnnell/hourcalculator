import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteClockComponent } from './remote-clock.component';

describe('RemoteClockComponent', () => {
  let component: RemoteClockComponent;
  let fixture: ComponentFixture<RemoteClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
