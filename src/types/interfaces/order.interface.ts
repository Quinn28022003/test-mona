import { product } from "./product.interface";

export interface order {
    id: string;
    customer: string;
    email: string;
    phoneNumber: string;
    products?: product[]
}