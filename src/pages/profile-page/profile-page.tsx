import classes from './profile.module.less';
import type { UploadFile, UploadProps } from 'antd';
import {
    Alert,
    Button,
    ButtonProps,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Space,
    Typography,
    Upload,
} from 'antd';
import { CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import axios, { HttpStatusCode } from 'axios';
import { useUpdateUserMutation } from '@redux/api/userApi.ts';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';

const { error } = Modal;

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const ProfilePage = () => {
    const [form] = Form.useForm();
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [successAlert, setSuccessAlert] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { user } = useAppSelector((state) => state.userReducer);
    const { accessToken } = useAppSelector((state) => state.authReducer);
    const [updateUser, updateState] = useUpdateUserMutation();
    const screens = useBreakpoint();

    useEffect(() => {
        if (updateState.isSuccess) {
            setSuccessAlert(true);
            setDisabledButton(true);
        }
    }, [updateState.isSuccess]);

    useEffect(() => {
        if (user && user.imgSrc) {
            setFileList([{ uid: '-1', name: '', status: 'done', url: user.imgSrc }]);
        }
    }, [user]);

    const onChange = () => {
        form.validateFields([
            'name',
            'lat-name',
            'date-of-birth',
            'email',
            'password',
            'confirm-password',
        ])
            .then(() => {
                setDisabledButton(false);
            })
            .catch(() => {
                setDisabledButton(false);
            });
    };

    const props: UploadProps = {
        name: 'file',
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    };

    const uploadButton = () => {
        return screens.xs ? (
            <Space wrap={false} style={{ width: '100%' }}>
                Загрузить фото профиля:
                <Button className={classes['button-xs']} icon={<UploadOutlined />}>
                    Загрузить
                </Button>
            </Space>
        ) : (
            <button style={{ border: 0, background: 'none' }} type='button'>
                <PlusOutlined />
                <div className={classes['button-lg']}>Загрузить фото профиля</div>
            </button>
        );
    };

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        console.log(fileList);
        setFileList(fileList);
    };

    const handleCancel = () => setPreviewOpen(false);
    const removeImage = () => setFileList([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        const previewTitle = file.url
            ? file.url.substring(file.url.lastIndexOf('/') + 1)
            : file.name;
        setPreviewTitle(previewTitle);
    };

    const handleRequest = async (options) => {
        const { onSuccess, onError, file } = options;
        const uploadUrl = 'https://marathon-api.clevertec.ru/upload-image';
        const downloadUrl = 'https://training-api.clevertec.ru';
        const fmData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: `Bearer ${accessToken}`,
            },
        };
        fmData.append('file', file);
        try {
            const { data } = await axios.post(uploadUrl, fmData, config);
            onSuccess(file);
            setFileList([
                {
                    uid: '-1',
                    name: data.name,
                    status: 'done',
                    url: downloadUrl + data.url,
                },
            ]);
        } catch (err) {
            if (err.response.status === HttpStatusCode.Conflict) {
                const KILOBYTE = 1024;
                error({
                    title: 'Файл слишком большой',
                    content: (
                        <span data-test-id='modal-error-user-training-subtitle'>
                            Выберите файл размером [{(file.size / KILOBYTE / KILOBYTE).toFixed(2)}
                            ]&nbsp; МБ.
                        </span>
                    ),
                    icon: <CloseCircleOutlined />,
                    okText: 'Закрыть',
                    okButtonProps: {
                        'data-test-id': 'big-file-error-close',
                    } as ButtonProps,
                    centered: true,
                    width: 384,
                    closable: true,
                    maskClosable: true,
                    mask: false,
                    wrapClassName: 'calendar-wrapper-blur',
                });
                setDisabledButton(true);
            }
            onError({ err });
        }
    };

    const updateHandler = () => {
        const user = {};
        updateUser(user);
    };
    return (
        <section className={classes['profile-container']}>
            <Row style={{ maxWidth: '480px' }}>
                {user && (
                    <Form form={form} onChange={onChange} initialValues={{ email: user.email }}>
                        <Row gutter={[0, { xs: 20, sm: 24, lg: 24 }]} style={{ width: '100%' }}>
                            <Typography.Title level={5}>Личная информация</Typography.Title>
                            <Row className={classes['profile-top']}>
                                <Col
                                    data-test-id='profile-avatar'
                                    className={classes['profile-avatar']}
                                >
                                    <Form.Item label='Upload' valuePropName='fileList' noStyle>
                                        <Upload
                                            style={{ padding: '0px', margin: '0px' }}
                                            {...props}
                                            maxCount={1}
                                            listType={screens.xs ? 'picture' : 'picture-card'}
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                            customRequest={handleRequest}
                                            onRemove={removeImage}
                                        >
                                            {fileList.length === 0 && uploadButton()}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                                <Col>
                                    <Row gutter={[0, 16]} style={{ width: '100%' }}>
                                        <Col span={24}>
                                            <Form.Item name='name' style={{ height: '40px' }}>
                                                <Input
                                                    size='large'
                                                    type='text'
                                                    placeholder='Имя'
                                                    data-test-id='profile-name'
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item name='last-name' style={{ height: '40px' }}>
                                                <Input
                                                    size='large'
                                                    type='text'
                                                    placeholder='Фамилия'
                                                    data-test-id='profile-surname'
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                name='date-of-birth'
                                                style={{ height: '40px' }}
                                            >
                                                <DatePicker
                                                    size='large'
                                                    style={{ width: '100%' }}
                                                    placeholder='Дата рождения'
                                                    data-test-id='profile-birthday'
                                                    format={'DD.MM.YYYY'}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
                            <Row gutter={[0, 16]}>
                                <Form.Item
                                    style={{ width: '100%', height: '56px' }}
                                    name='email'
                                    rules={[{ required: true, type: 'email', message: '' }]}
                                >
                                    <Input
                                        size='large'
                                        addonBefore='e-mail:'
                                        data-test-id='profile-email'
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '100%', height: '70px' }}
                                    name='password'
                                    rules={[
                                        {
                                            pattern:
                                                /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8}/g,
                                        },
                                    ]}
                                    help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                >
                                    <Input.Password
                                        size='large'
                                        placeholder='Пароль'
                                        data-test-id='profile-password'
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: '100%', height: '70px' }}
                                    dependencies={['password', 'email']}
                                    name='confirm-password'
                                    rules={[
                                        {
                                            message: '',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value) {
                                                    if (getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error('Пароли не совпадают'),
                                                    );
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
                                        data-test-id='profile-repeat-password'
                                        placeholder='Повторите пароль'
                                    />
                                </Form.Item>
                            </Row>
                            <Row style={{ width: '100%' }}>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    data-test-id='profile-submit'
                                    disabled={disabledButton}
                                    onClick={updateHandler}
                                >
                                    Сохранить изменения
                                </Button>
                            </Row>
                        </Row>
                    </Form>
                )}
            </Row>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
            {successAlert && (
                <Alert
                    message={'Данные профиля успешно обновлены'}
                    type='success'
                    showIcon
                    data-test-id='alert'
                    closable
                />
            )}
        </section>
    );
};
