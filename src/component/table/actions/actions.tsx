import { DeleteOutlined, DollarOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import './action.scss';
import { order } from '../../../types/interfaces/order.interface';
interface IActions {
    record: order;
    setRecord: React.Dispatch<React.SetStateAction<order | undefined>>;
    handleDeleteOrder: (id: string) => void;
    handleUpdateOrder: (id: string) => void;
    handlePaymentOrder: (id: string) => void;
}

const Actions = (props: IActions) => {

    const {
        record,
        setRecord,
        handleDeleteOrder,
        handlePaymentOrder,
        handleUpdateOrder,
    } = props;

    const handleUpdate = () => {
        handleUpdateOrder(record?.id);
        setRecord(record);
    }

    const handleDelete = () => handleDeleteOrder(record?.id);

    const handlePayment = () => handlePaymentOrder(record?.id);

    return (
        <div className='actions'>
            <EditOutlined onClick={handleUpdate} />
            <DollarOutlined onClick={handlePayment} />
            <DeleteOutlined onClick={handleDelete} />
        </div>
    )
}

export default Actions