import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainPage state domain
 */

const selectMainPageDomain = state => state.get('mainPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () =>
  createSelector(selectMainPageDomain, substate => substate.toJS());

const makeFeaturedEventsSelector = () => createSelector(selectMainPageDomain, substate.get('featuredEvents'))

const makeEventsSelector = () => createSelector(selectMainPageDomain, substate.get('events'))
export default makeSelectMainPage;
export { selectMainPageDomain, makeFeaturedEventsSelector, makeEventsSelector };
