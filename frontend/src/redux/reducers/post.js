import {POSTS_LOADED, POST_LOADED, POSTS_ORDER_BY} from "../actions";

export function posts(state = [], action) {
    switch (action.type) {
        case POSTS_LOADED:
            return action.posts;
        case POST_LOADED:
            //If just one post was loaded, replace it on the state.
            if(state) {
                return state.filter((p) => p.id!==action.post.id).concat(action.post)
            } else {
                return state;
            }
        default:
            return state;
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

export function postOrderBy(state = null, action) {
    switch (action.type) {
        case POSTS_ORDER_BY:
            return action.field;
        default:
            return state
    }
}