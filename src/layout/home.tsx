import { useEffect, useState } from "react";

import CreateOrder from "../component/create-order/create-order";
import Header from "../component/header/header";
import Table from "../component/table/table";
import { order } from "../types/interfaces/order.interface";
import { useDebounce } from "../hooks/use-debounce";
import ComfirmOrder from "../component/comfirm-order/comfirm-order";

const Home = () => {

    const [listOrders, setListOrders] = useState<order[]>([]);
    const [isOpenCreateOrder, setIsOpenCreateOrder] = useState<boolean>(false);
    const [isOpenUpdateOrder, setIsOpenUpdateOrder] = useState<boolean>(false);
    const [isOpenComfirmOrder, setIsOpenComfirmOrder] = useState<boolean>(false);
    const [record, setRecord] = useState<order>();
    const [search, setSearch] = useState<string>('');

    const searchText = useDebounce(search);

    const toogleCreateOrder = () => setIsOpenCreateOrder(!isOpenCreateOrder);
    const toogleUpdateOrder = () => setIsOpenUpdateOrder(!isOpenUpdateOrder);
    const toogleComfirmOrder = () => setIsOpenComfirmOrder(!isOpenComfirmOrder);

    const handleDeleteOrder = (id: string) => setListOrders(prev => [...prev?.filter(item => item.id !== id)]);

    const handleUpdateOrder = (id: string) => {
        toogleUpdateOrder()
    }

    const handlePaymentOrder = (id: string) => {
        console.log('id: ', id)
        toogleComfirmOrder();
    }

    const filterData = () => {
        setListOrders(prev => [...prev?.filter(item => item.customer?.includes(searchText))]);
    }

    useEffect(() => {
        if (searchText?.trim() !== '') filterData();
    }, [searchText])

    return (
        <>
            <Header />

            <Table
                data={listOrders}
                setSearch={setSearch}
                setRecord={setRecord}
                toogleCreateOrder={toogleCreateOrder}
                handleDeleteOrder={handleDeleteOrder}
                handleUpdateOrder={handleUpdateOrder}
                handlePaymentOrder={handlePaymentOrder}
            />

            <CreateOrder
                type="create"
                isOpen={isOpenCreateOrder}
                toogle={toogleCreateOrder}
                setListOrders={setListOrders}
            />

            <CreateOrder
                type="update"
                isOpen={isOpenUpdateOrder}
                toogle={toogleUpdateOrder}
                setListOrders={setListOrders}
                record={record}
            />

            <ComfirmOrder
                isOpen={isOpenComfirmOrder}
                toogle={toogleComfirmOrder}
            />
        </>
    )
}

export default Home