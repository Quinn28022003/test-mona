import { useMemo } from "react";
import { order } from "../../types/interfaces/order.interface";
import { TableProps } from "antd";
import Actions from "./actions/actions";

export const generateColumns = (): TableProps<order>['columns'] => {
    const columns: TableProps<order>['columns'] = useMemo(() => {
        return [
            {
                title: 'STT',
                align: 'center',
                render: (_, __, index) => <p>{index + 1}</p>,
            },
            {
                title: 'Tên khách hàng',
                dataIndex: 'customer',
                key: 'customer',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Số điện thoại',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
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