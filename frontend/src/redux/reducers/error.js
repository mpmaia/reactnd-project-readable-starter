import {ERROR} from "../actions/error";

export function errorMsg(state = [], action) {
    switch (action.type) {
        case ERROR:
            return action.msg;
        default:
            return state
    }
}