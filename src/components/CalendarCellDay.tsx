import { FormEvent, useEffect, useRef, useState } from 'react';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../layout/MainLayout/MainLayout.tsx';
import { formatDate } from '../utils.ts';
import { setCurrentDate, setCurrentTraining } from '@redux/calendarSlice.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Moment } from 'moment';
import { Training } from '@redux/api/trainingApi.ts';
import { Badge } from 'antd';
import { useWindowSize } from '@uidotdev/usehooks';

export const CalendarCellDay = ({ date }: { date: Moment }) => {
    const refElement = useRef(null);
    const [day, setDay] = useState<number | string | null>(null);
    const [data, setData] = useState<Training[] | undefined>(undefined);
    const { setCoords, setModalTraining, setModalExercise, calendar, setDate, setCellRef } =
        useMainContext() as MainContextType;
    const size = useWindowSize();
    const dispatch = useAppDispatch();
    const dateString = date.format();

    useEffect(() => {
        const day = new Date(dateString).getDate().toString().padStart(2, '0');
        setDay(day);
    }, [dateString]);

    useEffect(() => {
        if (calendar[formatDate(date.format())]) {
            setData(calendar[formatDate(dateString)]);
        }
    }, [calendar, dateString, date]);

    const onSelectCalendar = (e: FormEvent) => {
        e.stopPropagation();
        setCellRef(refElement);
        setDate(new Date(dateString));
        const coords =
            refElement.current && (refElement.current as HTMLDivElement).getBoundingClientRect();
        setCoords(coords);
        setModalExercise(false);
        dispatch(setCurrentTraining(''));
        dispatch(setCurrentDate(formatDate(dateString)));
        setModalTraining(true);
    };

    return (
        <div
            ref={refElement}
            onClick={onSelectCalendar}
            className={`ant-picker-cell-inner ant-picker-calendar-date ${data ? 'with-data' : ''}`}
        >
            <div className='ant-picker-calendar-date-value'>{day}</div>
            {size.width && size.width > 800 && (
                <div className='ant-picker-calendar-date-content'>
                    {data &&
                        data.map(({ name }: Training) => (
                            <div key={name}>
                                <Badge color='blue' text={name} />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};
