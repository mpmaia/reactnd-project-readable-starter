import {getMockAxios, getMockStore} from "../../../utils/mocks";
import {
    addComment, deleteComment, downVoteComment, editComment, fetchPostComments, upVoteComment} from "../../../../redux/actions";
import {COMMENTS_LOADED} from "../../../../redux/actions/comment";

describe('comment actions', () => {

    var mockComments = [{id: 1, parentId: 1}, {id: 2, parentId: 1}];
    var mockPosts = [{id:1}];

    var store, mock;

    beforeAll(()=>{
        mock = getMockAxios();
    });

    beforeEach(()=>{
        store = getMockStore();
        mock.reset();
    });

    it('creates COMMENTS_LOADED when fetchPostComments is called', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);

        const expectedActions = [
            { type: COMMENTS_LOADED, comments: mockComments},
        ];

        return store.dispatch(fetchPostComments(mockPosts[0].id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    });

    it('dispatch a fetchPostComments() when comment is added', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);
        mock.onPost('/comments').reply(200);

        const mockDispatch = jest.fn();

        const result = addComment(mockComments[0], mockPosts[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: COMMENTS_LOADED, comments: mockComments}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPostComments() when comment is edited', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);
        mock.onPut(`/comments/${mockComments[0].id}`).reply(200);

        const mockDispatch = jest.fn();

        const result = editComment(mockComments[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: COMMENTS_LOADED, comments: mockComments}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPostComments() when comment is deleted', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);
        mock.onDelete(`/comments/${mockComments[0].id}`).reply(200);

        const mockDispatch = jest.fn();

        const result = deleteComment(mockComments[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: COMMENTS_LOADED, comments: mockComments}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPostComments() when comment is downVoted', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);
        mock.onPost(`/comments/${mockComments[0].id}`).reply(200);

        const mockDispatch = jest.fn();

        const result = downVoteComment(mockComments[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: COMMENTS_LOADED, comments: mockComments}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

    it('dispatch a fetchPostComments() when comment is upVoted', () => {

        mock.onGet(`/posts/${mockPosts[0].id}/comments`).reply(200, mockComments);
        mock.onPost(`/comments/${mockComments[0].id}`).reply(200);

        const mockDispatch = jest.fn();

        const result = upVoteComment(mockComments[0]);

        return result(mockDispatch).then(() => {

            const expectedActions = [
                { type: COMMENTS_LOADED, comments: mockComments}
            ];

            return store.dispatch(mockDispatch.mock.calls[0][0]).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        });
    });

});

