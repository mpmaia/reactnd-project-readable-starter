import {COMMENTS_LOADED, CONFIRM_COMMENT_DELETE} from "../actions";

export function comments(state = [], action) {
    switch (action.type) {
        case COMMENTS_LOADED:
            return action.comments;
        default:
            return state
    }
}

export function commentToDelete(state = null, action) {
    switch (action.type) {
        case CONFIRM_COMMENT_DELETE:
            return action.comment;
        default:
            return state
    }
}