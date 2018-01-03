import {COMMENTS_LOADED} from "../actions";

export function comments(state = [], action) {
    switch (action.type) {
        case COMMENTS_LOADED:
            return action.comments;
        default:
            return state
    }
}