import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Time'
})
export class TimePipe implements PipeTransform {
    transform(value: number, args: any[]): string {
        if(value) {
            let minutes = Math.floor(+value / 60);
            let seconds = +value - minutes * 60;
            return this.str_pad_left(minutes,'0',2)+':'+this.str_pad_left(seconds,'0',2)
        } else {
            return '';
        }
    }

    str_pad_left(string,pad,length): string {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }
}
    