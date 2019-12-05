import { createReducer, on } from '@ngrx/store';
import { deleteAutoClocks, deleteManualClocks, saveAutoClocks, saveManualClocks, removeOneManualClock, removeOneAutoClock, dateChange } from './actions';
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
  let clocks: ClockInOut[] = JSON.parse(localStorage.getItem(moment().format('DD.MM.YYYY') + "autoclocks"));
  if (clocks === null) 
    clocks = [];
  return {
    action: null,
    clocks,
    date: moment()
  }
})();

const initialManualClocks: clockInOutWithDateAction = (() => {
  const clocks = JSON.parse(localStorage.getItem(moment().format('DD.MM.YYYY') + "manualclocks"));
  if (clocks === null || clocks.length === 0) {
    return {
      action: null,
      clocks: [new ClockInOut("08:00")],
      date: moment()
    };
  }
  
  return {
    action: null,
    clocks: clocks,
    date: moment()
  };
})();

const autoClockReducer = createReducer(initialAutoClocks,
  on(saveAutoClocks, (state, action) => {
    localStorage.setItem(state.date.format('DD.MM.YYYY') + "autoclocks", JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks,
      date: state.date
    };
  }),
  on(deleteAutoClocks, (state, action: { type: string, }) => {
    localStorage.removeItem(state.date.format('DD.MM.YYYY') + "autoclocks");
    return {
      action,
      clocks: [],
      date: state.date
    };
  }),
  on(removeOneAutoClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem(state.date.format('DD.MM.YYYY') + "autoclocks", JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState,
      date: state.date
    };
  }),
  on(dateChange, (state, { type, date }) => {
    let clocks = JSON.parse(localStorage.getItem(moment(date).format('DD.MM.YYYY') + "autoclocks"));

    if (clocks === null) clocks = [];

    return {
      action: { type },
      clocks: clocks,
      date: date
    }
  })
);

const manualReducer = createReducer(initialManualClocks,
  on(saveManualClocks, (state, action) => {
    localStorage.setItem(state.date.format('DD.MM.YYYY') + "manualclocks", JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks,
      date: state.date
    };
  }),
  on(deleteManualClocks, ({ date } , action) => {
    localStorage.removeItem(moment(date).format('DD.MM.YYYY') + "manualclocks");
    return {
      action,
      clocks: [
        new ClockInOut("08:00")
      ],
      date: date
    };
  }),
  on(removeOneManualClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem(state.date.format('DD.MM.YYYY') + "manualclocks", JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState,
      date: state.date
    };
  }),
  on(dateChange, (state, { type, date }) => {
    let clocks = JSON.parse(localStorage.getItem(moment(date).format('DD.MM.YYYY') + "manualclocks"));

    if (clocks === null) clocks = [new ClockInOut('08:00')];

    return {
      action: { type: type },
      clocks: clocks,
      date: date
    }
  })
);

export function AutoReducer(state: any, action: any) {
  return autoClockReducer(state, action);
}

export function ManualReducer(state: any, action: any) {
  return manualReducer(state, action);
}