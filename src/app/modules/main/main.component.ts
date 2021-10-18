import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { merge, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  manual$: Observable<any>;
  auto$: Observable<any>;
  constructor() {}
}