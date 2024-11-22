import { Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import './header.scss';

const Header = () => {
    return (
        <>
            <div className='header'>
                <div className='header-left'>
                    <h1 className='logo'>Test Mona</h1>
                </div>
                <div className='header-right'>
                    <Avatar size={30} icon={<UserOutlined />} />
                    <h3>Hà Hoàng Quân</h3>
                </div>
            </div>
            <div className='line' />
        </>

    )
}

export default Header;