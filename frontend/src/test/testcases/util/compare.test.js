import {sortByKey} from "../../../util/compare";

describe('Test compare', () => {

    it('compare test', () => {

        var b = {
            id: 2,
            name: 'B'
        };

        var a = {
            id: 1,
            name: 'A',
            test: 'A'
        };

        var array = [
            b, a
        ];

        var array2 = [
            a, b
        ];

        expect(array.sort(sortByKey('id'))).toEqual([a , b]);
        expect(array.sort(sortByKey('name'))).toEqual([a , b]);
        expect(array2.sort(sortByKey('id'))).toEqual([a , b]);
        expect(array2.sort(sortByKey('name'))).toEqual([a , b]);
        expect(array.sort(sortByKey('test'))).toEqual([array[0], array[1]]);

    });
});