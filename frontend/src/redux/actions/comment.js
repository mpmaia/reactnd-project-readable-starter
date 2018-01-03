import {CONFIRM_POST_DELETE} from "./index";
import CommentsApi from "../../api/CommentsApi";
import {fetchPostComments} from "./post";
import {showError} from "./error";

export const COMMENTS_LOADED = 'COMMENTS_LOADED';
export const CONFIRM_COMMENT_DELETE = 'CONFIRM_COMMENT_DELETE';

export function addComment(comment, post) {
    return (dispatch) => {
        CommentsApi
            .addComment(comment, post)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function editComment(comment) {
    return (dispatch) => {
        CommentsApi
            .editComment(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function deleteComment(comment) {
    return (dispatch) => {
        CommentsApi
            .deleteComment(comment)
            .then(response => {
                dispatch(cancelDeleteComment());
                dispatch(fetchPostComments(comment.parentId));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function upVoteComment(comment) {
    return (dispatch) => {
        CommentsApi
            .upVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function downVoteComment(comment) {
    return (dispatch) => {
        CommentsApi
            .downVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function commentsLoaded(comments) {
    return { type: COMMENTS_LOADED, comments };
}

export function confirmDeletePost(post) {
    return { type: CONFIRM_POST_DELETE, post };
}

export function confirmDeleteComment(comment) {
    return { type: CONFIRM_COMMENT_DELETE, comment };
}

export function cancelDeleteComment() {
    return { type: CONFIRM_COMMENT_DELETE, comment: null };
}