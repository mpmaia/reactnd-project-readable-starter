/**
 * Sort function that compares object properties
 *
 * @param key Name of the object property
 * @returns {Function} to be supplied to array.sort
 */
export function sortByKey(key) {
    return function(a, b) {

        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        if(typeof a[key] === 'string' &&
           typeof b[key] === 'string') {
            var str1 = a[key].toUpperCase();
            var str2 = b[key].toUpperCase();
            if (str1 > str2) {
                return 1;
            } else if (str1 < str2) {
                return -1;
            }
        } else {
            if (a[key] > b[key]) {
                return 1;
            } else if (a[key] < b[key]) {
                return -1;
            }
        }

        return 0;
    }
}
