import rootSaga from '../../store/actions/rootSaga';

it('rootSaga test', () => {
  const gen = rootSaga();
  const { payload } = gen.next().value;
  expect(payload).toHaveLength(payload.length);
});
