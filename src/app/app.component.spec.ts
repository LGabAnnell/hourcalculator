import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterModule.forRoot([]),
        MatIconModule,
        MatSnackBarModule
      ],
      providers: [
        provideMockStore({
          initialState: { action: { type: 'Delete manual clocks' } },
          selectors: [
            { selector: 'manualClocks', value: { action: '' } },
          ]
        })
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the app', () => {
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'material-hourcalculator'`, () => {
    const component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('material-hourcalculator');
  });

  it('should call addDay when right chevron clicked', async () => {
    const icon = await loader.getHarness(MatIconHarness.with({ name: 'chevron_right' }));
    const spy = spyOn(fixture.debugElement.componentInstance, 'addDay');
    await (await icon.host()).click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call removeDay when left chevron clicked', async () => {
    const icon = await loader.getHarness(MatIconHarness.with({ name: 'chevron_left' }));
    const spy = spyOn(fixture.debugElement.componentInstance, 'removeDay');
    store.setState({ action: { type: '' }})
    await (await icon.host()).click();
    expect(spy).toHaveBeenCalled();
  });
});
