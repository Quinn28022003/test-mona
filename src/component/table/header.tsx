import { Button, Input } from 'antd';

const { Search } = Input;

const Header = () => {
    return (
        <div className='header-table'>
            <Search size='large' placeholder="input search text" style={{ width: 300 }} />
            <Button size='large' type="primary" >Lên đơn</Button>
        </div>
    )
}

export default Header