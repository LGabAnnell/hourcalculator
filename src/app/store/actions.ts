import { createAction, createSelector, props } from '@ngrx/store';
import * as moment from 'moment';
import { UserFromToken } from '../model/user-from-token';


export interface TimeChange {
  duration: moment.Duration;
}

export interface AppState {
  timeChange: TimeChange;
}

export const saveAutoClocks = createAction('Save auto clocks');
export const deleteAutoClocks = createAction('Delete auto clocks');
export const removeOneAutoClock = createAction('Delete one auto clock-in', props<{ index: number }>());

export const saveManualClocks = createAction('Save manual clocks', props<{ date: moment.Moment }>());
export const removeOneManualClock = createAction('Remove one manual clock-in', props<{ index: number }>());
export const deleteManualClocks = createAction('Delete manual clocks');

export const startPauseChange = createAction('Start/pause change', props<{ time: moment.Moment }>())

export const dateChange = createAction('Date changed', props<{ date: moment.Moment }>());

export const totalTimeChange = createAction('Total time changed', props<{ duration: moment.Duration }>());

export const userChange = createAction('User changed!', props<{ user: UserFromToken }>());