import * as moment from 'moment';

export class DateHelper {
    private static monthNamesAbr: Array<string> = [
        'JAN',
        'FEV',
        'MAR',
        'ABR',
        'MAI',
        'JUN',
        'JUL',
        'AGO',
        'SET',
        'OUT',
        'NOV',
        'DEZ',
    ];

    /**
     *
     * @param {Date} date
     * @param {string} format a mask where dd - day, mm - month, yyyy - full year
     * @returns {string}
     */
    public static toString(date: Date, format: string = 'dd/mm/yyyy'): string {
        let dd: any = date.getDate(),
            mm: any = date.getMonth() + 1,
            yyyy: any = date.getFullYear(),
            resultDate: string = format;

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        resultDate = resultDate.replace(new RegExp(/dd/g), dd);
        resultDate = resultDate.replace(new RegExp(/mm/g), mm);
        resultDate = resultDate.replace(new RegExp(/yyyy/g), yyyy);

        return resultDate;
    }

    /**
     *
     * @param {number} month
     * @returns {string}
     */
    public static getMonthNameAbr(month: number): string {
        if (this.monthNamesAbr[+month]) {
            return this.monthNamesAbr[+month];
        }
        return '-';
    }

    /**
     * @returns {string[]}
     */
    public static getMonthWithYear(): string[] {
        let lastTwoDigitalYear = [moment().format('YY'), moment().year(moment().year()+1).format('YY')],
            monthsShort = moment.monthsShort(),
            currentMonthsShort = [],
            result = [];

        for (let i = moment().month(); i <= 11; i++) {
            currentMonthsShort.push(moment.monthsShort(i));
        }

        lastTwoDigitalYear.forEach((y, i) => {
            if(i > 0) {
                result = [...result, ...monthsShort.map(value => value + ' ' + y)];
            } else {
                result = [...result, ...currentMonthsShort.map( value => value + ' ' + y)];
            }
        });
        return result;
    }

    /**
     * @returns {{weekDay: string, day: string}}
     */
    public static getDayAndWeek(date: any, numberOfMonths: number = 1): Array<{weekDay: string, day: string}> {
        let result: Array<{weekDay: string, day: string}> = [];
        let _date = moment(moment(date).year() + '-' + (moment(date).month()+1) + '-' + '01' + ' 00:00:00').isoWeekday(0),
            monthsShort = moment(date).format('MMM');

        _date.set('d', 1);

        for (let i = 0; i < 40 * numberOfMonths; i++) {
            if (_date.format('MMM') === monthsShort) {
                result[result.length] = {
                    weekDay: _date.format('ddd'),
                    day: _date.format('D')
                };
            }
            _date.add(1, 'd');
        }
        return result;
    }

    /**
     * @returns {{weeksAndDay: string[], weeksAndDayInterval: Array<{start: string, end: string}>}}
     */
    public static getIntervalDaysOnWeek(): {weeksAndDay: string[], weeksAndDayInterval: Array<{start: string, end: string}>} {
        let weeksAndDay: Array<string> = [];
        let weeksAndDayInterval: Array<{start: string, end: string}> = [];

        let date = moment().set('date', 1),
            begin = moment(date).isoWeekday(0),
            period = '',
            monthsShort = moment().format('MMM'),
            lastDay = moment().endOf('month').date();

        for (var i = 0; i < 40; i++) {
            var currentDay = parseInt(begin.format('DD'));

            if ((currentDay === 1 || begin.format('d') == '0') && begin.format('MMM') === monthsShort) {

                period = begin.format('DD');
            }

            if ((begin.format('d') == '6' || currentDay === lastDay) && begin.format('MMM') === monthsShort) {
                let finalText = period + '-' + begin.format('DD') + ' ' + monthsShort;

                weeksAndDay[weeksAndDay.length] = finalText;

                let obj2 = {
                    start: begin.format('YYYY') + '-' + begin.format('MM') + '-' + period,
                    end: begin.format('YYYY') + '-' + begin.format('MM') + '-' + begin.format('DD')
                };

                weeksAndDayInterval[weeksAndDayInterval.length] = obj2;
            }
            begin.add(1, 'd');
        }

        return {weeksAndDay: weeksAndDay, weeksAndDayInterval: weeksAndDayInterval};
    }
}
