import { createReducer, on } from '@ngrx/store';
import { deleteAutoClocks, deleteManualClocks, saveAutoClocks, saveManualClocks, removeOneManualClock } from './actions';
import { ClockInOut } from 'src/model/clockinout';

const initialAutoClocks = JSON.parse(localStorage.getItem("autoclocks")) || [];
const initialManualClocks = JSON.parse(localStorage.getItem("manualclocks")) || [];

const autoClockReducer = createReducer(initialAutoClocks, 
    on(saveAutoClocks, state => {
        localStorage.setItem("autoclocks", JSON.stringify(state));
        return state;
    }),
    on(deleteAutoClocks, () => {
        localStorage.removeItem("autoclocks");
        return [];
    })
);

const manualReducer = createReducer(initialManualClocks, 
    on(saveManualClocks, state => {
        localStorage.setItem("manualclocks", JSON.stringify(state));
        return state;
    }),
    on(deleteManualClocks, () => {
        localStorage.removeItem("manualclocks");
        return [
            new ClockInOut("08:00")
        ];
    }),
    on(removeOneManualClock, (_, { clocks }) => {
        return clocks;
    })
);

export function AutoReducer(state: any, action: any) {
    return autoClockReducer(state, action);
}

export function ManualReducer(state: any, action: any) {
    return manualReducer(state, action);
}