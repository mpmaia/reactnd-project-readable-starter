import PostsApi from '../api/PostsApi';
import CategoriesApi from '../api/CategoriesApi';

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';
export const POSTS_LOADED = 'POSTS_LOADED';

export function fetchPosts() {
    return (dispatch) => {
        PostsApi
            .getPosts()
            .then(response => {
                dispatch(postsLoaded(response.data));
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