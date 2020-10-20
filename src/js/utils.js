// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Oct 19, 2020
//    Taken From: http://programmingnotes.org/
//    File:  Utils.js
//    Description: Javascript that handles general utility functions
// ============================================================================
/**
* NAMESPACE: Utils
* USE: Handles general utility functions.
*/

/**
* FUNCTION: arrayUnique
* USE: Returns distinct elements from a sequence.
* @param array: The array to remove duplicate elements from.
* @param selector: Optional. A transform function to extract values from each element.
* @return: An array that contains distinct elements from the source sequence.
*/
export function arrayUnique(array, selector = null) {
    if (typeof selector !== 'function') {
        selector = (item) => item;
    }
    let value = array
        .reduce((acc, item) => acc.concat(selector.call(array, item)), [])
        .filter((value, index, self) => self.indexOf(value) === index);
    return value;
}