import { useEffect, useRef, useState } from 'react';
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
    const [day, setDay] = useState<number | null>(null);
    const [data, setData] = useState<Training[] | undefined>(undefined);
    const { setCoords, setModalTraining, setModalExercise, calendar, setDate } =
        useMainContext() as MainContextType;
    const size = useWindowSize();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const day = new Date(date._d).getDate();
        setDay(day);
    }, []);

    useEffect(() => {
        if (calendar[formatDate(date._d)]) {
            setData(calendar[formatDate(date._d)]);
        }
    }, [calendar]);

    const onSelectCalendar = () => {
        setDate(new Date(date._d));
        const coords =
            refElement.current && (refElement.current as HTMLDivElement).getBoundingClientRect();
        setCoords(coords);
        setModalExercise(false);
        dispatch(setCurrentTraining(''));
        dispatch(setCurrentDate(formatDate(date._d)));
        setModalTraining(true);
    };

    return (
        <div
            ref={refElement}
            onClick={onSelectCalendar}
            className='ant-picker-cell-inner ant-picker-calendar-date'
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
