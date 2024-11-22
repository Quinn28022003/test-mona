import { Table } from "antd"
import { product } from "../../types/interfaces/product.interface"
import { generateColumns } from "./generateColumns"

const data: product[] = [
    {
        "id": "fd4876b3-0454-40bb-ae2f-28c489d6117a",
        "name": "Product 3",
        "price": 672.43,
        "quantity": 45,
        "promoCode": "PROMO3"
    },
    {
        "id": "ba32cf34-6f4c-438f-a7cb-62003e4be45b",
        "name": "Product 4",
        "price": 231.78,
        "quantity": 12,
        "promoCode": "PROMO4"
    },
    {
        "id": "8e753cdd-e5b5-4762-a30d-3bf689e2c5d4",
        "name": "Product 5",
        "price": 809.99,
        "quantity": 89,
        "promoCode": "PROMO5"
    },
    {
        "id": "0cc5ae7f-ec3e-4bd1-9a07-d3c1c153d620",
        "name": "Product 6",
        "price": 415.32,
        "quantity": 63,
        "promoCode": "PROMO6"
    },
    {
        "id": "9f55b752-e598-4b9e-86d4-578c0c98e95d",
        "name": "Product 7",
        "price": 321.47,
        "quantity": 33,
        "promoCode": "PROMO7"
    },
    {
        "id": "d4e09591-0b87-4b37-9e2c-8f16264d26ae",
        "name": "Product 8",
        "price": 589.15,
        "quantity": 47,
        "promoCode": "PROMO8"
    },
    {
        "id": "db23393f-45b6-4230-bcd3-26f6e0ad6ac1",
        "name": "Product 9",
        "price": 104.67,
        "quantity": 58,
        "promoCode": "PROMO9"
    },
    {
        "id": "8b0f4b56-60a7-4c52-bb6d-d91c88c0cb3d",
        "name": "Product 10",
        "price": 763.54,
        "quantity": 77,
        "promoCode": "PROMO10"
    },
    {
        "id": "dff59246-7c09-46c4-8654-bf84962a7f9f",
        "name": "Product 11",
        "price": 229.87,
        "quantity": 20,
        "promoCode": "PROMO11"
    },
    {
        "id": "6374dc04-7c0c-4a5b-a2a1-c2608b92b8bc",
        "name": "Product 12",
        "price": 387.61,
        "quantity": 10,
        "promoCode": "PROMO12"
    },
    {
        "id": "f8b5dd3e-89b8-4316-8e5c-756f1093649c",
        "name": "Product 13",
        "price": 942.21,
        "quantity": 28,
        "promoCode": "PROMO13"
    },
    {
        "id": "c402948d-fb68-4a3f-a31f-24b44b789e03",
        "name": "Product 14",
        "price": 418.19,
        "quantity": 93,
        "promoCode": "PROMO14"
    },
    {
        "id": "dba1ed51-6d80-4517-a2b1-248e93abecdf",
        "name": "Product 15",
        "price": 652.43,
        "quantity": 17,
        "promoCode": "PROMO15"
    },
    {
        "id": "95dd8f43-9df1-49c0-9114-f6b4a4ec9d36",
        "name": "Product 16",
        "price": 112.77,
        "quantity": 55,
        "promoCode": "PROMO16"
    },
    {
        "id": "2f7b9069-805b-4e60-9b8c-40eb21a79e94",
        "name": "Product 17",
        "price": 742.31,
        "quantity": 81,
        "promoCode": "PROMO17"
    },
    {
        "id": "08c62027-77de-4a65-9cd8-cfe73082b033",
        "name": "Product 18",
        "price": 185.92,
        "quantity": 66,
        "promoCode": "PROMO18"
    },
    {
        "id": "2c7525b4-1fd0-48c8-a4d8-63895b9a63c5",
        "name": "Product 19",
        "price": 274.84,
        "quantity": 40,
        "promoCode": "PROMO19"
    },
    {
        "id": "fa26091e-812b-48a8-b1de-3cbd74ff44da",
        "name": "Product 20",
        "price": 804.75,
        "quantity": 26,
        "promoCode": "PROMO20"
    }
]


const TableProducts = () => {
    const columns = generateColumns()
    return (
        <Table<product>
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
            scroll={{ y: 55 * 5 }}
        />
    )
}

export default TableProducts