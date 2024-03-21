import classes from './profile.module.less';
import type { UploadFile, UploadProps } from 'antd';
import { Button, Col, Form, Input, Modal, Row, Typography, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useWindowSize } from '@uidotdev/usehooks';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
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
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const { user } = useAppSelector((state) => state.userReducer);
    const size = useWindowSize();

    useEffect(() => {
        if (user && user.imgSrc) {
            setFileList([{ uid: '-1', name: 'avatar.png', status: 'done', url: user.imgSrc }]);
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
        action: 'https://marathon-api.clevertec.ru/upload-image',
        headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWZiMmM5Zjc3NTM2YjdlNDU2OWIwYTMiLCJlbWFpbCI6ImFudG9uQHJ6YS5ieSIsInJlYWR5Rm9ySm9pbnRUcmFpbmluZyI6ZmFsc2UsInNlbmROb3RpZmljYXRpb24iOmZhbHNlLCJpYXQiOjE3MTA5NTk3OTQsImV4cCI6MTc5NzM1OTc5NH0.hIFOHqgXta7qxLNo7OOgFePIVTMHIOuCNBUG2Qi4W5k`,
        },
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить фото пользователя</div>
        </button>
    );

    const handleChange: UploadProps['onChange'] = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    return (
        <section className={classes['profile-container']}>
            <Row style={{ width: '480px' }}>
                <Form form={form} onChange={onChange}>
                    <Row gutter={[0, 24]}>
                        <Typography.Title level={5}>Личная информация</Typography.Title>
                        <Row justify='space-between' wrap={false}>
                            <Col flex='104px'>
                                <Form.Item label='Upload' valuePropName='fileList' noStyle>
                                    <Upload
                                        {...props}
                                        maxCount={1}
                                        listType='picture-card'
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                    >
                                        {fileList.length === 0 && uploadButton}
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col flex='auto'>
                                <Row gutter={[0, 16]} style={{ width: '100%' }}>
                                    <Col span={24}>
                                        <Form.Item name='name' noStyle>
                                            <Input
                                                type='text'
                                                placeholder='Имя'
                                                data-test-id='profile-name'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item name='last-name' noStyle>
                                            <Input
                                                type='text'
                                                placeholder='Фамилия'
                                                data-test-id='profile-surname'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item name='date-of-birth' noStyle>
                                            <Input
                                                type='date'
                                                placeholder='Дата рождения'
                                                data-test-id='profile-birthday'
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            style={{ width: '100%' }}
                                            name='email'
                                            rules={[{ required: true, type: 'email', message: '' }]}
                                        >
                                            <Input
                                                size='large'
                                                addonBefore='e-mail'
                                                data-test-id='profile-email'
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            style={{ width: '100%' }}
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
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            style={{ width: '100%' }}
                                            dependencies={['password', 'email']}
                                            name='confirm-password'
                                            rules={[
                                                {
                                                    message: '',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (value) {
                                                            if (
                                                                getFieldValue('password') === value
                                                            ) {
                                                                return Promise.resolve();
                                                            }
                                                            return Promise.reject(
                                                                new Error('Пароли не совпадают'),
                                                            );
                                                        } else {
                                                            return form
                                                                .validateFields(['email'])
                                                                .then(() => {
                                                                    return Promise.reject(
                                                                        new Error(''),
                                                                    );
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
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Button
                                type='primary'
                                htmlType='submit'
                                data-test-id='profile-submit'
                                disabled={disabledButton}
                                onClick={() => {
                                    console.log(form.getFieldsValue());
                                }}
                            >
                                Сохранить изменения
                            </Button>
                        </Row>
                    </Row>
                </Form>
            </Row>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </section>
    );
};
