import { createAction, props } from '@ngrx/store';

export const saveAutoClocks = createAction('Save auto clocks');
export const deleteAutoClocks = createAction('Delete auto clocks');
export const removeOneAutoClock = createAction('Delete one auto clock-in', props<{ index: number }>());

export const saveManualClocks = createAction('Save manual clocks');
export const removeOneManualClock = createAction('Remove one manual clock-in', props<{index: number}>());
export const deleteManualClocks = createAction('Delete manual clocks');