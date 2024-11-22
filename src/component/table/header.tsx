import { Button, Input } from 'antd';

const { Search } = Input;

interface IHeader {
    toogleCreateOrder: () => void;
}

const Header = (props: IHeader) => {
    const { toogleCreateOrder } = props
    return (
        <div className='header-table'>
            <Search size='large' placeholder="input search text" style={{ width: 300 }} />
            <Button size='large' type="primary" onClick={toogleCreateOrder} >Lên đơn</Button>
        </div>
    )
}

export default Header