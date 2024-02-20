import {Button, Checkbox, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";
import {useCheckEmailMutation, useLoginMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Paths, PathsFull} from "../routes/Paths.ts";
import {useLoader} from "@hooks/useLoader.ts";
import {useMenu} from "@hooks/useMenu.ts";
import {useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {ResponseError} from "@redux/interfaces.ts";

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
    const [isForgotDisabled, setIsForgotDisabled] = useState(false);
    const [formValid, setFormValid] = useState(true)
    const [login, loginStatus] = useLoginMutation();
    const [checkEmail, checkEmailStatus] = useCheckEmailMutation();
    const {formLogin} = useAppSelector((state) => state.formReducer);
    const {setLoader} = useLoader();
    const {setCurrent} = useMenu();
    const location = useLocation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.key === 'resend') {
            (async () => {
                await checkEmail(formLogin);
            })();
        }
    }, []);

    useEffect(() => {
        setCurrent && setCurrent('login');
    }, []);

    useEffect(() => {
        setLoader && setLoader(loginStatus.isLoading);
    }, [loginStatus.isLoading]);

    useEffect(() => {
        setLoader && setLoader(checkEmailStatus.isLoading);
    }, [checkEmailStatus.isLoading]);

    useEffect(() => {
        loginStatus.isSuccess && navigate('/main');
    }, [loginStatus.isSuccess]);

    useEffect(() => {
        loginStatus.isError && navigate(PathsFull.RESULT_ERROR_LOGIN, {state: {key: 'result_redirect'}})
    }, [loginStatus.isError]);

    useEffect(() => {
        checkEmailStatus.isSuccess &&
        navigate(Paths.CONFIRM_EMAIL, {
            state: {
                key: "result_redirect",
                email: form.getFieldValue('email')
            }
        });
    }, [checkEmailStatus.isSuccess]);

    useEffect(() => {
        if (checkEmailStatus.isError) {
            const code = (checkEmailStatus.error as ResponseError).status;
            const message = (checkEmailStatus.error as ResponseError).data?.message;
            (code === 404 && message === "Email не найден") ?
                navigate(PathsFull.RESULT_ERROR_CHECK_EMAIL_NO_EXIST, {state: {key: 'result_redirect'}}) :
                navigate(PathsFull.RESULT_ERROR_CHECK_EMAIL, {state: {key: 'result_redirect'}})
        }
    }, [checkEmailStatus.isError]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
            remember: form.getFieldValue('remember'),
        };
        form.getFieldValue('password').length > 7 && await login(body);
    };

    const onChange = () => {
        form.getFieldValue('email').length > 0 && setIsForgotDisabled(false);
    };

    const iconRender = (visible: boolean) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>);

    const forgotHandler = async () => {
        const email = form.getFieldValue('email');
        form.validateFields(['email']).then(async () => {
            await checkEmail({email});
        }).catch(() => {
            setIsForgotDisabled(true);
        });
    }

    return (
        <Form
            name="normal_login"
            initialValues={{remember: true}}
            onValuesChange={() => setFormValid(form.getFieldsError().some((item) => item.errors.length > 0))}
            onFinish={onFinish}
            onChange={onChange}
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
                rules={[{required: true, message: ''}]}
            >
                <Input.Password placeholder="Пароль" iconRender={iconRender}
                                data-test-id="login-password"
                />
            </Form.Item>
            <Form.Item>
                <div className="flex-row">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox data-test-id="login-remember">Запомнить меня</Checkbox>
                    </Form.Item>
                    <Button type="link" data-test-id="login-forgot-button"
                            disabled={isForgotDisabled}
                            onClick={forgotHandler}
                            className="forgot-form-button">
                        Забыли пароль?
                    </Button>
                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        data-test-id="login-submit-button"
                        disabled={formValid}>
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className={"google-form-button"}>
                    <GooglePlusOutlined/> Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
