import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  /*
  @@INIT is sent to every reducer when Redux first boots up. 
  That is what configures the default state for each reducer 
  since we used ES6 default arguments to set the state
  if none is provided.
  */
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  //we send the currentState instead of the default
  //because we need to set the sortBy filter
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

test('should set startDate filter', () => {
  const startDate = moment();
  const action = {
    type: 'SET_START_DATE',
    startDate
  };
  const state = filtersReducer(undefined, action);

  expect(state.startDate).toEqual(startDate);
});

test('should set endDate', () => {
  const endDate = moment();
  const action = {
    type: 'SET_END_DATE',
    endDate
  };

  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});

test('should set text filter', () => {
  const text = 'Gum';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});
