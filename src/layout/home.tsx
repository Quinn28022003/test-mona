import { useState } from "react"
import CreateOrder from "../component/create-order/create-order"
import Header from "../component/header/header"
import Table from "../component/table/table"

const Home = () => {

    const [isOpenCreateOrder, setIsOpenCreateOrder] = useState<boolean>(false);
    const toogleCreateOrder = () => setIsOpenCreateOrder(!isOpenCreateOrder);

    return (
        <>
            <Header />
            <Table
                toogleCreateOrder={toogleCreateOrder}
            />

            <CreateOrder
                isOpen={isOpenCreateOrder}
                toogle={toogleCreateOrder}
            />
        </>
    )
}

export default Home