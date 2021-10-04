import { TestBed, async, waitForAsync, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDatepickerModule, } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { provideMockStore, MockStore } from '@ngrx/store/testing'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app-routes';
import { RouterModule } from '@angular/router';


describe('AppComponent', () => {
  let store: MockStore;
  let component: ComponentFixture<AppComponent>; 
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatMomentDateModule,
      ],
      providers: [
        provideMockStore({})
      ]
    }).compileComponents();
    component = TestBed.createComponent(AppComponent);
    store = TestBed.inject(MockStore);
  }));

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

  it('should go to pause URL when pause button is clicked', fakeAsync(() => {
    const link = component.debugElement.query(By.css('a[routerLink=pause]'));
    link.triggerEventHandler('click', null);
    tick();
    component.detectChanges();
    expect(window.location.href).toContain('/pause');
  }));
});
