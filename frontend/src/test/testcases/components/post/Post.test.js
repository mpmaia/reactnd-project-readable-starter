import {Post} from "../../../../components/posts/Post";
import {mount, shallow} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";

initMockDom();

describe('Post component tests', () => {

    var post = {body: 'TESTE', title: 'TITLE', author: 'Me', id: 1};
    var classes = {body:{}};
    var upVote, downVote, deletePost, editPost;

    beforeEach(()=>{
        upVote = jest.fn();
        downVote = jest.fn();
        deletePost = jest.fn();
        editPost = jest.fn();
    });

    it('renders and simulate clicks', () => {
        const wrapper = mount(
            <MemoryRouter>
                <Post classes={classes} showBody={true} post={post}
                      upVote={upVote} downVote={downVote} deletePost={deletePost} editPost={editPost} />
            </MemoryRouter>
        );
        expect(wrapper.find("CardContent Typography p").text()).toEqual('TESTE');

        wrapper.find("IconButton[aria-label=\"Edit Post\"]").simulate('click');
        expect(editPost.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Delete Post\"]").simulate('click');
        expect(deletePost.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Down Vote\"]").simulate('click');
        expect(downVote.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Up Vote\"]").simulate('click');
        expect(upVote.mock.calls.length).toEqual(1);
    });

});