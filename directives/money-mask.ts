import {Directive, Attribute} from '@angular/core';
import { NgModel } from '@angular/forms';
@Directive({
    selector: '[money-mask]',
    host: {
        '(keyup)': 'onInputChange($event)'
    },
    providers: [NgModel]
})
export class MoneyMask {
    currency: string;
    modelValue: string;
    viewValue: string;

    constructor(
        public model: NgModel,
        @Attribute('money-mask') currency: string
    ) {
        this.currency = currency.replace(/\s+/g, '');
    }

    onInputChange(event) {
        if(event.key != "Backspace" &&
            event.keyCode != 8 &&
            event.keyCode != 37 &&
            event.keyCode != 38 &&
            event.keyCode != 39 &&
            event.keyCode != 40)
        {
            this.modelValue = this.getModelValue(event);
            let stringToFormat = this.modelValue;

            this.viewValue = this.format(stringToFormat);
            this.setCaretPosition(event, 2);
            return event.target.value = this.viewValue;
        }
    }

    format(val: string): string {
        return this.currency + ' ' + val;
    }

    getModelValue(event) {
        let modelValue: any = event.target.value;
        modelValue = modelValue.split('R$ ');
        if(modelValue.length > 0)
            modelValue = parseFloat(modelValue[modelValue.length - 1]); //.toFixed(2)
        else
            modelValue = 0.00;

        return modelValue;
    }

    setCaretPosition(event, caretPos) {
        event.target.value = event.target.value;
        // ^ this is used to not only get "focus", but
        // to make sure we don't have it everything -selected-
        // (it causes an issue in chrome, and having it doesn't hurt any other browser)

        if (event.target !== null) {

            if (event.target.createTextRange) {
                var range = event.target.createTextRange();
                range.move('character', caretPos);
                range.select();
                return true;
            }

            else {
                // (event.target.selectionStart === 0 added for Firefox bug)
                if (event.target.selectionStart || event.target.selectionStart === 0) {
                    event.target.focus();
                    event.target.setSelectionRange(caretPos, caretPos);
                    return true;
                }

                else  { // fail city, fortunately this never happens (as far as I've tested) :)
                    event.target.focus();
                    return false;
                }
            }
        }
    }
}