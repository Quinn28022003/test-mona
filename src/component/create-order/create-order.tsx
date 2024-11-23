import { DeleteOutlined } from '@ant-design/icons';
import { Col, Form, Input, Modal, Radio, RadioChangeEvent, Row, Select, SelectProps, Table, TableProps, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EPaymentType } from '../../types/enums/order.enum';
import { EProductFields } from '../../types/enums/product.enum';
import { order } from '../../types/interfaces/order.interface';
import { IItem, IPromoCode, product } from '../../types/interfaces/product.interface';
import { formatDecimalPrecision } from '../../utils/decimal-precision';

const discountCodes: IPromoCode[] = [
    {
        id: 'PROMO10',
        type: 'percentage', // Giảm theo phần trăm
        value: 10, // Giảm 10%
    },
    {
        id: 'PROMO50',
        type: 'flat', // Giảm theo số tiền
        value: 50000, // Giảm 50.000 VND
    },
    {
        id: 'PROMO25',
        type: 'percentage', // Giảm theo phần trăm
        value: 25, // Giảm 25%
    },
    {
        id: 'PROMO100',
        type: 'flat', // Giảm theo số tiền
        value: 100000, // Giảm 100.000 VND
    },
    {
        id: 'PROMO15',
        type: 'percentage', // Giảm theo phần trăm
        value: 15, // Giảm 15%
    },
    {
        id: 'PROMO20',
        type: 'flat', // Giảm theo số tiền
        value: 20000, // Giảm 20.000 VND
    },
    {
        id: 'PROMO30',
        type: 'percentage', // Giảm theo phần trăm
        value: 30, // Giảm 30%
    },
    {
        id: 'PROMO200',
        type: 'flat', // Giảm theo số tiền
        value: 200000, // Giảm 200.000 VND
    },
    {
        id: 'PROMO5',
        type: 'percentage', // Giảm theo phần trăm
        value: 5, // Giảm 5%
    },
    {
        id: 'PROMO75',
        type: 'flat', // Giảm theo số tiền
        value: 75000, // Giảm 75.000 VND
    },
    {
        id: 'PROMO40',
        type: 'percentage', // Giảm theo phần trăm
        value: 40, // Giảm 40%
    },
    {
        id: 'PROMO60',
        type: 'flat', // Giảm theo số tiền
        value: 60000, // Giảm 60.000 VND
    }
];

const discountCodesMap = new Map<string, IPromoCode>(
    discountCodes.map(item => [item.id, item])
);

interface ICreateOrder {
    type: 'create' | 'update'
    isOpen: boolean;
    toogle: () => void;
    setListOrders: React.Dispatch<React.SetStateAction<order[]>>;
    record?: order | undefined;
    listProducts: product[];
}

