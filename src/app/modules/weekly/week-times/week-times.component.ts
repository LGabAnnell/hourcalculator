import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../remote/user.service';
import { Store } from '@ngrx/store';
import { dateChange } from '../../../store/actions';
import { Router } from '@angular/router';

export interface WeeklyClocksResponse {
  weeklyClocks: string
}

@Component({
  selector: 'app-week-times',
  templateUrl: './week-times.component.html',
  styleUrls: ['./week-times.component.scss']
})
export class WeekTimesComponent implements OnInit, AfterViewInit, OnDestroy {

  dynamicColumnArray = [];
  displayedColumns = [];
  toDisplayHolder = [];
  toDisplay = new MatTableDataSource();

  @ViewChild(MatSort)
  matSort: MatSort;

  subj: Subject<string> = new Subject();
  totalTimeSub: Subscription;
  totalTimeToWork: moment.Duration;

  constructor(private userService: UserService,
              private store: Store<{ timeChange: { duration: moment.Duration } }>,
              private router: Router) {
  }

  ngOnInit() {
    this.totalTimeSub = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.totalTimeToWork = duration;
    });
    this.subj.next('ha');
  }

  async ngAfterViewInit(): Promise<void> {
    const weekNumber = moment(moment.now()).isoWeek();
    await this.createTable(weekNumber);
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
        for (const p in d) {
          if (p === 'date')
            continue;
          if (!this.dynamicColumnArray.includes(p)) {
            this.dynamicColumnArray.push(p);
          }
        }
      });

      this.dynamicColumnArray.sort();

      this.toDisplayHolder.forEach((el, index) => {
        this.addTotalColumn(index, el);
      });

      this.displayedColumns = this.displayedColumns.concat(this.dynamicColumnArray).concat(['total', 'diff']);
      this.toDisplay.data = this.toDisplayHolder;
      this.subj.next('h');

      setTimeout(() => {
        this.matSort.disableClear = true;
        this.matSort.start = 'desc';
        this.toDisplay.sort = this.matSort;
      });
    });
  }

  dateClick(date: string) {
    const newDate = moment(date, 'DD.MM');
    newDate.year(2021);

    this.store.dispatch(dateChange({
      date: newDate
    }));

    this.router.navigateByUrl('/main/badge');
  }

  addTotalColumn(index: number, row: { [key: string]: string }) {
    const total = moment.duration(0);
    const timeArray: moment.Moment[] = [];
    for (const p in row) {
      if (p === 'date' || p === 'total') continue;
      if (row.hasOwnProperty(p))
        timeArray.push(moment(row[p], 'HH.mm'));
    }

    timeArray.sort();

    for (let i = 0; i < timeArray.length - 1; i += 2) {
      total.add(timeArray[i + 1].diff(timeArray[i]));
    }

    this.toDisplayHolder[index].total = total;
    this.toDisplayHolder[index].diff = total.clone().subtract(this.totalTimeToWork);
  }

  ngOnDestroy() {
    this.totalTimeSub.unsubscribe();
  }
}
