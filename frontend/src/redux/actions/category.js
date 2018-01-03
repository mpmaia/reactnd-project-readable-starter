import CategoriesApi from '../../api/CategoriesApi';
import {showError} from "./error";

export const CATEGORIES_LOADED = 'CATEGORIES_LOADED';

export function fetchCategories() {
    return (dispatch) => {
        CategoriesApi
            .getCategories()
            .then(response => {
                dispatch(categoriesLoaded(response.data.categories));
            }).catch( response => {
                dispatch(showError(response));
            });
    };
}

export function categoriesLoaded(categories) {
    return { type: CATEGORIES_LOADED, categories };
}