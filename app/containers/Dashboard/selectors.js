/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectUsername = () => createSelector(
    selectHome,
    (homeState) => homeState.get('username')
);

const makeSelectCurrentUser = () => createSelector(
    selectHome,
    (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
    selectHome,
    (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
    selectHome,
    (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
    selectHome,
    (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        const routingState = state.get('route'); // or state.route

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        return prevRoutingStateJS;
    };
};

export {
    selectHome,
    makeSelectUsername,
    makeSelectCurrentUser,
    makeSelectLoading,
    makeSelectError,
    makeSelectRepos,
    makeSelectLocationState,
};


