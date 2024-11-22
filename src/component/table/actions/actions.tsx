import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import './action.scss';

const Actions = () => {

    const handleDetail = () => { }
    const handleUpdate = () => { }
    const handleDelete = () => { }

    return (
        <div className='actions'>
            <EyeOutlined onClick={handleDetail} />
            <EditOutlined onClick={handleUpdate} />
            <DeleteOutlined onClick={handleDelete} />
        </div>
    )
}

export default Actions