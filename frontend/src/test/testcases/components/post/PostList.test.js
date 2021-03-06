import {PostList} from "../../../../components/posts/PostList";
import {shallow, mount} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";
import {getMockAxios, getMockStore} from "../../../utils/mocks";
import { Provider } from 'react-redux';
import {fillTextField, selectField} from "../../../utils/materialui";

initMockDom();

describe('PostList component tests', () => {

    var posts = [{id: 1, body: 'TESTE', title: 'POST1', author: 'Me', category: 'react'},
                 {id: 2, body: 'TESTE', title: 'POST2', author: 'Me', category: 'react'}]
    var comments = [{id: 1, body: 'COMMENT', author: 'Me', parentId: 1}];
    var categories = [{id: 1, name: 'react'}];
    var classes = {body:{}};
    var fetchPosts, fetchPostsByCategory, deletePost, editPost, postOrderBy, addPost;
    var routerMatch = { params: { } };
    var store, mock;

    beforeAll(()=>{
        mock = getMockAxios();
    });

    beforeEach(()=>{
        fetchPosts = jest.fn();
        fetchPostsByCategory = jest.fn();
        deletePost = jest.fn();
        editPost = jest.fn();
        postOrderBy = jest.fn();
        addPost = jest.fn();
        mock.reset();
        store = getMockStore({categories: categories, postOrderBy: 'author'});
    });


    function reduxWrapper() {
        const wrapper = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <PostList posts={posts} postOrderByField={'author'}
                                 classes={classes}
                                 fetchPosts={fetchPosts} fetchPostsByCategory={fetchPostsByCategory}
                                 deletePost={deletePost} editPost={editPost} postOrderBy={postOrderBy}
                                 addPost={addPost}/>
                </Provider>
            </MemoryRouter>
        );
        return wrapper;
    }


    it('renders and simulate post load', () => {
        const wrapper = shallow(
            <PostList posts={posts} postOrderByField={'author'}
                      classes={classes}
                      fetchPosts={fetchPosts} fetchPostsByCategory={fetchPostsByCategory}
                      deletePost={deletePost} editPost={editPost} postOrderBy={postOrderBy}/>
        );

        expect(fetchPosts.mock.calls.length).toEqual(1);
    });

    it('renders and simulate post load by category', () => {
        const wrapper = shallow(
            <PostList posts={posts} postOrderByField={'author'}
                      classes={classes} match={routerMatch}
                      fetchPosts={fetchPosts} fetchPostsByCategory={fetchPostsByCategory}
                      deletePost={deletePost} editPost={editPost} postOrderBy={postOrderBy}/>
        );

        wrapper.setProps({match: { params: { category: 'test' }}});

        expect(fetchPostsByCategory).toBeCalledWith('test');
    });

    it('mount and simulate add post', () => {

        var wrapper = reduxWrapper();

        expect(fetchPosts.mock.calls.length).toEqual(1);

        wrapper.find("Button[aria-label=\"New Post\"]").simulate('click');
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Create new post");

        //fill the form
        fillTextField(wrapper, "Title", "Title Value");
        fillTextField(wrapper, "Text", "Text Value", true);
        fillTextField(wrapper, "Author", "Author Value");
        selectField(wrapper, "Category", "react");

        wrapper.find("Button[aria-label=\"Save Post\"]").simulate('click');

        expect(addPost.mock.calls.length).toEqual(1);
    });

    it('mount and simulate edit post', () => {

        var wrapper = reduxWrapper();

        expect(fetchPosts.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Edit Post\"]").first().simulate('click');
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Edit post");

        //close dialog
        wrapper.find("Button[aria-label=\"Cancel Post\"]").simulate('click');

        //open it again
        wrapper.find("IconButton[aria-label=\"Edit Post\"]").first().simulate('click');

        //fill the form
        fillTextField(wrapper, "Title", "Title Value");
        fillTextField(wrapper, "Text", "Text Value", true);

        wrapper.find("Button[aria-label=\"Save Post\"]").simulate('click');

        expect(editPost.mock.calls.length).toEqual(1);
    });

    it('mount and simulate delete post', () => {

        var wrapper = reduxWrapper();

        wrapper.find("IconButton[aria-label=\"Delete Post\"]").first().simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete post?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"No\"]").simulate('click');

        //click delete
        wrapper.find("IconButton[aria-label=\"Delete Post\"]").first().simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Delete post?");

        //cancel delete
        wrapper.find("Dialog Button[aria-label=\"Yes\"]").simulate('click');

        expect(deletePost.mock.calls.length).toEqual(1);

    });

});