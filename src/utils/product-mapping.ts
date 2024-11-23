import { EPaymentType } from "../types/enums/order.enum";

const paymentMethod = {
    [EPaymentType.CASH]: 'Tiền mặt',
    [EPaymentType.CREDITCARD]: 'Thẻ tín dụng',
}

export const paymentMethodMapping = (text: EPaymentType) => {
    return paymentMethod[text];
}