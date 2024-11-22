import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

import './action.scss';

const Actions = () => {

    const handleDetail = () => { }
    const handleUpdate = () => { }
    const handleDelete = () => { }

    return (
        <div className='actions'>
            <DeleteOutlined onClick={handleDelete} />
        </div>
    )
}

export default Actions