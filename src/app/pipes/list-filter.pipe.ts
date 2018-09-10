import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'listfilter'
})

@Injectable()
export class ListFilterPipe implements PipeTransform {
    transform(items: any[], criteria: any): any[] {
        if (items != null) {
            return items.filter(item => {
                for (let key in item) {
                    let lowerKey = '' + item[key];
                    if (lowerKey.toString().toLowerCase().includes(criteria.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
        }
        return;
    }
}
