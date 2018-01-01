import CategoriesApi from '../../api/CategoriesApi';

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';

export function fetchCategories() {
    return (dispatch) => {
        CategoriesApi
            .getCategories()
            .then(response => {
                dispatch(categoriesLoaded(response.data.categories));
            });
    };
}

export function categoriesLoaded(categories) {
    return { type: CATEGORIES_LOADED, categories };
}