import { EPaymentType } from "../enums/order.enum";

export interface product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    promoCode: string;
    paymentMethod: EPaymentType;
    paymented: number;
}
