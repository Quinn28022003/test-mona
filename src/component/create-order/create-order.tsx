import { Col, Form, Input, Modal, Radio, RadioChangeEvent, Row, Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EPaymentType } from '../../types/enums/order.enum';
import { IItem } from '../../types/interfaces/product.interface';
import TableProducts from '../table-products/table-products';
import { order } from '../../types/interfaces/order.interface';

const options: IItem[] = [];

for (let i = 10; i < 36; i++) {
    const value = i.toString(36) + i;
    options.push({
        label: `Product: ${value}`,
        value: uuidv4(),
    });
}

const sharedProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options,
    placeholder: 'Vui lòng chọn sản phẩm...',
    maxTagCount: 'responsive',
};

interface ICreateOrder {
    isOpen: boolean;
    toogle: () => void;
    setListOrders: React.Dispatch<React.SetStateAction<order[]>>
}

const CreateOrder = (props: ICreateOrder) => {

    const { isOpen, toogle, setListOrders } = props;

    const [value, setValue] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState<EPaymentType>();

    const [form] = Form.useForm();
    const selectProps: SelectProps = {
        value,
        onChange: setValue,
    };

    const onFinish = (values: any) => {
        setListOrders(prev => [...prev, values]);
        toogle();
    };

    const onChangeRadio = (e: RadioChangeEvent) => setPaymentMethod(e?.target?.value)

    useEffect(() => {
        if (!isOpen) form.resetFields();
    }, [isOpen])

    return (
        <Modal
            title="Lên đơn hàng cho khách"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={toogle}
            okText="Tạo"
            cancelText="Hủy"
            style={{ top: 20 }}
            width={1000}
        >
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                layout='vertical'
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="customer"
                            label="Tên khách hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên khách hàng'
                                }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email'
                                }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số điện thoại'
                                }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="products"
                            label="Sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn sản phẩm'
                                }]}
                        >
                            <Select {...sharedProps} {...selectProps} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="amountPaid"
                            label="Số tiền khách đưa"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập số tiền khách đưa'
                                }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="totalAmount"
                            label="Tổng số tiền"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item
                            name="paymentMethod"
                            label="Phương thức thanh toán"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn phương thức thanh toán'
                                }]}
                        >
                            <Radio.Group onChange={onChangeRadio} value={paymentMethod}>
                                <Radio value={EPaymentType.CASH}>Tiên mặt</Radio>
                                <Radio value={EPaymentType.CREDITCARD}>Thẻ tín dụng</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <TableProducts />
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateOrder