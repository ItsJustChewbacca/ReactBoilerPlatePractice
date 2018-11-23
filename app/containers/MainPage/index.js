/**
 *
 * MainPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeFeaturedEventsSelector, makeEventsSelector } from './selectors';
import { loadFeaturedEvents, loadEvents, } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class MainPage extends React.Component {
  componentDidMount() {
    // load featured events
    this.props.loadEvents('12121', 0, 15, '');
    this.props.loadFeaturedEvents('12121', 0, 5);
    // load events
  }

  render() {
    console.log(this.props.featuredEvents)
    const featuredEvents = { ...this.props.featuredEvents};
    console.log('featuredEvents' + featuredEvents)
    const events = { ...this.props.events}
    console.log('events' + events)

    return (
      <div>
        <Helmet>
          <title>MainPage</title>
          <meta name="description" content="Description of MainPage" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

MainPage.propTypes = {
  featuredEvents: PropTypes.array,
  events: PropTypes.array,
  loadEvents: PropTypes.func,
  loadFeatureEvents: PropTypes.func, 
};

const mapStateToProps = createStructuredSelector({
  tenant: makeTenantSelector(),
  featuredEvents: makeFeaturedEventsSelector(),
  events: makeEventsSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEvents: (tenantId, skip, take, searchTerm) => dispatch(loadEvents(tenantId, skip, take, searchTerm)),
    loadFeaturedEvents: (tenantId, skip, take) => dispatch(loadFeaturedEvents(tenantId, skip, take)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'mainPage', reducer });
const withSaga = injectSaga({ key: 'mainPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MainPage);
