import { Table as TableLibrary } from 'antd';

import { order } from '../../types/interfaces/order.interface';
import { generateColumns } from './generateColumns';
import Header from './header';
import './table.scss';
import { EPaymentType } from '../../types/enums/order.enum';

interface ITable {
    toogleCreateOrder: () => void;
}

const data: order[] = [
    {
        id: '1',
        customer: 'John Brown',
        phoneNumber: '123',
        email: 'New York No. 1 Lake Park',
        paymentMethod: EPaymentType.CASH,
        amountPaid: 10000
    },
    {
        id: '2',
        customer: 'Jim Green',
        email: '123',
        phoneNumber: 'London No. 1 Lake Park',
        paymentMethod: EPaymentType.CREDITCARD,
        amountPaid: 12000
    },
    {
        id: '3',
        customer: 'Joe Black',
        email: '123',
        phoneNumber: 'Sydney No. 1 Lake Park',
        paymentMethod: EPaymentType.CREDITCARD,
        amountPaid: 110000
    },
];

const Table = (props: ITable) => {
    const { toogleCreateOrder } = props;

    const columns = generateColumns();

    return (
        <div className='container-table'>
            <Header
                toogleCreateOrder={toogleCreateOrder}
            />
            <TableLibrary<order>
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Table