import { Table as TableLibrary } from 'antd';

import { order } from '../../types/interfaces/order.interface';
import { generateColumns } from './generateColumns';
import Header from './header';
import './table.scss';
import { EPaymentType } from '../../types/enums/order.enum';

interface ITable {
    toogleCreateOrder: () => void;
    data: order[];
}



const Table = (props: ITable) => {
    const { toogleCreateOrder, data } = props;

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