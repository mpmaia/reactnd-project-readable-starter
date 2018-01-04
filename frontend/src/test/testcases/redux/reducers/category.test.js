import {categories} from "../../../../redux/reducers";
import {CATEGORIES_LOADED} from "../../../../redux/actions";

describe('categories reducer', () => {
    it('reducers should return the initial state', () => {
        expect(categories(undefined, {})).toEqual([]);
    });

    it('categories handle CATEGORIES_LOADED', () => {
        const startAction = {
            type: CATEGORIES_LOADED,
            categories: [{id:1}]
        };
        expect(categories([], startAction)).toEqual([{id:1}]);
    });
});