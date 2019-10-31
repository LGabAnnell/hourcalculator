import { createAction, props } from '@ngrx/store';
import { ClockInOut } from 'src/model/clockinout';

export const saveAutoClocks = createAction('Save auto clocks');
export const deleteAutoClocks = createAction('Delete auto clocks');

export const saveManualClocks = createAction('Save manual clocks');
export const removeOneManualClock = createAction('Remove one manual clock-in', props<{clocks: ClockInOut[]}>());
export const deleteManualClocks = createAction('Delete manual clocks');