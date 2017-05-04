import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'rating',
    template: `
        <template ngFor let-item [ngForOf]="_forRange" let-index="index">
            <ion-icon
                (click)="update(index + 1)" 
                [class.selected]="index < rate" class="rating-star" 
                name="{{_getName(index)}}" [color]="_getColor(index)"></ion-icon>
        </template>
    `
})
export class Rating {
    @Input() rate: number = 0;
    @Output('rateChange') private updateRate: EventEmitter<number> = new EventEmitter<number>();

    @Input() singleSelect: boolean = false;
    @Input()
    set range(range: number) {
        let arr = [];
        for(let i = 0; i <= range; i++){
            arr.push(i+1);
        }
        this._forRange = arr;
    }

    @Input() icon: string[] | string = 'star-outline';
    @Input() selectedIcon: string[] | string = 'star';
    @Input() color: string[] | string = 'danger';
    @Input() selectedColor: string[] | string = 'primary';

    private _forRange: number[] = [1,2,3,4,5];

    constructor() {

    }

    update(value) {
        this.rate = value;
        this.updateRate.emit(value);
    }

    private _getColor(index: number): string {
        let property = index < this.rate ? this.selectedColor : this.color;
        if(this.singleSelect) {
            property = index+1 === this.rate ? this.selectedColor : this.color;
        }
        return this._getProperty(property, index);
    }

    private _getName(index: number): string {
        let property = index < this.rate ? this.selectedIcon : this.icon;
        if(this.singleSelect) {
            property = index+1 === this.rate ? this.selectedIcon : this.icon;
        }
        return this._getProperty(property, index);
    }

    private _getProperty(property: string[] | string, index: number): string {
        return property.constructor === Array ? property[index] : <string>property;
    }
}