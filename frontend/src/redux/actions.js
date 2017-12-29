import PostsApi from '../api/PostsApi';
import CategoriesApi from '../api/CategoriesApi';

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';
export const POSTS_LOADED = 'POSTS_LOADED';
export const CONFIRM_POST_DELETE = 'CONFIRM_POST_DELETE';

export function fetchPosts() {
    return (dispatch) => {
        PostsApi
            .getPosts()
            .then(response => {
                dispatch(postsLoaded(response.data));
            });
    };
}

export function upVote(post) {
    return (dispatch) => {
        PostsApi
            .upVote(post)
            .then(response => {
                dispatch(fetchPosts());
            });
    };
}

export function downVote(post) {
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
                dispatch(fetchPosts());
            });
    };
}

export function fetchCategories() {
    return (dispatch) => {
        CategoriesApi
            .getCategories()
            .then(response => {
                dispatch(categoriesLoaded(response.data));
            });
    };
}

export function categoriesLoaded(categories) {
    return { type: CATEGORIES_LOADED, categories };
}

export function postsLoaded(posts) {
    return { type: POSTS_LOADED, posts };
}

export function confirmDeletePost(post) {
    return { type: CONFIRM_POST_DELETE, post };
}

export function cancelDeletePost() {
    return { type: CONFIRM_POST_DELETE, post: null };
}