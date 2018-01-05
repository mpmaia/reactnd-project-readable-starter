import {PostDetails} from "../../../../components/posts/PostDetails";
import {shallow, mount} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";
import {getMockAxios, getMockStore} from "../../../utils/mocks";
import { Provider } from 'react-redux';
import {fillTextField} from "../../../utils/materialui";

initMockDom();

describe('PostDetails component tests', () => {

    var post = {body: 'TESTE', title: 'TITLE', author: 'Me', category: 'react'};
    var comments = [{id: 1, body: 'COMMENT', author: 'Me'}];

    var classes = {body:{}};
    var fetchPost, addComment, deletePost, editPost;
    var routerMatch = { params: { postId: 1 } };
    var store, mock;

    beforeAll(()=>{
        mock = getMockAxios();
    });

    beforeEach(()=>{
        fetchPost = jest.fn();
        addComment = jest.fn();
        deletePost = jest.fn();
        editPost = jest.fn();
        mock.reset();
        store = getMockStore();
    });


    function reduxWrapper() {
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <PostDetails post={post} comments={comments}
                                 classes={classes} match={routerMatch}
                                 fetchPost={fetchPost} addComment={addComment}
                                 deletePost={deletePost} editPost={editPost}/>
                </Provider>
            </MemoryRouter>
        );
        return wrapper;
    }


    it('renders and simulate post load', () => {
        const wrapper = shallow(
                <PostDetails post={post} comments={comments}
                             classes={classes} match={routerMatch}
                             fetchPost={fetchPost} addComment={addComment}
                             deletePost={deletePost} editPost={editPost}/>
        );

        expect(fetchPost.mock.calls.length).toEqual(1);


    });

    it('mount and simulate edit post', () => {

        var wrapper = reduxWrapper();

        expect(fetchPost.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Edit Post\"]").simulate('click');
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Edit post");

        //fill the form
        fillTextField(wrapper, "Title", "Title Value");
        fillTextField(wrapper, "Text", "Text Value", true);

        wrapper.find("Button[aria-label=\"Save Post\"]").simulate('click');

        expect(editPost.mock.calls.length).toEqual(1);

    });

    it('mount and simulate add comment', () => {

        var wrapper = reduxWrapper();

        expect(fetchPost.mock.calls.length).toEqual(1);

        wrapper.find("Button[aria-label=\"Add Comment\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Create new comment");

        //try to save without filling the form
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        //fill the form
        fillTextField(wrapper, "Author", "Author Value");
        fillTextField(wrapper, "Text", "Text Value", true);

        //save
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        expect(addComment.mock.calls.length).toEqual(1);
        expect(addComment.mock.calls[0][0].author).toEqual("Author Value")
        expect(addComment.mock.calls[0][0].body).toEqual("Text Value")

    });

});