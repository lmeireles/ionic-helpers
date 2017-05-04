export class ObjectHelper {
    
    /**
     *
     * @param {object} object
     * @param {string} key The key or nested key in the object
     * @returns {any}
     */
    public static getProperty = function(object: any, key: string) {
        key = key.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        key = key.replace(/^\./, '');           // strip a leading dot
        var s = key.split('.');

        for (var i = 0, n = s.length; i < n; ++i) {
            if (typeof object[s[i]] !== 'undefined') {
                object = object[s[i]];
            } else {
                return;
            }
        }
        return object;
    }
}