const CreateOrder = (props: ICreateOrder) => {

    const { type, isOpen, toogle, setListOrders, record, listProducts } = props;

    const [totalBalance, setTotalBalance] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [value, setValue] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState<EPaymentType>();
    const [productsSelected, setProductsSelected] = useState<Record<string, product>>({});
    const [form] = Form.useForm();
    const selectProps: SelectProps = {
        value,
        onChange: setValue,
    };
    const options: IItem[] = listProducts?.map(item => ({ label: item.name, value: item.id }))
    const [showNotices, setShowNotices] = useState<boolean>(false);

    const sharedProps: SelectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        options,
        placeholder: 'Vui lòng chọn sản phẩm...',
        maxTagCount: 'responsive',
    };

    const onFinish = (values: any) => {
        if (type === 'create') {
            setListOrders(prev => [...prev, { id: uuidv4(), ...values, products: productsSelected, amountPaid: totalAmount }]);
        }
        toogle();
    };

    const onChangeRadio = (e: RadioChangeEvent) => setPaymentMethod(e?.target?.value)

    const handleChange = (selectedProductIds: string[]) => {
        const updatedProducts: Record<string, product> = { ...productsSelected };

        Object.keys(updatedProducts).forEach((id) => {
            if (!selectedProductIds.includes(id)) {
                delete updatedProducts[id];
            }
        });

        selectedProductIds.forEach((id) => {
            if (!updatedProducts[id]) {
                const product = listProducts.find((item) => item.id === id);
                if (product) {
                    updatedProducts[id] = {
                        ...product,
                        promoCode: undefined,
                    };
                }
            }
        });

        setProductsSelected(updatedProducts);
        form.setFieldsValue({
            products: Object.keys(updatedProducts),
        });
    };


    const handleDeleteProduct = (id: string) => {
        const updatedProducts: Record<string, product> = { ...productsSelected };
        delete updatedProducts[id];
        setProductsSelected(updatedProducts);
        form.setFieldsValue({ products: Object.keys(updatedProducts) });
    };

    const handleChangeInput = (id: string, type: EProductFields) => (e: React.ChangeEvent<HTMLInputElement>) => {

        const updatedProducts: Record<string, product> = { ...productsSelected };
        if (updatedProducts && updatedProducts[id] && type === EProductFields.PRICE) {
            updatedProducts[id].price = formatDecimalPrecision(Number(e?.target?.value?.replace(/,/g, '')));
            updatedProducts[id].originalPrice = formatDecimalPrecision(Number(e?.target?.value?.replace(/,/g, '')));
        }
        if (updatedProducts && updatedProducts[id] && type === EProductFields.QUANTITY)
            updatedProducts[id].quantity = formatDecimalPrecision(Number(e?.target?.value?.replace(/,/g, '')));

        setProductsSelected(updatedProducts);
    }

    const handleChangeSelect = (record: product, type: EProductFields) => (e: string) => {
        const updatedProducts: Record<string, product> = { ...productsSelected };
        if (updatedProducts && updatedProducts[record?.id] && type === EProductFields.PROMOCODE) {
            updatedProducts[record?.id].promoCode = discountCodesMap?.get(e);
            const promoCode = Number(record?.promoCode?.value)
            const isCheck = promoCode < 100;
            const pricePromo = (Number(record?.price?.replace(/,/g, '')) * promoCode) / 100;
            const originalPrice = Number(record?.originalPrice?.replace(/,/g, ''))
            const priceReal = isCheck ? originalPrice - pricePromo : originalPrice - promoCode;

            if (priceReal < 0) {
                updatedProducts[record?.id].promoCode = undefined;
                return;
            }

            updatedProducts[record?.id].promoCode = discountCodesMap?.get(e);

            updatedProducts[record?.id].price = promoCode ? formatDecimalPrecision(Number(priceReal?.toString()?.replace(/,/g, ''))) : formatDecimalPrecision(String(originalPrice));
        }
        setProductsSelected(updatedProducts);
    }

    const handleChangeAmoutPaid = (e: any) => {
        if (Number(e.target.value) > totalAmount) {
            setTotalBalance(formatDecimalPrecision(Number((Number(form?.getFieldValue('amountPaid')) - totalAmount)?.toString()?.replace(/,/g, ''))));
            setShowNotices(true);
        }

        else setShowNotices(false);
    }

    useEffect(() => {
        if (!isOpen) {
            form.resetFields();
            setValue([]);
            setProductsSelected({});
            setPaymentMethod(undefined);
            setShowNotices(false);
        }
    }, [isOpen])

    useEffect(() => {
        if (type === 'update') {
            form.setFieldsValue({
                customer: record?.customer,
                email: record?.email,
                phoneNumber: record?.phoneNumber,
                paymentMethod,
                amountPaid: record?.amountPaid,
                products: record?.products
            })
            setPaymentMethod(record?.paymentMethod);
        }
    }, [record])


    useEffect(() => {
        if (productsSelected) {
            const selectedProductsArray = Object.values(productsSelected);
            const total = selectedProductsArray?.reduce((acc, product) => acc + Number(product.price?.replace(/,/g, '')), 0)
            setTotalAmount(total);
        }
    }, [productsSelected]);

    const columns: TableProps<product>['columns'] = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <Input value={formatDecimalPrecision(Number(record?.price?.replace(/,/g, '')) * Number(record?.quantity))} onChange={handleChangeInput(record?.id, EProductFields.PRICE)} />
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (text, record) => (
                <Input value={text} onChange={handleChangeInput(record?.id, EProductFields.QUANTITY)} />
            )
        },
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'promoCode',
            key: 'promoCode',
            render: (text, record) => (
                <Select
                    style={{ width: 180 }}
                    onChange={handleChangeSelect(record, EProductFields.PROMOCODE)}
                    options={discountCodes?.map(item => ({
                        value: item.id,
                        label: `${item.id} - ${item.type === 'percentage' ? item.value + '%' : item.value} VND`,
                    }))}
                    allowClear
                />
            )
        },
        {
            title: 'Thao tác',
            align: 'center',
            render: (_, record) => (
                <Tooltip title="Xóa">
                    <DeleteOutlined onClick={() => handleDeleteProduct(record?.id)} />
                </Tooltip>
            )
        }
    ];

    const isCheck = form?.getFieldValue('paymentMethod') === EPaymentType?.CASH;

    return (
        <Modal
            title="Lên đơn hàng cho khách"
            open={isOpen}
            onOk={() => form.submit()}
            onCancel={toogle}
            okText="Tạo"
            cancelText="Hủy"
            style={{ top: 20 }}
            width={1300}
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
                            <Select {...sharedProps} {...selectProps} onChange={handleChange} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    {
                        isCheck && <Col span={12}>
                            <Form.Item
                                name="amountPaid"
                                label="Số tiền khách đưa"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số tiền khách đưa'
                                    }]}>
                                <Input onChange={handleChangeAmoutPaid} />
                            </Form.Item>
                        </Col>
                    }

                    <Col span={!isCheck ? 12 : 6}>
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
                    <Col span={!isCheck ? 12 : 6}>
                        <div className='total-price'>
                            <h4 className='title'>Tổng số tiền</h4>
                            <p className='price'>{formatDecimalPrecision(Number(totalAmount?.toString()?.replace(/,/g, ''))) ?? 0} VNĐ</p>
                        </div>
                    </Col>
                </Row>
                {
                    showNotices && <p className='notices'>Tiền thừa trả khách: {totalBalance} VNĐ</p>
                }
                <Row>

                    <Col span={24}>
                        <Table<product>
                            columns={columns}
                            dataSource={Object.values(productsSelected)}
                            pagination={{ pageSize: 10 }}
                            scroll={{ y: 55 * 5 }}
                        />
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateOrder