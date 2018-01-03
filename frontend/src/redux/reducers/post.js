import {POSTS_LOADED, POST_LOADED, CONFIRM_POST_DELETE, POSTS_ORDER_BY} from "../actions";

export function posts(state = [], action) {
    switch (action.type) {
        case POSTS_LOADED:
            return action.posts;
        case POST_LOADED:
            //If just one post was loaded, find it on the posts array and update it.
            if(state) {
                return state.map(s => {
                    if(s.id===action.post.id) {
                        return action.post;
                    } else {
                        return s;
                    }
                })
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

export function postToDelete(state = null, action) {
    switch (action.type) {
        case CONFIRM_POST_DELETE:
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