import {Button, Checkbox, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined} from "@ant-design/icons";
import {useCheckEmailMutation, useLoginMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useLoader} from "@hooks/useLoader.ts";
import {useMenu} from "@hooks/useMenu.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import classes from "@pages/auth-page/auth.module.less";
import {FormLogin as IFormLogin} from "@redux/formSlice.ts";
import {push} from "redux-first-history";
import {PathsFull} from "../routes/Paths.ts";
import {ResponseError} from "@redux/interfaces.ts";

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
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.state?.key === 'resend') {
            (async () => {
                await checkEmail(formLogin as IFormLogin);
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
        const email = form.getFieldValue('email');
        checkEmailStatus.isSuccess &&
        dispatch(push(PathsFull.CONFIRM_EMAIL, {
            key: "result_redirect",
            email,
            from: location.pathname
        }));
    }, [checkEmailStatus.isSuccess]);

    useEffect(() => {
        if (checkEmailStatus.isError) {
            const code = (checkEmailStatus.error as ResponseError).status;
            const message = (checkEmailStatus.error as ResponseError).data?.message;
            (code === 404 && message === "Email не найден") ?
                dispatch(push(PathsFull.RESULT_ERROR_CHECK_EMAIL_NO_EXIST, {
                    key: 'result_redirect',
                    from: location.pathname
                })) :
                dispatch(push(PathsFull.RESULT_ERROR_CHECK_EMAIL, {
                    key: 'result_redirect',
                    from: location.pathname
                }))
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
        form.validateFields(['email']).then(() => {
            setFormValid(false);
        }).catch(() => {
            setFormValid(true);
        })
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

    const googleHandler = () => {
        window.location.href = `https://marathon-api.clevertec.ru/auth/google`
    }

    return (
        <Form
            style={{marginBottom: "81px"}}
            name="login"
            initialValues={{remember: false}}
            onFinish={onFinish}
            onChange={onChange}
            form={form}
        >
            <div className={classes["login-input-wrap"]}>
                <Form.Item
                    style={{height: '70px'}}
                    name="email"
                    rules={[{type: 'email', message: '',}, {required: true, message: '',},]}
                >
                    <Input size="large" addonBefore="e-mail" data-test-id="login-email"/>
                </Form.Item>

                <Form.Item
                    style={{height: '86px'}}
                    name="password"
                    rules={[{required: true, message: ''}]}
                >
                    <Input.Password size="large" placeholder="Пароль" iconRender={iconRender}
                                    data-test-id="login-password"
                    />
                </Form.Item>
            </div>
            <Form.Item noStyle>
                <div className={classes["flex-row"]}>
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
            <Form.Item noStyle>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        data-test-id="login-submit-button"
                        disabled={formValid}>
                    Войти
                </Button>
            </Form.Item>
            <Form.Item>
                <Button type="default" className={"google-form-button"} onClick={googleHandler}>
                    <GooglePlusOutlined/> Войти через Google
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
