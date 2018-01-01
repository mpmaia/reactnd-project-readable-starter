import {CATEGORIES_LOADED} from "../actions";

export function categories(state = [], action) {
    switch (action.type) {
        case CATEGORIES_LOADED:
            return action.categories;
        default:
            return state
    }
}