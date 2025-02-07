// utils.js - A comprehensive and advanced utility library

// ================================
// Array Utilities
// ================================

/**
 * Get the union of two arrays (no duplicates)
 * @param {Array} arr1 The first array
 * @param {Array} arr2 The second array
 * @return {Array} The union of arr1 and arr2
 */
function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}

/**
 * Remove elements from an array based on a condition
 * @param {Array} arr The array to process
 * @param {Function} callback The condition function to filter items
 * @return {Array} The filtered array
 */
function removeIf(arr, callback) {
    return arr.filter(item => !callback(item));
}

/**
 * Find the index of the last occurrence of a value in an array
 * @param {Array} arr The array to search
 * @param {*} value The value to search for
 * @return {number} The index of the last occurrence, or -1 if not found
 */
function lastIndexOf(arr, value) {
    return arr.lastIndexOf(value);
}

/**
 * Group an array of objects by a specific property
 * @param {Array} arr The array of objects
 * @param {string} key The key to group by
 * @return {Object} An object where keys are the values of the specified property
 */
function groupBy(arr, key) {
    return arr.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) result[groupKey] = [];
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Remove falsy values from an array
 * @param {Array} arr The array to process
 * @return {Array} The array without falsy values
 */
function removeFalsy(arr) {
    return arr.filter(Boolean);
}

// ================================
// Object Utilities
// ================================

/**
 * Create a deep clone of an object, handling circular references
 * @param {Object} obj The object to clone
 * @return {Object} The deep clone of the object
 */
function deepCloneWithCycles(obj) {
    const seen = new WeakMap();
    function clone(value) {
        if (value !== Object(value)) return value; // Return primitives directly
        if (seen.has(value)) return seen.get(value); // Return the reference if cyclic
        const copy = Array.isArray(value) ? [] : {};
        seen.set(value, copy);
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                copy[key] = clone(value[key]);
            }
        }
        return copy;
    }
    return clone(obj);
}

/**
 * Invert the keys and values of an object
 * @param {Object} obj The object to invert
 * @return {Object} A new object with keys and values inverted
 */
function invertObject(obj) {
    const inverted = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            inverted[obj[key]] = key;
        }
    }
    return inverted;
}

/**
 * Flatten an object (nested objects become flat properties with dot notation)
 * @param {Object} obj The object to flatten
 * @param {string} prefix The prefix for nested keys
 * @return {Object} The flattened object
 */
function flattenObject(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(result, flattenObject(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    return result;
}

// ================================
// String Utilities
// ================================

/**
 * Convert a string to title case (capitalize first letter of each word)
 * @param {string} str The string to convert
 * @return {string} The title-cased string
 */
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Convert a string to PascalCase (like camelCase, but starts with a capital letter)
 * @param {string} str The string to convert
 * @return {string} The PascalCased string
 */
function toPascalCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, match => match.toUpperCase())
        .replace(/\s+/g, '');
}

/**
 * Count the occurrences of a substring in a string
 * @param {string} str The string to search
 * @param {string} substr The substring to count
 * @return {number} The number of occurrences
 */
function countOccurrences(str, substr) {
    return (str.match(new RegExp(substr, 'g')) || []).length;
}

/**
 * Pad a string to a specified length, with a specified character
 * @param {string} str The string to pad
 * @param {number} length The target length
 * @param {string} [char=' '] The character to pad with
 * @return {string} The padded string
 */
function padString(str, length, char = ' ') {
    return str.length < length ? str.padStart((str.length + length) / 2, char).padEnd(length, char) : str;
}

// ================================
// Number Utilities
// ================================

/**
 * Format a number as currency
 * @param {number} num The number to format
 * @param {string} [currencySymbol='$'] The currency symbol
 * @param {string} [locale='en-US'] The locale for formatting
 * @return {string} The formatted currency string
 */
function formatCurrency(num, currencySymbol = '$', locale = 'en-US') {
    return `${currencySymbol}${num.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Generate a random float within a specified range
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @return {number} A random float between min and max
 */
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Get the factorial of a number
 * @param {number} n The number
 * @return {number} The factorial of n
 */
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Find the greatest common divisor of two numbers
 * @param {number} a The first number
 * @param {number} b The second number
 * @return {number} The greatest common divisor of a and b
 */
function gcd(a, b) {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// ================================
// Date Utilities
// ================================

/**
 * Get the start of the day (00:00:00) for a given date
 * @param {Date} date The date
 * @return {Date} The start of the day
 */
function startOfDay(date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
}

/**
 * Get the end of the day (23:59:59) for a given date
 * @param {Date} date The date
 * @return {Date} The end of the day
 */
function endOfDay(date) {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
}

/**
 * Format a date to a readable string (e.g., 'January 1, 2025')
 * @param {Date} date The date to format
 * @return {string} The formatted date
 */
function formatReadableDate(date) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * Get the number of weeks between two dates
 * @param {Date} start The start date
 * @param {Date} end The end date
 * @return {number} The number of weeks between the two dates
 */
function weeksBetween(start, end) {
    const diffTime = Math.abs(end - start);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
}

// ================================
// Miscellaneous Utilities
// ================================

/**
 * Perform a deep comparison of two values (including arrays and objects)
 * @param {*} value1 The first value
 * @param {*} value2 The second value
 * @return {boolean} True if the values are deeply equal, otherwise false
 */
function isDeepEqual(value1, value2) {
    if (value1 === value2) return true;
    if (typeof value1 !== 'object' || typeof value2 !== 'object' || value1 === null || value2 === null) {
        return false;
    }

    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!isDeepEqual(value1[key], value2[key])) return false;
    }

    return true;
}

/**
 * Generate a UUID (Universally Unique Identifier)
 * @return {string} A unique UUID string
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

/**
 * Memoize a function (cache the results for future calls)
 * @param {Function} fn The function to memoize
 * @return {Function} The memoized function
 */
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
}

// ================================
// Export all utilities
// ================================

module.exports = {
    union,
    removeIf,
    lastIndexOf,
    groupBy,
    removeFalsy,
    deepCloneWithCycles,
    invertObject,
    flattenObject,
    toTitleCase,
    toPascalCase,
    countOccurrences,
    padString,
    formatCurrency,
    randomFloat,
    factorial,
    gcd,
    startOfDay,
    endOfDay,
    formatReadableDate,
    weeksBetween,
    isDeepEqual,
    generateUUID,
    memoize
};
