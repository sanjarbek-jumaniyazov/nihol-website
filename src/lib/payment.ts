/**
 * Payment stub. No gateway has been chosen yet (Payme and Click are the
 * standard options for SOM-denominated checkout in Uzbekistan). This function
 * is the single integration point to swap in a real provider: replace the
 * body with a call to the provider's API (e.g. create a Payme transaction
 * and return its checkout URL), keeping the same signature.
 */
export interface PaymentResult {
  success: boolean;
  reference: string;
  redirectUrl?: string;
}

export async function processPayment(orderId: string, amountSom: number): Promise<PaymentResult> {
  void amountSom;
  // TODO: replace with a real gateway call once a provider is selected.
  return {
    success: true,
    reference: `STUB-${orderId.slice(0, 8).toUpperCase()}`,
  };
}
