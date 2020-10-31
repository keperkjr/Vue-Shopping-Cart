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
var Utils = Utils || {};
(function(namespace) {
    'use strict';

    let exposed = namespace;

    /**
    * FUNCTION: arrayUnique
    * USE: Returns distinct elements from a sequence.
    * @param array: The array to remove duplicate elements from.
    * @param selector: Optional. A transform function to extract values from each element.
    * @return: An array that contains distinct elements from the source sequence.
    */
    exposed.arrayUnique = (array, selector = null) => {
        if (typeof selector !== 'function') {
            selector = (item) => item;
        }
        let value = array
            .reduce((acc, item) => acc.concat(selector.call(array, item)), [])
            .filter((value, index, self) => self.indexOf(value) === index);
        return value;
    }

    exposed.isNull = (item) => {
        return undefined === item || null === item;
    }

    exposed.isEmpty = (str) => {
        return exposed.isNull(str) || String(str).trim().length < 1;
    }

    /**
    * FUNCTION: arrayMax
    * USE: Returns the maximum value in a sequence.
    * @param array: Array to determine the maximum value of.
    * @param selector: Optional. A transform function to extract values from each element.
    * @return: The maximum value in the sequence.
    */
    exposed.arrayMax = (array, selector = null) => {
        let value = arrayMinMax(array, compareType.max, selector);
        return value;
    }

    /**
    * FUNCTION: arrayMin
    * USE: Returns the minimum value in a sequence.
    * @param array: Array to determine the minimum value of.
    * @param selector: Optional. A transform function to extract values from each element.
    * @return: The minimum value in the sequence.
    */
    exposed.arrayMin = (array, selector = null) => {
        let value = arrayMinMax(array, compareType.min, selector);
        return value;
    }

    let arrayMinMax = (array, type, selector = null) => {
        if (typeof selector !== 'function') {
            selector = (item) => item;
        }
        let value = array
            .map((item) => selector.call(array, item))
            .reduce((x, y) => compare(x, y, type) ? x : y);
        return value;
    }    

    let compare = (valueX, valueY, type) => {
        let result = valueX > valueY ? 1 : -1;
        if (type === compareType.min) {
            result *= -1;
        }
        return result > 0;
    }

    let compareType = Object.freeze({min: 1, max: 2});

    exposed.isValidEmail = (email) => {
        /* eslint-disable-next-line */
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    (function (factory) {
        /*global define */
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory();
        }
    }(function() { return namespace; }));     
}(Utils)); // http://programmingnotes.org/