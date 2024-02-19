import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useRegisterMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {PathsFull} from "../routes/Paths.ts";
import {Response} from "@components/FormLogin.tsx";
import {useLoader} from "@hooks/useLoader.ts";
import {useMenu} from "@hooks/useMenu.ts";
import {useAppDispatch, useAppSelector} from "@hooks/typed-react-redux-hooks.ts";
import {setFormRegister} from "@redux/formSlice.ts";

const FormRegistration = () => {
    const [authResponse, setAuthResponse] = useState<Response>({});
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const {formRegister} = useAppSelector((state) => state.formReducer);
    const [registerUser, {isSuccess, isError, isLoading}] = useRegisterMutation();
    const {setLoader} = useLoader();
    const {setCurrent} = useMenu();

    useEffect(() => {
        setCurrent && setCurrent('registration');
    }, []);

    useEffect(() => {
        setLoader && setLoader(isLoading);
    }, [isLoading]);

    useEffect(() => {
        (async () => {
            if (location.state?.key === 'resend') {
                const response = await registerUser(formRegister) as Response;
                console.log(response);
                setAuthResponse(response);
            }
        })()
    }, []);

    useEffect(() => {
        isSuccess && navigate(PathsFull.RESULT_SUCCESS, {state: {key: 'result_redirect'}})
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            const code = authResponse.error?.status;
            if (code === 409) {
                navigate(PathsFull.RESULT_ERROR_USER_EXIST, {state: {key: 'result_redirect'}})
            } else {
                navigate(PathsFull.RESULT_ERROR, {state: {key: 'result_redirect'}})
            }
        }
    }, [authResponse]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        }
        dispatch(setFormRegister(body));
        const response = await registerUser(body) as Response;
        console.log(response);
        setAuthResponse(response);
    };

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
        <Form
            className="form-auth"
            name="normal_login"
            initialValues={{remember: true}}
            onFinish={onFinish}
            form={form}
        >
            <Form.Item
                name="email"
                rules={[{type: 'email', message: '',}, {required: true, message: '',},]}
            >
                <Input addonBefore="e-mail" data-test-id="registration-email"/>
            </Form.Item>

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
                    placeholder="Пароль"
                    data-test-id="registration-password"
                    iconRender={iconRender}
                />
            </Form.Item>

            <Form.Item
                dependencies={['password']}
                name="confirm-password"
                rules={[{required: true, message: 'Пароли не совпадают',}, validatePassword,]}
            >
                <Input.Password
                    data-test-id="registration-confirm-password"
                    placeholder="Повторите пароль"
                    iconRender={iconRender}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        data-test-id="registration-submit-button">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormRegistration;
