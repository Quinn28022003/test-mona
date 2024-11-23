import { Button, Input } from 'antd';

const { Search } = Input;

interface IHeader {
    toogleCreateOrder: () => void;
    setSearch: React.Dispatch<React.SetStateAction<string>>,
}

const Header = (props: IHeader) => {
    const { toogleCreateOrder, setSearch } = props

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

    return (
        <div className='header-table'>
            <Search size='large' placeholder="input search text" style={{ width: 300 }} onChange={handleChange} />
            <Button size='large' type="primary" onClick={toogleCreateOrder} >Lên đơn</Button>
        </div>
    )
}

export default Header