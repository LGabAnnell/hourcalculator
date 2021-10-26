import { Component, ContentChildren, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {

  @ViewChildren('button')
  buttons: QueryList<MatButton>;

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.buttons.toArray().forEach(btn => {
      btn._elementRef.nativeElement.addEventListener('click', (event: Event) => {
        this.bottomSheet.dismiss();
      });
    });
  }

}
