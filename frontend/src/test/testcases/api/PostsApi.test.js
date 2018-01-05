import PostsApi from "../../../api/PostsApi";

describe('Test post api', () => {

    it('post validation', () => {

        var post = {
            title: 'TITLE',
            body: 'BODY',
            author: 'AUTHOR',
            category: 'CAT'
        };

        var callback = jest.fn();

        expect(PostsApi.validatePost(post)).toEqual(true);

        expect(PostsApi.validatePost({...post, title: ''}, callback)).toEqual(false);
        expect(callback).lastCalledWith("title");

        expect(PostsApi.validatePost({...post, body: ''}, callback)).toEqual(false);
        expect(callback).lastCalledWith("body");

        expect(PostsApi.validatePost({...post, author: ''}, callback)).toEqual(false);
        expect(callback).lastCalledWith("author");

        expect(PostsApi.validatePost({...post, category: ''}, callback)).toEqual(false);
        expect(callback).lastCalledWith("category");
    });
});