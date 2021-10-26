import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { UserClock } from 'src/model/userclock';
import { UserService } from '../../remote/user.service';

export interface WeeklyClocksResponse {
  weeklyClocks: {
    [key: string]: UserClock[]
  };
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
  array = [];
  displayedColumns = ['date'];
  initialized = false;

  toDisplay: {
    date?: string,
    [key: string]: string,
  }[] = [];

  @ViewChild(MatSort) 
  matSort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const weekNumber = moment(moment.now()).isoWeek();
    
    this.createTable(weekNumber).then(() => {
      setTimeout(() => {
        this.matSort.start = 'desc';
      });
    });
  }

  createTable(weekNum: number): Promise<void> {
    let maxlen = 0;
    this.displayedColumns = ['date'];
    this.toDisplay = []
    this.data = [];
    return this.userService.getByWeek(weekNum).toPromise().then(data => {
      let i = 0;
      for (let p in data.weeklyClocks) {
        this.data[i] = {};
        this.data[i].date = moment(p, 'YYYY-MM-DD').format('DD.MM');
        this.data[i].clocks = data.weeklyClocks[p];

        if (this.data[i].clocks.length > maxlen) {
          maxlen = this.data[i].clocks.length;
        }

        i++;
      }

      this.array = new Array(maxlen).fill(0).map((_, i) => {
        return i % 2 === 0 ? 'entree' + i : 'sortie' + i;
      });

      this.data.forEach((d, firstIndex) => {
        this.toDisplay.push({
          date: d.date
        });

        this.array.forEach((_, i) => {
          this.toDisplay[firstIndex][i % 2 === 0 ? 'entree' + i : 'sortie' + i] = d.clocks[i]?.time.substring(0, 5) || '';
        });
      });

      this.sort({
        direction: 'asc',
        active: 'date'
      });

      this.displayedColumns = this.displayedColumns.concat(this.array);
      this.initialized = true;
    });
  }

  sort({ direction, active }) {
    this.toDisplay = [...this.toDisplay.sort((a, b) => {
      let f = a[active] < b[active] ? -1 : a[active] > b[active] ? 1 : 0;
      if (direction === 'desc') f *= -1;
      return f;
    })];
  }
}
