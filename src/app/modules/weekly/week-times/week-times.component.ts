import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { UserClock } from 'src/model/userclock';
import { UserService } from '../../remote/user.service';

export interface WeeklyClocksResponse {
  weeklyClocks: string
}

@Component({
  selector: 'app-week-times',
  templateUrl: './week-times.component.html',
  styleUrls: ['./week-times.component.scss']
})
export class WeekTimesComponent implements OnInit {

  data: {
    date?: string,
    clocks?: UserClock[]
  }[] = [];
  dynamicColumnArray = [];
  displayedColumns = ['date'];

  toDisplayHolder: {
    date?: string,
    [key: string]: string,
  }[] = [{}];
  toDisplay = new MatTableDataSource();

  @ViewChild(MatSort)
  matSort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  createTable(weekNum: number) {
    this.userService.getByWeek(weekNum).toPromise().then(data => {
      this.toDisplayHolder = JSON.parse(data.weeklyClocks);
      
      if (this.toDisplayHolder.length === 0) {
        this.displayedColumns = [];
        this.toDisplay.data = [];
        return;
      }

      this.displayedColumns = ['date'];
      this.dynamicColumnArray = [];

      this.toDisplayHolder.forEach(d => {
        for (let p in d) {
          if (p === 'date')
            continue;
          if (!this.dynamicColumnArray.includes(p)) {
            this.dynamicColumnArray.push(p);
          }
        }
      });

      this.dynamicColumnArray.sort();
      console.log(this.dynamicColumnArray);
      console.log(this.toDisplayHolder);

      this.displayedColumns = [...this.displayedColumns.concat(this.dynamicColumnArray)];
      this.toDisplay.data = this.toDisplayHolder;
    });
  }

  ngAfterViewInit() {
    const weekNumber = moment(moment.now()).isoWeek();

    this.createTable(weekNumber);
    this.toDisplay.sort = this.matSort;
  }

  sort({ direction, active }) {
    this.toDisplayHolder = [...this.toDisplayHolder.sort((a, b) => {
      let f = a[active] < b[active] ? -1 : a[active] > b[active] ? 1 : 0;
      if (direction === 'desc') {
        f *= -1;
      }
      return f;
    })];
  }
}
