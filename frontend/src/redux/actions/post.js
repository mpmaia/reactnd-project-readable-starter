import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";
import {commentsLoaded} from "./comment";

export const POSTS_LOADED = 'POSTS_LOADED';
export const CONFIRM_POST_DELETE = 'CONFIRM_POST_DELETE';
export const POST_LOADED = 'POST_LOADED';
export const POSTS_ORDER_BY = 'POSTS_ORDER_BY';

export function fetchPosts() {
    return (dispatch) => {
        PostsApi
            .getPosts()
            .then(response => {
                dispatch(postsLoaded(response.data));
            });
    };
}

export function fetchPostsByCategory(category) {
    return (dispatch) => {
        PostsApi
            .getPostByCategory(category)
            .then(response => {
                dispatch(postsLoaded(response.data));
            });
    };
}

export function fetchPost(id) {
    return (dispatch) => {
        PostsApi
            .getPost(id)
            .then(response => {
                dispatch(postLoaded(response.data));
                dispatch(fetchPostComments(id));
            });
    };
}

export function fetchPostComments(id) {
    return (dispatch) => {
        CommentsApi
            .getPostComments(id)
            .then(response => {
                dispatch(commentsLoaded(response.data));
            });
    };
}

export function upVotePost(post) {
    return (dispatch) => {
        PostsApi
            .upVote(post)
            .then(response => {
                dispatch(fetchPosts());
            });
    };
}

export function downVotePost(post) {
    return (dispatch) => {
        PostsApi
            .downVote(post)
            .then(response => {
                dispatch(fetchPosts());
            });
    };
}

export function deletePost(post) {
    return (dispatch) => {
        PostsApi
            .deletePost(post)
            .then(response => {
                dispatch(cancelDeletePost());
                dispatch(fetchPosts());
            });
    };
}

export function addPost(post) {
    return (dispatch) => {
        PostsApi
            .addPost(post)
            .then(response => {
                dispatch(fetchPosts());
            });
    };
}

export function editPost(post, reloadAll = false) {
    return (dispatch) => {
        PostsApi
            .editPost(post)
            .then(response => {
                if(reloadAll) {
                    dispatch(fetchPosts());
                } else {
                    dispatch(fetchPost(post.id));
                }
            });
    };
}

export function postsLoaded(posts) {
    return { type: POSTS_LOADED, posts };
}

export function postOrderBy(field) {
    return { type: POSTS_ORDER_BY, field };
}

export function postLoaded(post) {
    return { type: POST_LOADED, post };
}

export function cancelDeletePost() {
    return { type: CONFIRM_POST_DELETE, post: null };
}