/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    CHANGE_USERNAME,
    LOAD_REPOS,
    LOAD_REPOS_SUCCESS,
    LOAD_REPOS_ERROR,
} from './constants';

export function changeUsername(name) {
    return {
        type: CHANGE_USERNAME,
        name,
    };
}

export function loadRepos() {
    return {
        type: LOAD_REPOS,
        text:'haiii',
    };
}

export function reposLoaded(repos, username) {
    return {
        type: LOAD_REPOS_SUCCESS,
        repos,
        username,
    };
}

export function repoLoadingError(error) {
    return {
        type: LOAD_REPOS_ERROR,
        error,
    };
}
