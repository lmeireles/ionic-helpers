import {Pipe} from '@angular/core';
import {NumberHelper} from "../helpers/number-helper";

/**
 * Usage:
 *   value | customCurrency:symbol:thousandsSymbol:decimalSymbol:showDecimal
 * Examples:
 *   {{ 2000 |  customCurrency}}
 *   formats to: $ 2,000.00
 *
 *   {{ 2000.55 |  customCurrency:'R$':'.':','}}
 *   formats to: R$ 2.000,55
 *
 *   {{ 2000.55 |  customCurrency:'R$':'.':',':false}}
 *   formats to: R$ 2.000
 */
@Pipe({
    name: 'customCurrency'
})
export class CustomCurrencyPipe {
    transform(value: number, symbol: string = '$', thousandsSymbol: string = ',', decimalSymbol: string = '.', showDecimal: boolean = true) {
        if (typeof value == 'undefined' || value == null) {
            value = 0;
        }
        let valueArr = value.toString().split('.');
        valueArr[0] = NumberHelper.thousandsFormatter(valueArr[0], thousandsSymbol);

        let currency = symbol.trim() + ' ' + valueArr[0];

        if (showDecimal) {
            currency += decimalSymbol.trim();

            if (valueArr.length > 1) {
                currency += valueArr[1].length > 1 ? valueArr[1].substring(0, 2) : valueArr[1] + '0';
            } else {
                currency += '00';
            }
        }

        return currency;
    }
}
