import {Post} from "../../../../components/posts/Post";
import {mount, shallow} from "enzyme";
import React from "react";
import {MemoryRouter} from "react-router";
import initMockDom from "../../../utils/mockDom";
import {Comment} from "../../../../components/comments/Comment";
import {fillTextField} from "../../../utils/materialui";

initMockDom();

describe('Comment component tests', () => {

    var comment = {body: 'BODY', title: 'TITLE', author: 'Me'};
    var classes = {};
    var upVote, downVote, editComment, deleteComment;

    beforeEach(()=>{
        upVote = jest.fn();
        downVote = jest.fn();
        deleteComment = jest.fn();
        editComment = jest.fn();
    });

    it('renders and simulate clicks', () => {
        const wrapper = mount(
            <Comment classes={classes} comment={comment}
                  upVote={upVote} downVote={downVote} deleteComment={deleteComment} editComment={editComment} />
        );
        expect(wrapper.find("CardContent Typography p").text()).toEqual('BODY');

        wrapper.find("IconButton[aria-label=\"Down vote comment\"]").simulate('click');
        expect(downVote.mock.calls.length).toEqual(1);

        wrapper.find("IconButton[aria-label=\"Up vote comment\"]").simulate('click');
        expect(upVote.mock.calls.length).toEqual(1);
    });

    it('renders and simulate clicks', () => {
        const wrapper = mount(
            <Comment classes={classes} comment={null}
                     upVote={upVote} downVote={downVote} deleteComment={deleteComment} editComment={editComment} />
        );

        expect(wrapper.find("p").text()).toEqual('');

    });

    it('mount and simulate edit comment', () => {

        const wrapper = mount(
            <Comment classes={classes} comment={comment}
                     upVote={upVote} downVote={downVote} deleteComment={deleteComment} editComment={editComment} />
        );

        wrapper.find("IconButton[aria-label=\"Edit comment\"]").simulate('click');

        //check dialog created
        expect(wrapper.find("Dialog DialogTitle").text()).toEqual("Edit comment");

        //try to save without filling the form
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        //fill the form
        fillTextField(wrapper, "Text", "Text Value", true);

        //save
        wrapper.find("Button[aria-label=\"Save Comment\"]").simulate('click');

        expect(editComment).toHaveBeenCalled();

    });

});