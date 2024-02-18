import React, {useEffect, useState} from 'react';
import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Typography} from "antd/";
import {useChangePasswordMutation} from "@redux/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

const FlowChangePassword = () => {
    const [form] = Form.useForm();
    const [changePassword, {isSuccess, isError, reset}] = useChangePasswordMutation();
    const [response, setResponse] = useState<any>();
    const navigate = useNavigate();

    const onFinish = async () => {
        const password = form.getFieldValue('password');
        const confirmPassword = form.getFieldValue('confirm-password');
        const response = await changePassword({password, confirmPassword});
        setResponse(response);
    };

    useEffect(() => {
        if (isError) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_CHANGE_PASSWORD, {state: {key: 'result_redirect'}})
        }
        if (isSuccess) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_SUCCESS_CHANGE_PASSWORD, {state: {key: 'result_redirect'}})
        }
        return reset();
    }, [response]);


    const validatePassword = ({getFieldValue}) => ({
        validator(_, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Пароли не совпадают'));
        },
    });

    const iconRender = (visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>);

    return (
        <>
            <Typography.Title level={4}>
                Восстановление пароля
            </Typography.Title>
            <Form
                className="form-auth"
                name="normal_login"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8}/g,
                        message: ""
                    }]}
                    help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
                >
                    <Input.Password
                        placeholder="Новый пароль"
                        data-test-id="change-password"
                        iconRender={iconRender}
                    />
                </Form.Item>

                <Form.Item
                    dependencies={['password']}
                    name="confirm-password"
                    rules={[{required: true, message: 'Пароли не совпадают',}, validatePassword,]}
                >
                    <Input.Password
                        data-test-id="change-confirm-password"
                        placeholder="Повторите пароль"
                        iconRender={iconRender}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            data-test-id="change-submit-button">
                        Обновить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default FlowChangePassword;