import { UserCalendar } from '@redux/calendarSlice.ts';
import { Training } from '@redux/api/trainingApi.ts';
import locale from 'antd/lib/date-picker/locale/en_US';
import { RefObject } from 'react';

type Size = {
    width: number | null;
    height: number | null;
};

export const getModalCoords = (cellRef: RefObject<HTMLDivElement>, size: Size) => {
    const coords = cellRef && cellRef.current && cellRef.current.getBoundingClientRect();
    if (coords) {
        if (size.width && coords.left) {
            if (size.width >= 800) {
                const value =
                    size.width > coords.left + 312
                        ? {
                              left: coords.left,
                              top: coords.top,
                          }
                        : {
                              left: coords.right - 312,
                              top: coords.top,
                          };
                return value;
            } else {
                return {
                    left: size.width / 2 - 156,
                    top: coords.top + 22,
                };
            }
        }
    }
    return undefined;
};
export const formatDate = (value: string | Date) => {
    const date = new Date(value);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;
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
export const calendarLocale = {
    lang: {
        ...locale.lang,
        locale: 'ru_RU',
        month: 'Месяц',
        year: 'Год',
        firstDay: 1,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...locale.timePickerLocale,
    },
};
