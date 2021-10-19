import { MomentToStringPipe } from './moment-to-string.pipe';

describe('MomentToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MomentToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
