import { Modal, Result } from 'antd'

interface IComfirmOrderSuccess {
    isOpen: boolean;
    toogle: () => void;
}
const ComfirmOrderSuccess = (props: IComfirmOrderSuccess) => {
    const { isOpen, toogle } = props;
    return (
        <Modal
            title="Thanh toán"
            open={isOpen}
            onOk={toogle}
            onCancel={toogle}
            footer={null}
        >

            <Result
                status="success"
                title="Bạn đã thanh toán đơn hàng thành công!"
            />
        </Modal>
    )
}

export default ComfirmOrderSuccess