import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as moment from 'moment';
import { AppModule, timeChange } from '../app.module';
import { EventData, HarnessLoader } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing'


import { TotalTimeChooserComponent } from './total-time-chooser.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

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
/* 
  it('calls valueChange() and dispatches when value changes', fakeAsync(async () => {
    const select = await loader.getHarness(MatInputHarness);
    const spy = spyOn(component, 'valueChange');
    (await select.host()).dispatchEvent('input', {target: {value: '08:00'}});
    expect(spy).toHaveBeenCalled();
  })); */
});
