import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { UserService } from '../../remote/user.service';

export interface WeeklyClocksResponse {
  weeklyClocks: string
}

@Component({
  selector: 'app-week-times',
  templateUrl: './week-times.component.html',
  styleUrls: ['./week-times.component.scss']
})
export class WeekTimesComponent implements AfterViewInit {

  dynamicColumnArray = [];
  displayedColumns = [];

  toDisplayHolder = [];

  toDisplay = new MatTableDataSource();

  @ViewChild(MatSort)
  matSort: MatSort;

  subj: Subject<string> = new Subject();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.subj.next('ha');
  }

  ngAfterViewInit(): void {
    const weekNumber = moment(moment.now()).isoWeek();

    this.createTable(weekNumber);
  }

  async createTable(weekNum: number) {
    return this.userService.getByWeek(weekNum).toPromise().then(data => {
      this.toDisplayHolder = JSON.parse(data.weeklyClocks);

      if (this.toDisplayHolder.length === 0) {
        this.displayedColumns = [];
        this.toDisplay.data = [];
        this.subj.next('a');
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
      this.displayedColumns = this.displayedColumns.concat(this.dynamicColumnArray);
      this.toDisplay.data = this.toDisplayHolder;
      this.subj.next('h');
      
      setTimeout(() => {
        this.toDisplay.sort = this.matSort;
        this.matSort.disableClear = true;
        this.matSort.start = 'desc';
      });
    });
  }
}
