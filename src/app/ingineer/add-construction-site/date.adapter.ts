import { NativeDateAdapter, MatNativeDateModule } from "@angular/material";
import * as moment from 'moment';

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        moment.locale('ru-RU'); // Choose the locale
        var formatString = (displayFormat === 'input')? 'DD.MM.YYYY' : 'LLL';
        return moment(date).format(formatString);
    }
}