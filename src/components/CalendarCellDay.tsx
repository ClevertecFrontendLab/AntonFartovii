import { useEffect, useRef, useState } from 'react';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../layout/MainLayout/MainLayout.tsx';
import { formatDate } from '../utils.ts';
import { setCurrentDate, setCurrentTraining } from '@redux/calendarSlice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Moment } from 'moment';
import { Training } from '@redux/api/trainingApi.ts';
import { Badge } from 'antd';

export const CalendarCellDay = ({ date }: { date: Moment }) => {
    const refElement = useRef(null);
    const [day, setDay] = useState<number | null>(null);
    const { setCoords, setModalTraining, setModalExercise } = useMainContext() as MainContextType;
    const { userCalendar, trainingList } = useAppSelector((state) => state.calendarReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const day = new Date(date._d).getDate();
        setDay(day);
    }, []);

    const onSelectCalendar = () => {
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
            <div className='ant-picker-calendar-date-content'>
                {trainingList &&
                    trainingList.length > 0 &&
                    userCalendar[formatDate(date._d)] &&
                    userCalendar[formatDate(date._d)].map(({ name }: Training) => (
                        <Badge color='blue' text={name} />
                    ))}
            </div>
        </div>
    );
};
