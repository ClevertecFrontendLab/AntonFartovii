import {Button, Form, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {useRegisterMutation} from "@redux/api/authApi.ts";
import {useEffect, useState} from "react";


const FormRegistration = () => {
    const [authResponse, setAuthResponse] = useState({});
    const [form] = Form.useForm();

    const [registerUser, {isLoading, isSuccess, isError}] = useRegisterMutation();

    useEffect(() => {

    }, [isSuccess]);

    useEffect(() => {

    }, [isError]);

    useEffect(() => {

    }, [isLoading]);

    const onFinish = async () => {
        const body = {
            email: form.getFieldValue('email'),
            password: form.getFieldValue('password'),
        }
        const response = await registerUser(body);
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
                <Input addonBefore="e-mail" defaultValue=""
                       data-test-id="login-email"/>
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
                <Button type="primary" htmlType="submit" className="login-form-button"
                        data-test-id="login-submit-button">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormRegistration;
