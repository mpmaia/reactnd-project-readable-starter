import PostsApi from '../api/PostsApi';
import CategoriesApi from '../api/CategoriesApi';
import CommentsApi from '../api/CommentsApi';

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';
export const POSTS_LOADED = 'POSTS_LOADED';
export const CONFIRM_POST_DELETE = 'CONFIRM_POST_DELETE';
export const POST_LOADED = 'POST_LOADED';
export const COMMENTS_LOADED = 'COMMENTS_LOADED';
export const CONFIRM_COMMENT_DELETE = 'CONFIRM_COMMENT_DELETE';

export function fetchPosts() {
    return (dispatch) => {
        PostsApi
            .getPosts()
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
        PostsApi
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

export function addComment(comment, post) {
    return (dispatch) => {
        PostsApi
            .addComment(comment, post)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            });
    };
}

export function editComment(comment) {
    return (dispatch) => {
        PostsApi
            .editComment(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            });
    };
}

export function editPost(post) {
    return (dispatch) => {
        PostsApi
            .editPost(post)
            .then(response => {
                dispatch(fetchPost(post.id));
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
            });
    };
}

export function fetchCategories() {
    return (dispatch) => {
        CategoriesApi
            .getCategories()
            .then(response => {
                dispatch(categoriesLoaded(response.data.categories));
            });
    };
}

export function upVoteComment(comment) {
    return (dispatch) => {
        CommentsApi
            .upVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            });
    };
}

export function downVoteComment(comment) {
    return (dispatch) => {
        CommentsApi
            .downVote(comment)
            .then(response => {
                dispatch(fetchPostComments(comment.parentId));
            });
    };
}

export function categoriesLoaded(categories) {
    return { type: CATEGORIES_LOADED, categories };
}

export function postsLoaded(posts) {
    return { type: POSTS_LOADED, posts };
}

export function postLoaded(post) {
    return { type: POST_LOADED, post };
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

export function cancelDeletePost() {
    return { type: CONFIRM_POST_DELETE, post: null };
}

export function cancelDeleteComment() {
    return { type: CONFIRM_COMMENT_DELETE, comment: null };
}