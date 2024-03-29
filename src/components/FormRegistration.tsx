import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { useRegisterMutation } from '@redux/api/authApi.ts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PathsFull } from '../routes/Paths.ts';
import { useLoader } from '@hooks/useLoader.ts';
import { useMenu } from '@hooks/useMenu.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { ResponseError } from '@redux/interfaces.ts';
import { FormRegister, setFormRegister } from '@redux/formSlice.ts';
import classes from '@pages/auth-page/auth.module.less';
import { push } from 'redux-first-history';
import { ILoader } from '../hoc/LoaderProvider.tsx';
import { AuthMenu } from '@pages/auth-page/auth-page.tsx';

export const FormRegistration = () => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [form] = Form.useForm();
    const { formRegister } = useAppSelector((state) => state.formReducer);
    const [registerUser, { isSuccess, isError, isLoading, error, reset }] = useRegisterMutation();
    const { setLoader } = useLoader() as ILoader;
    const { setCurrent } = useMenu() as AuthMenu;
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        setCurrent('registration');
    }, [setCurrent]);

    useEffect(() => {
        setLoader(isLoading);
    }, [isLoading, setLoader]);

    useEffect(() => {
        (async () => {
            location.state?.key === 'resend' && (await registerUser(formRegister as FormRegister));
        })();
    }, [formRegister, location.state?.key, registerUser]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setFormRegister({}));
            dispatch(
                push(PathsFull.RESULT_SUCCESS, {
                    key: 'result_redirect',
                }),
            );
        }
        reset();
    }, [isSuccess, dispatch, reset]);

    useEffect(() => {
        if (error) {
            const code = (error as ResponseError).status;
            code === 409
                ? dispatch(
                      push(PathsFull.RESULT_ERROR_USER_EXIST, {
                          key: 'result_redirect',
                          from: location.pathname,
                      }),
                  )
                : dispatch(
                      push(PathsFull.RESULT_ERROR, {
                          key: 'result_redirect',
                          from: location.pathname,
                      }),
                  );
        }
    }, [isError, dispatch, error, location.pathname]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        };
        await registerUser(body);
    };

    const iconRender = (visible: boolean) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />);

    const onChange = () => {
        form.validateFields(['email', 'password', 'confirm-password'])
            .then(() => {
                setIsDisabled(false);
            })
            .catch(() => {
                setIsDisabled(true);
            });
    };

    return (
        <Form
            className='form-auth'
            name='registration'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
            onChange={onChange}
        >
            <div className={classes['register-input-wrap']}>
                <Form.Item
                    style={{ height: '70px' }}
                    name='email'
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: '',
                        },
                    ]}
                >
                    <Input size='large' addonBefore='e-mail' data-test-id='registration-email' />
                </Form.Item>

                <Form.Item
                    style={{ height: '86px' }}
                    name='password'
                    rules={[
                        {
                            required: true,
                            pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8}/g,
                        },
                    ]}
                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                >
                    <Input.Password
                        size='large'
                        placeholder='Пароль'
                        data-test-id='registration-password'
                        iconRender={iconRender}
                    />
                </Form.Item>

                <Form.Item
                    style={{ height: '86px' }}
                    dependencies={['password', 'email']}
                    name='confirm-password'
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value) {
                                    if (getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                } else {
                                    return form
                                        .validateFields(['email'])
                                        .then(() => {
                                            return Promise.reject(new Error(''));
                                        })
                                        .catch(() => {
                                            return Promise.resolve();
                                        });
                                }
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size='large'
                        data-test-id='registration-confirm-password'
                        placeholder='Повторите пароль'
                        iconRender={iconRender}
                    />
                </Form.Item>
            </div>
            <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                data-test-id='registration-submit-button'
                disabled={isDisabled}
            >
                Войти
            </Button>
            <Button type='default' className={'google-form-button'}>
                <GooglePlusOutlined /> Регистрация через Google
            </Button>
        </Form>
    );
};
