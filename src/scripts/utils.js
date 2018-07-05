/**
 *  Utils
 * @author Sinver Aguilo <sinveraguilo@gmail.com>
 */

/**
 * Get a random floating point number between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 * @author Sinver Aguilo <sinveraguilo@gmail.com>
 */
export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Get a random integer between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 * @author Sinver Aguilo <sinveraguilo@gmail.com>
 */
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random boolean value.
 * 
 * @return {boolean} a random true/false
 * @author Sinver Aguilo <sinveraguilo@gmail.com>
 */
export function getRandomBool() {
    return Math.random() >= 0.5;
}