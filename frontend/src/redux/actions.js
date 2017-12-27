export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';

export function fetchCategories() {
    return { type: FETCH_CATEGORIES };
}

export function fetchPosts() {
    return { type: FETCH_POSTS };
}