import {useEffect} from 'react';
import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {Typography} from "antd/";
import {useChangePasswordMutation} from "@redux/api/authApi.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";
import {useLoader} from "@hooks/useLoader.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";

const FlowChangePassword = () => {
    const [form] = Form.useForm();
    const [changePassword, {isSuccess, isError, isLoading, reset}] = useChangePasswordMutation();
    const {formChangePassword} = useAppSelector((state) => state.formReducer);
    const navigate = useNavigate();
    const {setLoader} = useLoader();
    const location = useLocation();

    useEffect(() => {
        setLoader && setLoader(isLoading)
    }, [isLoading]);

    useEffect(() => {
        if (location.state?.key === 'resend') {
            (async () => {
                await changePassword(formChangePassword);
            })();
        }
    }, []);

    const onFinish = async () => {
        const password = form.getFieldValue('password');
        const confirmPassword = form.getFieldValue('confirm-password');
        await changePassword({password, confirmPassword});
    };


    useEffect(() => {
        if (isError) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_CHANGE_PASSWORD, {state: {key: 'result_redirect'}})
        }
        if (isSuccess) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_SUCCESS_CHANGE_PASSWORD, {state: {key: 'result_redirect'}})
        }
        reset();
    }, [isError, isSuccess]);


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
