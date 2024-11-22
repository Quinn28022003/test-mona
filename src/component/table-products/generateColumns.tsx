import { useMemo } from "react";
import { Input, TableProps } from "antd";
import { product } from "../../types/interfaces/product.interface";
import Actions from "./actions/actions";

export const generateColumns = (): TableProps<product>['columns'] => {
    const columns: TableProps<product>['columns'] = useMemo(() => {
        return [
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
                render: (text, _, index) => (
                    <Input value={text} />
                )
            },
            {
                title: 'Số lượng',
                dataIndex: 'quantity',
                key: 'quantity',
                align: 'center',
                render: (text, _, index) => (
                    <Input value={text} />
                )
            },
            {
                title: 'Mã khuyến mãi',
                dataIndex: 'promoCode',
                key: 'promoCode',
            },
            {
                title: 'Thao tác',
                align: 'center',
                render: () => <Actions />
            }
        ];
    }, [])

    return columns;
}