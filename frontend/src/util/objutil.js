/**
 * Tests if a object is empty. Example: isEmptyObject({})===true
 * @param o
 * @returns {boolean}
 */
export function isEmptyObject(o) {
    return Object.keys(o).length === 0 && o.constructor === Object;
}