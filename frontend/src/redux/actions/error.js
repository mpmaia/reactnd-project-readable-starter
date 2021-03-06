export const ERROR = 'ERROR';

export function createError(msg) {
    return {
        type: ERROR,
        msg: msg
    }
}

export function withError(dispatch, promise) {
    return promise.catch( response => {
        dispatch(showError(response));
    });
}

export function showError(response) {
    return (dispatch) => {
        console.log("Failed response", response);
        dispatch(createError("There was an error during the request. Please try again later."));
    }
}