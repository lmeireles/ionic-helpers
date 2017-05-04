import {Component, Input, ViewChild, Renderer} from '@angular/core';

@Component({
    selector: 'image-load',
    template: `
        <img #img (load)="imgOnLoad()" src="" />
        <img *ngIf="isLoading" [src]="placeHolderSrc" />
`
})
export class ImageLoad {
    @Input() set src(src){
        this.isLoading = true;
        this._setSrc(src);
    };
    @Input() placeHolderSrc: string = '';

    @ViewChild('img') img;

    private isLoading: boolean = true;

    constructor(public renderer: Renderer) {}

    private imgOnLoad(): void {
        this.isLoading = false;
    }

    private _setSrc(src: string): void {
        this.img.nativeElement.setAttribute('src', src);
    }
}