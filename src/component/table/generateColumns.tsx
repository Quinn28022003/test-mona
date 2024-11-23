import { useMemo } from "react";
import { order } from "../../types/interfaces/order.interface";
import { TableProps } from "antd";
import Actions from "./actions/actions";

export const generateColumns = (
    setRecord: React.Dispatch<React.SetStateAction<order | undefined>>,
    handleDeleteOrder: (id: string) => void,
    handleUpdateOrder: (id: string) => void,
    handlePaymentOrder: (id: string) => void
): TableProps<order>['columns'] => {
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
                render: (_, record) => (
                    <Actions
                        record={record}
                        setRecord={setRecord}
                        handleDeleteOrder={handleDeleteOrder}
                        handleUpdateOrder={handleUpdateOrder}
                        handlePaymentOrder={handlePaymentOrder}
                    />
                )
            }
        ];
    }, [])

    return columns;
}