export interface product {
    id: string;
    name: string;
    price: string;
    quantity: string;
    promoCode?: IPromoCode;
    originalPrice?: string;
}
export interface IItem {
    label: string;
    value: string;
}

export interface IPromoCode {
    id: string;
    type: string;
    value: string | number;
}