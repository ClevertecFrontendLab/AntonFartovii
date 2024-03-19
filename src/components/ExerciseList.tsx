import { Button, Checkbox, Form, Input } from 'antd';
import classes from '../pages/calendar-page/calendar.module.less';
import { Exercise, Training } from '@redux/api/trainingApi.ts';
import { useEffect, useState } from 'react';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../layout/MainLayout/MainLayout.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { addTemporaryDay, setTemporaryDay } from '@redux/calendarSlice.ts';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

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
            const fieldsValue = form.getFieldsValue() || {};
            fieldsValue.items &&
                fieldsValue.items.forEach((exercise: Exercise) => {
                    'name' in exercise && exercise.name !== '' && exercises.push(exercise);
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
    }, [
        drawerExercise,
        calendar,
        currentDate,
        currentEditTraining,
        currentTraining,
        dispatch,
        editMode,
        form,
        setChangeForm,
    ]);

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
                {(fields, { add, remove }) => {
                    const addFormGroup = () => {
                        add();
                        setDisabled(false);
                    };

                    const removeFormGroup = () => {
                        remove(indexes);
                        setIndexes([]);
                    };

                    return (
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
                                            <Form.Item
                                                name={[name, 'approaches']}
                                                {...restField}
                                                noStyle
                                            >
                                                <span className={classes['input-label']}>
                                                    Подходы
                                                </span>
                                                <Input
                                                    addonBefore={
                                                        <PlusOutlined width='10px' height='10px' />
                                                    }
                                                    type='number'
                                                    width='90px'
                                                    placeholder='1'
                                                    data-test-id={`modal-drawer-right-input-approach${index}`}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div
                                            className={classes['form-flex-col']}
                                            style={{ width: '10px' }}
                                        ></div>
                                        <div className={classes['form-flex-col']}>
                                            <span className={classes['input-label']}>Вес, кг</span>
                                            <Form.Item
                                                name={[name, 'weight']}
                                                {...restField}
                                                noStyle
                                            >
                                                <Input
                                                    type='number'
                                                    width='90px'
                                                    placeholder='0'
                                                    data-test-id={`modal-drawer-right-input-weight${index}`}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className={classes['form-flex-col']}>X</div>
                                        <div className={classes['form-flex-col']}>
                                            <span className={classes['input-label']}>
                                                Количество
                                            </span>
                                            <Form.Item
                                                name={[name, 'replays']}
                                                {...restField}
                                                noStyle
                                            >
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
                            <div className={classes['drawer-buttons-container']}>
                                <Button
                                    type='link'
                                    autoFocus={false}
                                    name='add'
                                    onClick={addFormGroup}
                                >
                                    <PlusOutlined /> Добавить ещё
                                </Button>
                                {editMode && (
                                    <Button
                                        type='text'
                                        name='remove'
                                        onClick={removeFormGroup}
                                        disabled={disabled}
                                    >
                                        <MinusOutlined /> Удалить
                                    </Button>
                                )}
                            </div>
                        </>
                    );
                }}
            </Form.List>
        </Form>
    );
};
