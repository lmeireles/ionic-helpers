import { NgModule } from '@angular/core';

import {CustomCurrencyPipe} from "./pipes/custom-currency-pipe";
import {SearchArrayPipe} from "./pipes/search-array";
import {TimePipe} from "./pipes/time.pipe";
import {ImageLoad} from "./components/image-load/image-load";
import {Rating} from "./components/rating/rating";
import {ScrollableTabs} from "./components/scrollable-tabs/scrollable-tabs";
import {MoneyMask} from "./directives/money-mask";

import {BaseService} from "./services/base/base-service";

@NgModule({
  declarations: [
    ImageLoad,
    Rating,
    ScrollableTabs,

    MoneyMask,

    CustomCurrencyPipe,
    SearchArrayPipe,
    TimePipe
  ],
  providers: [
    //BaseService
  ],
  bootstrap: []
})
export class IonicHelpersModule {}
