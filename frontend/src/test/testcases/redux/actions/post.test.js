import {fetchPosts, fetchPostsByCategory, fetchPost} from '../../../../redux/actions/post';
import {POSTS_LOADED, POST_LOADED} from "../../../../redux/actions/post";

import {getMockAxios, getMockStore} from "../../../utils/mocks";
import {addPost, deletePost, downVotePost, editPost, upVotePost} from "../../../../redux/actions";
import {ERROR} from "../../../../redux/actions/error";

describe('async actions', () => {

    var mockPosts = [{id:1}, {id:2}];
    var store, mock;

    beforeAll(()=>{
        mock = getMockAxios();
    });

    beforeEach(()=>{
        store = getMockStore();
        mock.reset();
    });

    it('creates POSTS_LOADED when fetchPosts is called', () => {

        mock.onGet('/posts').reply(200, mockPosts);

        const expectedActions = [
            { type: POSTS_LOADED, posts: mockPosts},
        ];

        return store.dispatch(fetchPosts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates ERROR when fetchPosts is called and a error occurs', () => {

        mock.onGet('/posts').reply(500);

        const expectedActions = [
            { type: ERROR, msg: "There was an error during the request. Please try again later."},
        ];

        return store.dispatch(fetchPosts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates POSTS_LOADED when fetchPostsByCategory is called', () => {

        mock.onGet('/test/posts').reply(200, mockPosts);

        const expectedActions = [
            { type: POSTS_LOADED, posts: mockPosts},
        ];

        return store.dispatch(fetchPostsByCategory('test')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('creates POST_LOADED and comments when fetchPost is called', () => {

        mock.onGet('/posts/1').reply(200, mockPosts[0]);
        mock.onGet('/posts/1/comments').reply(200, []);

        const expectedActions = [
            { type: POST_LOADED, post: mockPosts[0]},
        ];

        return store.dispatch(fetchPost(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('dispatch a fetchPost() when post is upVoted', () => {

        mock.onPost(`/posts/${mockPosts[0].id}`, {option: 'upVote'}).reply(200);
        mock.onGet('/posts/1').reply(200, mockPosts[0]);
        mock.onGet('/posts/1/comments').reply(200, []);

        const mockDispatch = jest.fn();

        const result = upVotePost(mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: POST_LOADED, post: mockPosts[0]},
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPost() when post is downVoted', () => {

        mock.onPost(`/posts/${mockPosts[0].id}`, {option: 'downVote'}).reply(200);
        mock.onGet('/posts/1').reply(200, mockPosts[0]);
        mock.onGet('/posts/1/comments').reply(200, []);

        const mockDispatch = jest.fn();

        const result = downVotePost(mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: POST_LOADED, post: mockPosts[0]},
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPosts() when post is deleted', () => {

        mock.onDelete(`/posts/${mockPosts[0].id}`).reply(200);
        mock.onGet('/posts').reply(200, mockPosts);

        const mockDispatch = jest.fn();

        const result = deletePost(mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: POSTS_LOADED, posts: mockPosts}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    /*
    it('dispatch a fetchPosts() when post is added', () => {

        mock.onPost('/posts/').reply(200);
        mock.onGet('/posts').reply(200, mockPosts);

        const mockDispatch = jest.fn();

        const result = addPost(mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: POSTS_LOADED, posts: mockPosts}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });*/

    it('dispatch a fetchPosts() when post is edit', () => {

        mock.onPut(`/posts/${mockPosts[0].id}`).reply(200);
        mock.onGet('/posts/1').reply(200, mockPosts[0]);
        mock.onGet('/posts/1/comments').reply(200, []);

        const mockDispatch = jest.fn();

        const result = editPost(mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: POST_LOADED, post: mockPosts[0]}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });
});

