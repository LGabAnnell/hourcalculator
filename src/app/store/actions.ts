import { createAction, props } from '@ngrx/store';
import* as moment from 'moment';

export const saveAutoClocks = createAction('Save auto clocks');
export const deleteAutoClocks = createAction('Delete auto clocks');
export const removeOneAutoClock = createAction('Delete one auto clock-in', props<{ index: number }>());

export const saveManualClocks = createAction('Save manual clocks', props<{ date: moment.Moment }>());
export const removeOneManualClock = createAction('Remove one manual clock-in', props<{index: number}>());
export const deleteManualClocks = createAction('Delete manual clocks');

export const dateChange = createAction('Date changed', props<{ date: moment.Moment }>());