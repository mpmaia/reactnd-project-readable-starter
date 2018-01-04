import {comments} from "../../../../redux/reducers";
import {COMMENTS_LOADED} from "../../../../redux/actions";

describe('comments reducer', () => {
    it('reducers should return the initial state', () => {
        expect(comments(undefined, {})).toEqual([]);
    });

    it('comments handle COMMENTS_LOADED', () => {
        const startAction = {
            type: COMMENTS_LOADED,
            comments: [{id:1}]
        };
        expect(comments([], startAction)).toEqual([{id:1}]);
    });
});