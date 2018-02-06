import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(list: any, ...args) {
        if (_.first(args) !== undefined) {
            const sortProperty = args[0];
            const sortAsc = args.length === 2 ? args[1] : false;
            const sortedList = _.sortBy(list, sortProperty);
            return sortAsc ? sortedList : sortedList.reverse();
        } else {
            return list;
        }
    }
}
