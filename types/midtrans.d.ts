declare module "midtrans-client" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SnapPaymentCallback {
    onSuccess?: (result: SnapPaymentResult) => void;
    onPending?: (result: SnapPaymentResult) => void;
    onError?: (result: SnapPaymentResult) => void;
    onClose?: () => void;
  }

  interface SnapPaymentResult {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: string;
    fraud_status: string;
    [key: string]: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface ItemDetail {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface SnapParameter {
    transaction_details: TransactionDetails;
    item_details?: ItemDetail[];
    [key: string]:
      | TransactionDetails
      | ItemDetail[]
      | string
      | number
      | undefined;
  }

  export class Snap {
    constructor(config: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    createTransactionToken(parameter: SnapParameter): Promise<string>;
    createTransaction(parameter: SnapParameter): Promise<SnapPaymentResult>;
  }

  const midtrans: {
    Snap: typeof Snap;
  };

  export default midtrans;
}
