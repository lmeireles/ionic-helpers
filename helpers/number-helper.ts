export class NumberHelper {

    /**
     * @param {string} numberStr
     * @param {string} thousandsSeparator
     * @returns {string} sanitized string (replace any Diacritics with the equivalent sanitized char)
     */
    public static thousandsFormatter(numberStr: string, thousandsSeparator: string = ','): string {
        return (numberStr).replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    }

    /**
     * @param {number} number
     * @param {number} minSize
     * @returns {string} string with zero-based padding
     */
    public static pad(number: number, minSize: number = 2): string {
        let n_ = Math.abs(number),
            zeros = Math.max(0, minSize - Math.floor(n_).toString().length ),
            zeroString = Math.pow(10,zeros).toString().substr(1);
        if( number < 0 )
            zeroString = '-' + zeroString;
        return zeroString + n_;
    }
}
