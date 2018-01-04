import {ERROR} from "../../../../redux/actions/error";
import {errorMsg} from "../../../../redux/reducers";

describe('errorMsg reducer', () => {
    it('reducers should return the initial state', () => {
        expect(errorMsg(undefined, {})).toEqual(null);
    });

    it('errorMsg handle COMMENTS_LOADED', () => {
        const startAction = {
            type: ERROR,
            msg: "TEST"
        };
        expect(errorMsg([], startAction)).toEqual("TEST");
    });
});