import React from 'react';
import { Form, Input } from 'antd';
import classes from '../pages/calendar-page/calendar.module.less';
import { Exercise } from '@redux/api/trainingApi.ts';
import { areAllFieldsEmpty } from '../utils.ts';

export type ExerciseItemType = {
    exercise?: Partial<Exercise>;
};

export const ExerciseItem = ({ exercise }: ExerciseItemType) => {
    const [form] = Form.useForm();

    return (
        <div className={classes['drawer-exercise']}>
            <Form
                form={form}
                name='test'
                onChange={() => {
                    console.log(form.getFieldsValue(['name', 'approaches', 'weight', 'replays']));
                    console.log(
                        areAllFieldsEmpty(
                            form.getFieldsValue(['name', 'approaches', 'weight', 'replays']),
                        ),
                    );
                }}
            >
                <Form.Item name='name' noStyle>
                    <Input type='text' width='100%' />
                </Form.Item>
                Подходы
                <Form.Item name='approaches' noStyle>
                    <Input type='number' width='90px' />
                </Form.Item>
                Вес
                <Form.Item name='weight' noStyle>
                    <Input type='number' width='90px' />
                </Form.Item>
                Количество
                <Form.Item name='replays' noStyle>
                    <Input type='number' width='90px' />
                </Form.Item>
            </Form>
        </div>
    );
};
