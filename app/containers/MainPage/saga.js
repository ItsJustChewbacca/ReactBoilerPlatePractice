import { all, take, call, put, select, takeLatest } from 'redux-saga/effects';
import events from './mocks/Events';
import featuredEvents from './mocks/featuredEvents';
import { loadFeaturedEventsSuccess, loadEventsSuccess, loadEventsError, loadFeaturedEventsError } from './actions';
import { LOAD_EVENTS } from './constants'

function* loadFeaturedEvents() {
	//ToDO: Call the API - this will get featured events
	////toDO: set results in actions
	//yield put(loadFeaturedEventsSuccess(featuredEvents))
	yield takeLatest(LOAD_FEATURED_EVENTS, fetchFeaturedEvents)
}

function* loadEvents() {
	//ToDO: Call the API - this will get events
	////toDO: set results in actions
	//yield put(loadEventsSuccess(events))
	yield takeLatest(LOAD_EVENTS, fetchEvents)
}

function* fetchFeaturedEvents(action) {
	try {
		console.log('TenantId', action.tenantId);
		console.log('Skip', action.skip);
		console.log('Take', action.take);
		yield put(loadFeaturedEventsSuccess(featuredEvents))
	} catch (error) {
		yield put(loadFeaturedEventsError(error))
	}
}

function* fetchEvents(action) {
	try {
		console.log('TenantId', action.tenantId);
		console.log('Skip', action.skip);
		console.log('Take', action.take);
		yield put(loadEventsSuccess(events))
	} catch (error) {
		yield put(loadEventsError(error))
	}
}
// Individual exports for testing
export default function* mainPageSaga() {
  yield all([loadEvents(), loadFeaturedEvents()])
}
