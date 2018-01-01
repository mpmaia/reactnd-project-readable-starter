

export function sortByKey(key) {
    return function(a, b) {

        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        if(typeof a[key] === 'string') {
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
