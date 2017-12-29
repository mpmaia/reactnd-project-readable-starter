import {CATEGORIES_LOADED, POSTS_LOADED, CONFIRM_POST_DELETE} from './actions';
import { combineReducers } from 'redux';


function categories(state = [], action) {
    switch (action.type) {
        case CATEGORIES_LOADED:
            return action.categories;
        default:
            return state
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case POSTS_LOADED:
            return action.posts;
        default:
            return state
    }
}

function postToDelete(state = null, action) {
    switch (action.type) {
        case CONFIRM_POST_DELETE:
            return action.post;
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    postToDelete
});