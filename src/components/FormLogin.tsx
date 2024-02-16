import {Button, Checkbox, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useLoginMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@hooks/typed-react-redux-hooks.ts";
import {setAccessToken} from "@redux/authSlice.ts";
import {useNavigate} from "react-router-dom";
import {Paths} from "../routes/Paths.ts";

type Response = {
    data?: {
        accessToken?: string,
    }
}
const FormLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [authResponse, setAuthResponse] = useState<Response>({
        data: {
            accessToken: '',
        }
    });
    const [form] = Form.useForm();
    const [login, {isLoading, isSuccess, isError}] = useLoginMutation();

    useEffect(() => {
        if (isSuccess) {
            const accessToken = authResponse?.data?.accessToken;
            accessToken && dispatch(setAccessToken(accessToken));
            navigate(Paths.MAIN);
        }
    }, [isSuccess]);

    useEffect(() => {
        console.log('error');
    }, [isError]);

    useEffect(() => {
        console.log('loading');
    }, [isLoading]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        }
        const response = await login(body) as Response;
        console.log(response);
        setAuthResponse(response);
    };

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
                rules={[{required: true, message: 'Please input your Username!'}]}
            >
                <Input addonBefore="e-mail" defaultValue="" data-test-id="login-email"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{required: true, message: 'Please input your Password!'}]}
            >
                <Input.Password
                    data-test-id="login-password"
                    iconRender={(visible) => (visible ? <EyeTwoTone/> :
                        <EyeInvisibleOutlined/>)}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox data-test-id="login-remember">Запомнить меня</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href=""
                   data-test-id="login-forgot-button">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        data-test-id="login-submit-button">
                    Войти
                </Button>
                Or <a href="">register now!</a>
            </Form.Item>
        </Form>
    );
};

export default FormLogin;
