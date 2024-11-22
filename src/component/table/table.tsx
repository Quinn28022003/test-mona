import { Table as TableLibrary } from 'antd';

import { order } from '../../types/interfaces/order.interface';
import { generateColumns } from './columns';
import Header from './header';
import './table.scss';

const data: order[] = [
    {
        id: '1',
        customer: 'John Brown',
        phoneNumber: '123',
        email: 'New York No. 1 Lake Park',
    },
    {
        id: '2',
        customer: 'Jim Green',
        email: '123',
        phoneNumber: 'London No. 1 Lake Park',
    },
    {
        id: '3',
        customer: 'Joe Black',
        email: '123',
        phoneNumber: 'Sydney No. 1 Lake Park',
    },
];

const Table = () => {
    const columns = generateColumns();

    return (
        <div className='container-table'>
            <Header />
            <TableLibrary<order>
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Table