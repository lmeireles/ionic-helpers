import {Pipe} from "@angular/core";
import {StringHelper} from "../helpers/string-helper";
import {ObjectHelper} from "../helpers/object-helper";

/*
 *  Usage:
 *      array | searchArray:text:properties
 *  Examples:
 *      {{ array<string> |  searchArray:'Jhon Doe'}}
 *      {{ array<{desc: string, name: string, age: number}> |  searchArray:'Jhon Doe':['name', 'desc']}}
 *      {{ array<{desc: string, name: string, age: {month: string}}> |  searchArray:'Jhon Doe':['name', 'age.month']}}
 */
@Pipe({
    name: "searchArray"
})
export class SearchArrayPipe {
    transform(array: Array<any>, searchText: string, properties: string[] = []): Array<any> {
        if (array.length === 0) return [];

        searchText = StringHelper.removeDiacritics(searchText).toLocaleLowerCase().replace(/\s/gi, '');
        return array.filter(obj => {
            let result = false;

            if (properties.length > 0) {
                properties.forEach(
                    attr => {
                        let objAttr = ObjectHelper.getProperty(obj, attr);
                        if(typeof objAttr  !== 'undefined')
                            result = result || StringHelper.removeDiacritics(objAttr).toLocaleLowerCase().replace(/\s/gi, '').indexOf(searchText) > -1;
                    }
                );
            } else {
                result = result || StringHelper.removeDiacritics(obj.toString()).toLocaleLowerCase().replace(/\s/gi, '').indexOf(searchText) > -1;
            }

            return result;
        });
    }
}
