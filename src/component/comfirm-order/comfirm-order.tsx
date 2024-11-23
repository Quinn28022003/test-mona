import { Col, Modal, Row, Table, TableProps } from "antd";
import { useEffect, useState } from "react";

import { order } from "../../types/interfaces/order.interface";
import FieldText from "../field-text/field-text";
import { formatDecimalPrecision } from "../../utils/decimal-precision";
import { paymentMethodMapping } from "../../utils/product-mapping";
import { EPaymentType } from "../../types/enums/order.enum";
import { product } from '../../types/interfaces/product.interface';
interface IComfirmOrder {
    listOrders: order[];
    orderId: string;
    isOpen: boolean;
    toogle: () => void;
    toogleSuccess: () => void;
}

const ComfirmOrder = (props: IComfirmOrder) => {
    const {
        listOrders,
        orderId,
        isOpen,
        toogle,
        toogleSuccess
    } = props;

    const [data, setData] = useState<order>();

    useEffect(() => {
        if (orderId && listOrders?.length > 0) setData(listOrders?.find(item => item.id === orderId));
    }, [listOrders, orderId])


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

        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',

        },
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'promoCode',
            key: 'promoCode',

        },
    ];

    const onComfirm = () => {
        toogle()
        toogleSuccess()
    }

    return (
        <Modal
            title="Thánh toán"
            open={isOpen}
            onOk={onComfirm}
            onCancel={toogle}
            okText="Thánh toán"
            cancelText="Hủy"
            style={{ top: 20 }}
            width={1000}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <FieldText label="Tên khách hàng" value={data?.customer ?? ''} />
                </Col>

                <Col span={12}>
                    <FieldText label="Email" value={data?.email ?? ''} />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <FieldText label="Số điện thoại" value={data?.phoneNumber ?? ''} />
                </Col>

                <Col span={12}>
                    <FieldText label="Phương thức thanh toán" value={paymentMethodMapping(data?.paymentMethod as EPaymentType)} />
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <FieldText label="Tổng đơn hàng" value={formatDecimalPrecision(Number(data?.amountPaid)) ?? ''} />
                </Col>
            </Row>

            <Row>

                <Col span={24}>
                    <Table<product>
                        columns={columns}
                        dataSource={Object.values(data?.products || [])}
                        pagination={{ pageSize: 10 }}
                        scroll={{ y: 55 * 5 }}
                    />
                </Col>
            </Row>

        </Modal>
    )
}

export default ComfirmOrder