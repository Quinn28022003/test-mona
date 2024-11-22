import { Modal } from "antd";

interface IComfirmOrder {
    isOpen: boolean;
    toogle: () => void;
}

const ComfirmOrder = (props: IComfirmOrder) => {
    const {
        isOpen,
        toogle
    } = props;
    return (
        <Modal
            title="Thánh toán"
            open={isOpen}
            onOk={toogle}
            onCancel={toogle}
            okText="Tạo"
            cancelText="Hủy"
            style={{ top: 20 }}
            width={1000}
        >


        </Modal>
    )
}

export default ComfirmOrder