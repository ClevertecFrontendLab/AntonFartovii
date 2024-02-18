import {Button, Checkbox, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useCheckEmailMutation, useLoginMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {setRememberAuth} from "@redux/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";
import {useLoader} from "@hooks/useLoader.ts";

export type Response = {
    data?: {
        accessToken?: string,
    },
    error?: {
        data: {
            message?: string;
            error?: string;
            statusCode?: number;
        },
        status: number;
    }
}

const FormLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [authResponse, setAuthResponse] = useState<Response>({});
    const [form] = Form.useForm();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [login, loginStatus] = useLoginMutation();
    const [checkEmail, checkEmailStatus] = useCheckEmailMutation();
    const {setLoader} = useLoader();

    useEffect(() => {
        setLoader && setLoader(loginStatus.isLoading);
    }, [loginStatus.isLoading]);

    useEffect(() => {
        setLoader && setLoader(checkEmailStatus.isLoading);
    }, [checkEmailStatus.isLoading]);

    useEffect(() => {
        if (loginStatus.isSuccess) {
            dispatch(setRememberAuth(form.getFieldValue('remember')));
            navigate(Paths.MAIN);
        }
    }, [loginStatus.isSuccess]);

    useEffect(() => {
        if (loginStatus.isError) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_LOGIN, {state: {key: 'result_redirect'}})
        }
    }, [loginStatus.isError]);

    useEffect(() => {
        if (checkEmailStatus.isSuccess) {
            navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.FORGOT_PASSWORD, {
                state: {
                    key: "result_redirect",
                    email: form.getFieldValue('email')
                }
            });
        }
    }, [checkEmailStatus.isSuccess]);

    useEffect(() => {
        if (checkEmailStatus.isError) {
            console.log(authResponse);
            const code = authResponse.error?.status;
            const message = authResponse.error?.data?.message;
            if (code === 404 && message === "Email не найден") {
                navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_CHECK_EMAIL_NO_EXIST, {state: {key: 'result_redirect'}})
            } else {
                navigate(Paths.MAIN + Paths.RESULT + '/' + Paths.RESULT_ERROR_CHECK_EMAIL, {state: {key: 'result_redirect'}})
            }
        }
    }, [authResponse]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        }
        await login(body);
    };

    const onChangeForm = () => {
        form.validateFields(['email']).then(() => {
            setIsEmailValid(true);
        }).catch(() => {
            setIsEmailValid(false);
        });
    };

    const iconRender = (visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>);

    const forgotHandler = async () => {
        const email = form.getFieldValue('email');
        const response = await checkEmail({email}) as Response;
        console.log(response);
        setAuthResponse(response);
    }

    return (
        <>
            <Form
                className="form-auth"
                name="normal_login"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onChange={onChangeForm}
                form={form}
            >
                <Form.Item
                    name="email"
                    rules={[{type: 'email', message: '',}, {required: true, message: '',},]}
                >
                    <Input addonBefore="e-mail" data-test-id="login-email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input.Password placeholder="Пароль" iconRender={iconRender}
                                    data-test-id="login-password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox data-test-id="login-remember">Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button type="link" data-test-id="login-forgot-button" disabled={!isEmailValid}
                            onClick={forgotHandler}>
                        Забыли пароль
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                            data-test-id="login-submit-button">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
};

export default FormLogin;
