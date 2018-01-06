import {PostDetails} from "../../../../components/posts/PostDetails";
import {shallow, mount} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";
import {getMockAxios, getMockStore} from "../../../utils/mocks";
import { Provider } from 'react-redux';
import {fillTextField} from "../../../utils/materialui";
import {deleteComment, upVotePost} from "../../../../redux/actions";

initMockDom();

describe('PostDetails component tests', () => {

    var post = {id: 1, body: 'TESTE', title: 'TITLE', author: 'Me', category: 'react'};
    var comments = [{id: 1, body: 'COMMENT', author: 'Me', parentId: 1}];

    var classes = {body:{}};
    var fetchPost, addComment, deletePost, editPost, historyPush;
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
        historyPush = jest.fn();
        mock.reset();
        store = getMockStore();
    });


    function reduxWrapper() {
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <PostDetails post={post} comments={comments} history={{push: historyPush}}
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

    it('renders and simulate invalid post', () => {
        const wrapper = mount(
            <PostDetails post={null} comments={comments}
                         classes={classes} match={routerMatch}
                         fetchPost={fetchPost} addComment={addComment}
                         deletePost={deletePost} editPost={editPost}/>
        );

        expect(wrapper.find("CircularProgress").length).toEqual(1);
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

    it('mount and simulate edit post invalid', () => {

        var wrapper = reduxWrapper();

        expect(fetchPost.mock.calls.length).toEqual(1);

        //click edit post and check dialog open
        wrapper.find("IconButton[aria-label=\"Edit Post\"]").simulate('click');
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Edit post");

        //cancel dialog and open it again
        wrapper.find("Button[aria-label=\"Cancel Post\"]").simulate('click');
        wrapper.find("IconButton[aria-label=\"Edit Post\"]").simulate('click');


        //fill the form
        fillTextField(wrapper, "Title", "");
        fillTextField(wrapper, "Text", "", true);

        wrapper.find("Button[aria-label=\"Save Post\"]").simulate('click');

        //Window still open and editPost not called
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Edit post");
        expect(editPost.mock.calls.length).toEqual(0);

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

    it('mount and simulate add invalid comment', () => {

        var wrapper = reduxWrapper();

        expect(fetchPost.mock.calls.length).toEqual(1);

        wrapper.find("Button[aria-label=\"Add Comment\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Create new comment");
        //close dialog
        wrapper.find("Button[aria-label=\"Cancel Comment\"]").simulate('click');

        //open it again
        wrapper.find("Button[aria-label=\"Add Comment\"]").simulate('click');
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Create new comment");

        //try to save without filling the form
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        //fill the form
        fillTextField(wrapper, "Author", "");
        fillTextField(wrapper, "Text", "", true);

        //save
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        expect(addComment.mock.calls.length).toEqual(0);

    });

    it('mount and simulate delete post', () => {

        var wrapper = reduxWrapper();

        expect(fetchPost.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Delete Post\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete post?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"No\"]").simulate('click');

        //click delete
        wrapper.find("IconButton[aria-label=\"Delete Post\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete post?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"Yes\"]").simulate('click');

        expect(deletePost.mock.calls.length).toEqual(1);
        expect(historyPush.mock.calls.length).toEqual(1);

    });

    it('mount and simulate delete post', () => {

        var wrapper = reduxWrapper();

        mock.onDelete("/comments/1").reply(200);
        mock.onGet("/posts/1").reply(200);
        mock.onGet("/posts/1/comments").reply(200, comments);

        wrapper.find("IconButton[aria-label=\"Delete comment\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete comment?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"No\"]").simulate('click');

        //click delete
        wrapper.find("IconButton[aria-label=\"Delete comment\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete comment?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"Yes\"]").simulate('click');

    });

    it('mount and simulate upVote and downVote post', () => {

        var wrapper = reduxWrapper();
        mock.onPost(`/posts/1`, {option: 'upVote'}).reply(200);
        mock.onPost(`/posts/1`, {option: 'downVote'}).reply(200);

        mock.onGet("/posts/1").reply(200, post);
        mock.onGet("/posts/1/comments").reply(200, comments);

        wrapper.find("IconButton[aria-label=\"Down Vote\"]").simulate('click');
        wrapper.find("IconButton[aria-label=\"Up Vote\"]").simulate('click');

    });

    it('mount and simulate upVote and downVote post', () => {

        var wrapper = reduxWrapper();
        mock.onPost(`/comments/1`, {option: 'upVote'}).reply(200);
        mock.onPost(`/comments/1`, {option: 'downVote'}).reply(200);
        mock.onGet("/posts/1").reply(200, post);
        mock.onGet("/posts/1/comments").reply(200, comments);

        wrapper.find("IconButton[aria-label=\"Up vote comment\"]").simulate('click');
        wrapper.find("IconButton[aria-label=\"Down vote comment\"]").simulate('click');

    });
});