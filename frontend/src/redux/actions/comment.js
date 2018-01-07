import CommentsApi from "../../api/CommentsApi";
import {fetchPost, fetchPostComments} from "./post";
import {withError} from "./error";

export const COMMENTS_LOADED = 'COMMENTS_LOADED';

export function addComment(comment, post) {
    return (dispatch) => {
        return withError(dispatch, CommentsApi
            .addComment(comment, post)
            .then(response => {
                dispatch(fetchPost(post.id));
            }));
    };
}

export function editComment(comment) {
    return (dispatch) => {
        return withError(dispatch, CommentsApi
            .editComment(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }))
    };
}

export function deleteComment(comment) {
    return (dispatch) => {
        return withError(dispatch, CommentsApi
            .deleteComment(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }));
    };
}

export function upVoteComment(comment) {
    return (dispatch) => {
        return withError(dispatch, CommentsApi
            .upVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }));
    };
}

export function downVoteComment(comment) {
    return (dispatch) => {
        return withError(dispatch, CommentsApi
            .downVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            }));
    };
}

export function commentsLoaded(comments) {
    return { type: COMMENTS_LOADED, comments };
}