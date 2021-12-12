import { createReducer, on } from '@ngrx/store';
import { totalTimeChange, dateChange, userChange, startPauseChange } from './actions';
import { ClockInOut } from 'src/model/clockinout';
import * as moment from 'moment';

export type clockInOutAction = {
  action: { type: string } | null,
  clocks: ClockInOut[]
}

const initialTotalTime = (() => ({
  duration: moment.duration({
    hours: 8,
    minutes: 24
  })
}))()

const initialUserState = {};
export const userReducer = createReducer(initialUserState,
  on(userChange, (_, action) => {
    return action.user
  })
);

export const simpleDateReducer = createReducer(moment(),
  on(dateChange, (_, action) => {
    return action.date;
  })
);

export const startPauseReducer = createReducer(moment('08:00', 'HH:mm'),
  on(startPauseChange, (_, action) => {
    return action.time;
  })
);

export const totalTimeReducer = createReducer(initialTotalTime,
  on(totalTimeChange, (_, { duration }) => {
    return {
      duration
    };
  })
);
