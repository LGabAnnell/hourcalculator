import { createReducer, on } from '@ngrx/store';
import { deleteAutoClocks, deleteManualClocks, saveAutoClocks, saveManualClocks, removeOneManualClock, removeOneAutoClock } from './actions';
import { ClockInOut } from 'src/model/clockinout';

const initialAutoClocks = (() => {
  let clocks = JSON.parse(localStorage.getItem("autoclocks"));
  if (clocks === null) 
    clocks = [];
  return {
    action: null,
    clocks
  }
})();
const initialManualClocks = (() => {
  const clocks = JSON.parse(localStorage.getItem("manualclocks"));
  if (clocks === null || clocks.length === 0) {
    return {
      action: null,
      clocks: [new ClockInOut("08:00")]
    };
  }
  
  return {
    action: null,
    clocks: clocks
  };
})();

const autoClockReducer = createReducer(initialAutoClocks,
  on(saveAutoClocks, (state, action) => {
    localStorage.setItem("autoclocks", JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks
    };
  }),
  on(deleteAutoClocks, ({ clocks }, action) => {
    localStorage.removeItem("autoclocks");
    return {
      action,
      clocks: []
    };
  }),
  on(removeOneAutoClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem("autoclocks", JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState
    };
  })
);

const manualReducer = createReducer(initialManualClocks,
  on(saveManualClocks, (state, action) => {
    localStorage.setItem("manualclocks", JSON.stringify(state.clocks));
    return {
      action,
      clocks: state.clocks
    };
  }),
  on(deleteManualClocks, (_ , action) => {
    localStorage.removeItem("manualclocks");
    return {
      action,
      clocks: [
        new ClockInOut("08:00")
      ]
    };
  }),
  on(removeOneManualClock, (state, { index }) => {
    const newState = state.clocks.filter((_, idx) => idx !== index);
    localStorage.setItem("manualclocks", JSON.stringify(newState));
    return {
      action: state.action,
      clocks: newState
    };
  })
);

export function AutoReducer(state: any, action: any) {
  return autoClockReducer(state, action);
}

export function ManualReducer(state: any, action: any) {
  return manualReducer(state, action);
}