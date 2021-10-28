import { Component, ContentChildren, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss']
})
export class BottomNavigationComponent implements OnInit {

  @ViewChildren('button')
  buttons: QueryList<MatButton>;

  constructor(private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: { isLoggedIn: boolean }) { 
  }

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
