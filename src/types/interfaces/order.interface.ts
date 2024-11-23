import { EPaymentType } from "../enums/order.enum";
import { product } from "./product.interface";

export interface order {
    id: string;
    customer: string;
    email: string;
    phoneNumber: string;
    products?: product[];
    paymentMethod: EPaymentType;
    amountPaid: number;
    totalAmount: number;
}