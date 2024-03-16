import { UserCalendar } from '@redux/calendarSlice.ts';
import { Training } from '@redux/api/trainingApi.ts';

export const formatDate = (value: string | Date) => {
    const date = new Date(value);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
};

export const areAllFieldsEmpty = (obj: any): boolean => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
            return false;
        }
    }
    return true;
};

export const formatCalendar = (data: Training[]) => {
    const obj: UserCalendar = {};
    data.forEach((training: Training) => {
        const date = formatDate(training.date);
        const prevStare = obj[date] ? obj[date] : [];
        obj[date] = [...prevStare, training];
    });
    return obj;
};
//
// export const locale: PickerLocale = {
//     lang: {
//         placeholder: 'Выберите дату',
//         yearPlaceholder: 'Выберите год',
//         quarterPlaceholder: 'Выберите квартал',
//         monthPlaceholder: 'Выберите месяц',
//         weekPlaceholder: 'Выберите неделю',
//         rangePlaceholder: ['Начальная дата', 'Конечная дата'],
//         rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
//         rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
//         rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
//         shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
//         shortMonths: [
//             'Янв',
//             'Фев',
//             'Мар',
//             'Апр',
//             'Май',
//             'Июн',
//             'Июл',
//             'Авг',
//             'Сен',
//             'Окт',
//             'Ноя',
//             'Дек',
//         ],
//         ...locale,
//     },
//     timePickerLocale: {},
// };
