import { Table as TableLibrary } from 'antd';

import { order } from '../../types/interfaces/order.interface';
import { generateColumns } from './generateColumns';
import Header from './header';
import './table.scss';
interface ITable {
    data: order[];
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setRecord: React.Dispatch<React.SetStateAction<order | undefined>>;
    toogleCreateOrder: () => void;
    handleDeleteOrder: (id: string) => void;
    handleUpdateOrder: (id: string) => void;
    handlePaymentOrder: (id: string) => void;
}

const Table = (props: ITable) => {
    const {
        data,
        setSearch,
        setRecord,
        toogleCreateOrder,
        handleDeleteOrder,
        handleUpdateOrder,
        handlePaymentOrder,
    } = props;

    const columns = generateColumns(
        setRecord,
        handleDeleteOrder,
        handleUpdateOrder,
        handlePaymentOrder,
    );

    return (
        <div className='container-table'>
            <Header
                toogleCreateOrder={toogleCreateOrder}
                setSearch={setSearch}
            />
            <TableLibrary<order>
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default Table