import { Button, Checkbox, Form, Input } from 'antd';
import classes from '../pages/calendar-page/calendar.module.less';
import { Exercise, Training } from '@redux/api/trainingApi.ts';
import { useEffect, useState } from 'react';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { addTemporaryDay, setTemporaryDay } from '@redux/calendarSlice.ts';

export const ExerciseList = () => {
    const { calendar, drawerExercise, editMode, setChangeForm } =
        useMainContext() as MainContextType;
    const [disabled, setDisabled] = useState<boolean>(true);
    const [indexes, setIndexes] = useState<number[]>([]);
    const [form] = Form.useForm();
    const { currentDate, temporaryDay, currentTraining, currentEditTraining } = useAppSelector(
        (state) => state.calendarReducer,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        setDisabled(true);
        if (!drawerExercise) {
            setChangeForm(form.isFieldsTouched());
            const exercises: Exercise[] = [];
            const fieldsValue = form.getFieldsValue();
            fieldsValue &&
                fieldsValue.items &&
                fieldsValue.items.forEach((training: Exercise) => {
                    if ('name' in training) {
                        if (training.name !== '') {
                            exercises.push(training);
                        }
                    }
                });
            if (editMode) {
                const prev = calendar[currentDate] || [];
                const filtered = prev.filter(
                    (training: Training) => training.name !== currentTraining,
                );
                filtered.push({ ...currentEditTraining, exercises } as Training);
                dispatch(setTemporaryDay(filtered));
            } else {
                dispatch(addTemporaryDay({ name: currentTraining, exercises }));
            }
        } else {
            form.resetFields();
        }
    }, [drawerExercise]);

    const setInitialValue = () => {
        const training =
            temporaryDay &&
            temporaryDay.find((training: Training) => training.name === currentTraining);
        const exercises = training?.exercises.map((item: Exercise) => {
            return {
                name: item.name,
                weight: item.weight,
                replays: item.replays,
                approaches: item.approaches,
            };
        });
        return editMode ? exercises : [{}];
    };

    const toggleIndexes = (value: number) => {
        if (Array.isArray(indexes)) {
            const items = indexes.includes(value)
                ? indexes.filter((index: number) => index !== value)
                : [...indexes, value];
            setIndexes(items);
        }
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name='dynamic_form_complex'
            autoComplete='off'
            style={{ maxWidth: 600, zIndex: '1000' }}
        >
            <Form.List name='items' initialValue={setInitialValue()} key='formList'>
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index: number) => (
                            <Form.Item noStyle key={key}>
                                <Form.Item name={[name, 'name']} {...restField} noStyle>
                                    <Input
                                        type='text'
                                        width='100%'
                                        key={'input_name' + key}
                                        name={'input_name' + key}
                                        placeholder='Упражнение'
                                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                                        autoFocus
                                        autoComplete='off'
                                        tabIndex={0}
                                        addonAfter={
                                            editMode && (
                                                <Checkbox
                                                    onChange={() => toggleIndexes(index)}
                                                    data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                />
                                            )
                                        }
                                    />
                                </Form.Item>
                                <div className={classes['form-flex-row']}>
                                    <div className={classes['form-flex-col']}>
                                        Подходы
                                        <Form.Item
                                            name={[name, 'approaches']}
                                            {...restField}
                                            noStyle
                                        >
                                            <Input
                                                type='number'
                                                width='90px'
                                                placeholder='1'
                                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={classes['form-flex-col']}>
                                        Вес
                                        <Form.Item name={[name, 'weight']} {...restField} noStyle>
                                            <Input
                                                type='number'
                                                width='90px'
                                                placeholder='0'
                                                data-test-id={`modal-drawer-right-input-weight${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className={classes['form-flex-col']}>
                                        Количество
                                        <Form.Item name={[name, 'replays']} {...restField} noStyle>
                                            <Input
                                                type='number'
                                                width='90px'
                                                placeholder='3'
                                                data-test-id={`modal-drawer-right-input-quantity${index}`}
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form.Item>
                        ))}

                        <Button
                            type='dashed'
                            autoFocus={false}
                            name='add'
                            onClick={() => {
                                add();
                                setDisabled(false);
                            }}
                        >
                            + Добавить ещё
                        </Button>
                        <Form.ErrorList errors={errors} />
                        {editMode && (
                            <Button
                                type='dashed'
                                name='remove'
                                onClick={() => {
                                    remove(indexes);
                                    setIndexes([]);
                                }}
                                disabled={disabled}
                            >
                                - Удалить
                            </Button>
                        )}
                    </>
                )}
            </Form.List>
        </Form>
    );
};
