import { createReducer, on } from '@ngrx/store';
import { totalTimeChange, deleteAutoClocks, deleteManualClocks, saveAutoClocks, saveManualClocks, removeOneManualClock, removeOneAutoClock, dateChange, userChange, startPauseChange } from './actions';
import { ClockInOut } from 'src/model/clockinout';
import * as moment from 'moment';

export type clockInOutAction = {
  action: { type: string } | null,
  clocks: ClockInOut[]
}

export type clockInOutWithDateAction = clockInOutAction & {
  date?: moment.Moment
}

const initialAutoClocks: clockInOutWithDateAction = (() => {
  let clocks: ClockInOut[] = JSON.parse(localStorage.getItem(moment().format('DD.MM.YYYY') + 'autoclocks'));
  if (clocks === null)
    clocks = [];
  return {
    action: null,
    clocks,
    date: moment()
  }
})();

const initialManualClocks: clockInOutWithDateAction = (() => {
  const clocks = JSON.parse(localStorage.getItem(moment().format('DD.MM.YYYY') + 'manualclocks'));
  if (clocks === null || clocks.length === 0) {
    return {
      action: null,
      clocks: [new ClockInOut('08:00')],
      date: moment()
    };
  }

  return {
    action: null,
    clocks,
    date: moment()
  };
})();

const initialTotalTime = (() => ({
  duration: moment.duration({
    hours: 8,
    minutes: 24
  })
}))()

export const autoClockReducer = createReducer(initialAutoClocks,
  on(saveAutoClocks, (state, action) => {
    localStorage.setItem(state.date.format('DD.MM.YYYY') + 'autoclocks', JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks,
      date: state.date
    };
  }),
  on(deleteAutoClocks, (state, action) => {
    localStorage.removeItem(state.date.format('DD.MM.YYYY') + 'autoclocks');
    return {
      action,
      clocks: [],
      date: state.date
    };
  }),
  on(removeOneAutoClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem(state.date.format('DD.MM.YYYY') + 'autoclocks', JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState,
      date: state.date
    };
  }),
  on(dateChange, (state, { type, date }) => {
    let clocks = JSON.parse(localStorage.getItem(moment(date).format('DD.MM.YYYY') + 'autoclocks'));

    if (clocks === null) clocks = [];

    return {
      action: { type },
      clocks,
      date
    }
  })
);

export const manualReducer = createReducer(initialManualClocks,
  on(saveManualClocks, (state, action) => {
    localStorage.setItem(state.date.format('DD.MM.YYYY') + 'manualclocks', JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks,
      date: state.date
    };
  }),
  on(deleteManualClocks, ({ date }, action) => {
    localStorage.removeItem(moment(date).format('DD.MM.YYYY') + 'manualclocks');
    return {
      action,
      clocks: [
        new ClockInOut('08:00')
      ],
      date: date
    };
  }),
  on(removeOneManualClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem(state.date.format('DD.MM.YYYY') + 'manualclocks', JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState,
      date: state.date
    };
  }),
  on(dateChange, (_, { type, date }) => {
    let clocks = JSON.parse(localStorage.getItem(moment(date).format('DD.MM.YYYY') + 'manualclocks'));

    if (clocks === null) clocks = [new ClockInOut('08:00')];

    return {
      action: { type },
      clocks,
      date
    }
  })
);

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
    }
  })
);
