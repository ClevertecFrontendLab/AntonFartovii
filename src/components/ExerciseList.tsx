import { Button, Form, Input } from 'antd';
import classes from '../pages/calendar-page/calendar.module.less';
import { Exercise } from '@redux/api/trainingApi.ts';
import { Fragment, useEffect } from 'react';
import { useMainContext } from '@hooks/useMainContext.ts';
import { MainContextType } from '../layout/MainLayout/MainLayout.tsx';

export type ExerciseListType = {
    onSaveExercises: (exercises: Exercise[]) => void;
};

export const ExerciseList = ({ onSaveExercises }: ExerciseListType) => {
    const { drawerExercise } = useMainContext() as MainContextType;
    const [form] = Form.useForm();

    useEffect(() => {
        form.resetFields();
    }, [drawerExercise]);

    const onChange = () => {
        const items = form.getFieldsValue().items || [];
        onSaveExercises(items);
    };

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name='dynamic_form_complex'
            style={{ maxWidth: 600 }}
            autoComplete='off'
            initialValues={{ items: [{}] }}
            onChange={onChange}
        >
            <Form.List name='items'>
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Fragment key={key}>
                                <Form.Item name={[name, 'name']} noStyle {...restField}>
                                    <Input type='text' width='100%' placeholder='Упражнение' />
                                </Form.Item>
                                <div className={classes['form-flex-row']}>
                                    <div className={classes['form-flex-col']}>
                                        Подходы
                                        <Form.Item
                                            name={[name, 'approaches']}
                                            noStyle
                                            {...restField}
                                        >
                                            <Input type='number' width='90px' placeholder='1' />
                                        </Form.Item>
                                    </div>
                                    <div className={classes['form-flex-col']}>
                                        Вес
                                        <Form.Item name={[name, 'weight']} noStyle {...restField}>
                                            <Input type='number' width='90px' placeholder='0' />
                                        </Form.Item>
                                    </div>
                                    <div className={classes['form-flex-col']}>
                                        Количество
                                        <Form.Item name={[name, 'replays']} noStyle {...restField}>
                                            <Input type='number' width='90px' placeholder='3' />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Fragment>
                        ))}

                        <Button type='dashed' onClick={() => add()} block>
                            + Add Item
                        </Button>
                    </>
                )}
            </Form.List>
        </Form>
    );
};
