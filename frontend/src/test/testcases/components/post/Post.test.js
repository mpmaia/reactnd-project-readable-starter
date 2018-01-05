import {Post} from "../../../../components/posts/Post";
import {mount, shallow} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import dom from "../../../utils/mockDom";

describe('Post component tests', () => {

    var post = {body: 'TESTE', title: 'TITLE', author: 'Me'};
    var classes = {body:{}};
    var upVote, downVote, deletePost, editPost;

    beforeEach(()=>{
        upVote = jest.fn();
        downVote = jest.fn();
        deletePost = jest.fn();
        editPost = jest.fn();
    });

    it('renders', () => {
        const wrapper = mount(
            <MemoryRouter>
                <Post classes={classes} showBody={true} post={post}
                      upVote={upVote} downVote={downVote} deletePost={deletePost} editPost={editPost} />
            </MemoryRouter>
        );
        expect(wrapper.find("CardContent Typography p").text()).toEqual('TESTE');
    });

});