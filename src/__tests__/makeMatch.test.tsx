import makeMatch from '../makeMatch';

describe('makeMatch() work', () => {
  it('work with string', () => {
    const match = makeMatch('/', '/');
    expect(match).not.toBeNull();
  });

  it('return null when pass empty string', () => {
    const match = makeMatch('/', '');
    expect(match).toBeNull();
  });

  it('return null when pass nothing', () => {
    const match = makeMatch('/');
    expect(match).toBeNull();
  });

  it('option.exact works', () => {
    const match = makeMatch('/foo', { path: '/', exact: false });
    expect(match).not.toBeNull();
  });
});
