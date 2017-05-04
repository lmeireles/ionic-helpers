import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import { Observable } from 'rxjs/Observable';
import {isArray} from "rxjs/util/isArray";
import {AlertController, LoadingController, Loading} from "ionic-angular/index";

/*
 Class for the BaseService provider.
 */
@Injectable()
export class BaseService {
    public loader: Loading;
    protected token: string = null;
    protected autoHideLoading: boolean = true;

    constructor(public http: Http,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                token: string = '') {

        if (token.length > 0) {
            console.log('token exists: ' + token);
            this.token = token;
        } else {
            this.token = null;
        }
    }

    // Service Helpers
    protected extractArray<T>(model: { new(): T ;}, res: Response): Array<T> {
        this.hideLoading();

        let arrayObj: Array<T> = Array<T>();
        if (res.status == 200 || res.status == 201 || res.status == 204) {
            let data = res.json();
            arrayObj = <Array<T>>data;
        }
        return arrayObj;
    }

    protected extractSingle<T>(model: { new(): T ;}, res: Response): T {
        this.hideLoading();

        let obj: T;
        if (res.status == 200 || res.status == 201 || res.status == 204) {
            let data = res.json();
            obj = <T>data;
        }
        return obj;
    }

    protected extractBoolean(res: Response): boolean {
        this.hideLoading();

        return res.status == 200 || res.status == 201 || res.status == 204;
    }

    protected extractString(res: Response): string {
        this.hideLoading();

        let str: string = '';
        if (res.status == 200 || res.status == 201 || res.status == 204) {
            str = res.json();
        }
        return str;
    }

    protected handleError(error: any, title: string | boolean = true) {
        console.log('handleError: ' + JSON.stringify(error));
        let errMsg = this.getErrorMsg(error, title);
        this.hideLoading();
        return Observable.throw(errMsg);
    }

    public getErrorMsg(error: any, title: string | boolean = true) {
        let errMsg = error.status === 0 ? 'Erro de Servidor' :
            (JSON.parse(error._body).message) ? JSON.parse(error._body).message :
                isArray(JSON.parse(error._body)) ? JSON.parse(error._body) :
                    error.status ? `${error.status} - ${error.statusText}` : 'Erro de Servidor';
        console.error(error);

        this.hideLoading().then(() => this.handleMessage(error.status, errMsg, title));

        return errMsg;
    }

    private handleMessage(status: number, msg: string | Array<any>, title: string | boolean = true) {
        let output = msg;
        if (isArray(msg) && msg.length > 0) {
            output = msg[0].message;
        }

        let msgTitle = '';

        if (title === false) {
            msgTitle = '';
        } else if (title === true) {
            msgTitle = 'Falha';
        } else if (typeof title != 'undefined' && (<string>title).length > 0) {
            msgTitle = <string>title;
        }

        this.showAlert(msgTitle, output.toString());
    }

    protected handleErrorCode(error: any) {

        let errMsg = error.status;

        this.hideLoading().then(() => '');

        return Observable.throw({
            statusCode: errMsg,
            body: error
        });
    }

    // !Service Helpers

    // helpers
    protected getHeaders(auth: boolean, token?: string): Headers {
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json; charset=utf-8'
        });

        if (auth && (token != null)) {
            headers.append('Authorization', 'Basic ' + token);
        } else if (auth && (this.token != null)) {
            headers.append('Authorization', 'Basic ' + this.token);
        }

        return headers;
    }

    protected getCustomHeaders(auth: boolean, obj: {}): Headers {
        let headers = new Headers(obj);

        if (auth && (this.token != null)) {
            headers.append('Authorization', 'Basic ' + this.token);
        }

        return headers;
    }

    protected arrayToRequestBody(data: Array<[string, any]>): string {
        this.hideLoading();

        let output: string = '';
        data.forEach((val, index) => {
            if (index > 0) {
                output += '&';
            }
            output += val[0] + '=' + val[1];
        });
        return output;
    }

    protected arrayToPrettyUrl(data: Array<[string, any]>): string {
        this.hideLoading();

        let output: string = '';
        data.forEach((val, index) => {
            output += '/' + val[1];
        });
        return output;
    }


    public showAlert(title: string, body: string): void {
        let opt: any = {
            subTitle: body,
            buttons: ['OK']
        };

        if (title.length > 0) {
            opt.title = title;
        }

        let alert = this.alertCtrl.create(opt);
        this.hideLoading().then(() => alert.present());
    }

    public presentLoading(): void {
        if (typeof this.loader !== 'undefined' && this.loader !== null) {
            this.loader.dismiss().then(
                () => {
                    this._presentLoading();
                }
            );
        } else {
            this._presentLoading();
        }
    }

    private _presentLoading() {
        this.loader = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Carregando'
        });
        this.loader.present();
    }

    public hideLoading(): Promise<any> {
        if (typeof this.loader !== 'undefined' && this.loader !== null && this.autoHideLoading) {
            return this.loader.dismiss();
        }
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }

    // !helpers
}
