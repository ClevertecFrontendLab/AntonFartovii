import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography } from 'antd/';
import { useChangePasswordMutation } from '@redux/api/authApi.ts';
import { useLocation } from 'react-router-dom';
import { PathsFull } from '../../routes/Paths.ts';
import { useLoader } from '@hooks/useLoader.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { FormChangePassword, setFormChangePassword } from '@redux/formSlice.ts';
import classes from '@pages/auth-page/auth.module.less';
import { push, replace } from 'redux-first-history';

export const FlowChangePassword = () => {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [changePassword, { isSuccess, isError, isLoading, reset }] = useChangePasswordMutation();
    const { formChangePassword } = useAppSelector((state) => state.formReducer);
    const { setLoader } = useLoader();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoader && setLoader(isLoading);
    }, [isLoading, setLoader]);

    useEffect(() => {
        if (location.state?.key === 'resend') {
            (async () => {
                await changePassword(formChangePassword as FormChangePassword);
            })();
        }
    }, [changePassword, formChangePassword, location.state?.key]);

    const onFinish = async () => {
        const password = form.getFieldValue('password');
        const confirmPassword = form.getFieldValue('confirm-password');
        await changePassword({ password, confirmPassword });
    };

    useEffect(() => {
        if (isError) {
            dispatch(
                push(PathsFull.RESULT_ERROR_CHANGE_PASSWORD, {
                    key: 'result_redirect',
                    from: location.pathname,
                }),
            );
        }
        if (isSuccess) {
            dispatch(setFormChangePassword({}));
            dispatch(replace(PathsFull.RESULT_SUCCESS_CHANGE_PASSWORD, { key: 'result_redirect' }));
        }

        reset();
    }, [isError, isSuccess, dispatch, location.pathname, reset]);

    const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    const onChange = () => {
        form.validateFields(['password', 'confirm-password'])
            .then(() => {
                setIsDisabled(false);
            })
            .catch(() => {
                setIsDisabled(true);
            });
    };

    return (
        <div className={classes['change-password-wrap']}>
            <Typography.Title level={3}>Восстановление аккауанта</Typography.Title>
            <Form form={form} name='change_password' onFinish={onFinish} onChange={onChange}>
                <div className={classes['inputs-wrap']}>
                    <Form.Item
                        style={{ height: '86px' }}
                        name='password'
                        rules={[
                            {
                                required: true,
                                pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8}/g,
                                message: '',
                            },
                        ]}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            style={{ height: '40px' }}
                            placeholder='Новый пароль'
                            data-test-id='change-password'
                            iconRender={iconRender}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ height: '70px' }}
                        dependencies={['password']}
                        name='confirm-password'
                        rules={[
                            {
                                required: true,
                                message: 'Пароли не совпадают',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            style={{ height: '40px' }}
                            data-test-id='change-confirm-password'
                            placeholder='Повторите пароль'
                            iconRender={iconRender}
                        />
                    </Form.Item>
                </div>
                <Form.Item noStyle>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                        data-test-id='change-submit-button'
                        disabled={isDisabled}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
