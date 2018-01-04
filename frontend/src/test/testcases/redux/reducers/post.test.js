import {posts, post, postOrderBy} from "../../../../redux/reducers";
import {POST_LOADED, POSTS_LOADED, POSTS_ORDER_BY} from "../../../../redux/actions";


describe('post reducer', () => {
    it('reducers should return the initial state', () => {
        expect(posts(undefined, {})).toEqual([]);
        expect(post(undefined, {})).toEqual(null);
        expect(postOrderBy(undefined, {})).toEqual(null);
    });

    it('posts handle POSTS_LOADED', () => {
        const startAction = {
            type: POSTS_LOADED,
            posts: [{id:1}]
        };
        expect(posts([], startAction)).toEqual([{id:1}]);
    });

    it('posts handle POST_LOADED', () => {
        const startAction = {
            type: POST_LOADED,
            post: {id:1, test: true}

        };
        expect(posts([{id:1}], startAction)).toEqual([{id:1, test: true}]);
    });

    it('post handle POST_LOADED', () => {
        const startAction = {
            type: POST_LOADED,
            post: {id:1, test: true}

        };
        expect(post({id:1}, startAction)).toEqual({id:1, test: true});
    });

    it('postOrderBy handle POSTS_ORDER_BY', () => {
        const startAction = {
            type: POSTS_ORDER_BY,
            field: 'id'

        };
        expect(postOrderBy({}, startAction)).toEqual('id');
    });
});