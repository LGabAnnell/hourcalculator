import { TestBed, async, waitForAsync, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import * as moment from 'moment';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { totalTimeChange } from './store/actions';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatTabLinkHarness } from '@angular/material/tabs/testing';
import { AppModule, timeChange } from './app.module';


describe('AppComponent', () => {
  let component: ComponentFixture<AppComponent>;
  let store: MockStore;
  let loader: HarnessLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule
      ],
      providers: [
        provideMockStore({
          initialState: { duration: moment.duration({ hours: 4, minutes: 10 }) },
          selectors: [
            { selector: 'timeChange', value: moment.duration({ hours: 4, minutes: 10 }) },
            { selector: 'manualClocks', value: moment.now() }
          ]
        }),
        { provide: MAT_DATE_LOCALE, useValue: 'ch-FR' },
        {
          provide: MAT_DATE_FORMATS, useValue: {
            display: {
              dateInput: 'DD.MM.YYYY',
              monthYearLabel: 'MMM YYYY'
            }
          }
        }
      ]
    }).compileComponents();
    component = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(component);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'material-hourcalculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('material-hourcalculator');
  });

  it('clicks and routes', async () => {
    const link = await loader.getHarness(MatTabLinkHarness.with({ selector: '[routerLink="pause"]' }));
    await link.click();
    expect(location.href).toContain('/pause')
  });
});
