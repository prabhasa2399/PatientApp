import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilityService {

    constructor(
        
    ) { }

    convertDatePickerModelToString(model) {
        model.month = model.month.toString().length === 1 ? '0'+ model.month: model.month;
        model.day = model.day.toString().length === 1 ? '0'+ model.day: model.day;
        return model.year+ '-' +model.month+ '-' +model.day;
    }

    sortArray(arr: any, key: string) {
        arr.sort((a,b) => {
            const dateA: Date = new Date(a.resource[key]), dateB = new Date(b.resource[key]);
            return  dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
        });
    }

    getDateFromYear(year1: string, year2: string) {
        if(year1 < year2) {
            let dates : string[] = [];
            const date1 =  (parseInt(year1) - 1).toString() + '-12-31';
            const date2 = (parseInt(year2) + 1).toString() + '-01-01';
            dates.push(date1);
            dates.push(date2);
            return dates;
        }
    }
}