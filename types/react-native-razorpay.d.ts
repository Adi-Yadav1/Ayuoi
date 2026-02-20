declare module "react-native-razorpay" {
  export interface RazorpayCheckoutOptions {
    description: string;
    image?: string;
    currency: string;
    key: string;
    amount: number;
    name: string;
    order_id?: string;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    theme?: {
      color?: string;
    };
  }

  export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  export interface RazorpayError {
    code: number;
    description: string;
  }

  class RazorpayCheckout {
    static open(options: RazorpayCheckoutOptions): Promise<RazorpayResponse>;
  }

  export default RazorpayCheckout;
}
