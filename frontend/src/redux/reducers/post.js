import {POSTS_LOADED, POST_LOADED, CONFIRM_POST_DELETE} from "../actions";

export function posts(state = [], action) {
    switch (action.type) {
        case POSTS_LOADED:
            return action.posts;
        default:
            return state
    }
}

export function post(state = null, action) {
    switch (action.type) {
        case POST_LOADED:
            return action.post;
        default:
            return state
    }
}

export function postToDelete(state = null, action) {
    switch (action.type) {
        case CONFIRM_POST_DELETE:
            return action.post;
        default:
            return state
    }
}