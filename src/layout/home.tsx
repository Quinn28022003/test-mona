import { useState } from "react"
import CreateOrder from "../component/create-order/create-order"
import Header from "../component/header/header";
import Table from "../component/table/table";
import { EPaymentType } from "../types/enums/order.enum";
import { order } from "../types/interfaces/order.interface";

const Home = () => {

    const [listOrders, setListOrders] = useState<order[]>([]);
    const [isOpenCreateOrder, setIsOpenCreateOrder] = useState<boolean>(false);

    const toogleCreateOrder = () => setIsOpenCreateOrder(!isOpenCreateOrder);

    return (
        <>
            <Header />

            <Table
                toogleCreateOrder={toogleCreateOrder}
                data={listOrders}
            />

            <CreateOrder
                isOpen={isOpenCreateOrder}
                toogle={toogleCreateOrder}
                setListOrders={setListOrders}
            />
        </>
    )
}

export default Home