import "server-only";
import { Buffer } from "node:buffer";

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface RazorpayPayment {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
}

interface RazorpayConfig {
  keyId: string;
  keySecret: string;
  mode: "test" | "live";
}

function getRazorpayConfig(): RazorpayConfig | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const mode = process.env.RAZORPAY_MODE?.toLowerCase() ?? "test";

  if (
    !keyId ||
    !keySecret ||
    (mode !== "test" && mode !== "live") ||
    (mode === "test" && !keyId.startsWith("rzp_test_")) ||
    (mode === "live" && !keyId.startsWith("rzp_live_"))
  ) {
    return null;
  }

  return { keyId, keySecret, mode };
}

export function getRazorpayPublicKey(): string | null {
  return getRazorpayConfig()?.keyId ?? null;
}

export function getRazorpayMode(): "test" | "live" | null {
  return getRazorpayConfig()?.mode ?? null;
}

export async function createRazorpayOrder(input: {
  amount: number;
  receipt: string;
  customerOrderId: string;
  userId: string;
}): Promise<RazorpayOrder | null> {
  const config = getRazorpayConfig();
  if (!config) return null;

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: "INR",
      receipt: input.receipt,
      notes: {
        customer_order_id: input.customerOrderId,
        user_id: input.userId,
      },
    }),
    signal: AbortSignal.timeout(15_000),
  });

  const result: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof result !== "object" ||
    result === null ||
    !("id" in result) ||
    typeof result.id !== "string" ||
    !("amount" in result) ||
    result.amount !== input.amount ||
    !("currency" in result) ||
    result.currency !== "INR" ||
    !("receipt" in result) ||
    result.receipt !== input.receipt ||
    !("status" in result) ||
    typeof result.status !== "string"
  ) {
    return null;
  }

  return {
    id: result.id,
    amount: result.amount,
    currency: result.currency,
    receipt: result.receipt,
    status: result.status,
  };
}

export async function fetchRazorpayPayment(paymentId: string): Promise<RazorpayPayment | null> {
  const config = getRazorpayConfig();
  if (!config) return null;

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`,
      },
      signal: AbortSignal.timeout(15_000),
    },
  );
  const result: unknown = await response.json().catch(() => null);
  if (
    !response.ok ||
    typeof result !== "object" ||
    result === null ||
    !("id" in result) ||
    result.id !== paymentId ||
    !("order_id" in result) ||
    typeof result.order_id !== "string" ||
    !("amount" in result) ||
    typeof result.amount !== "number" ||
    !("currency" in result) ||
    typeof result.currency !== "string" ||
    !("status" in result) ||
    typeof result.status !== "string"
  ) {
    return null;
  }

  return {
    id: result.id,
    order_id: result.order_id,
    amount: result.amount,
    currency: result.currency,
    status: result.status,
  };
}

export async function captureRazorpayPayment(
  paymentId: string,
  amount: number,
): Promise<void> {
  const config = getRazorpayConfig();
  if (!config) throw new Error("Razorpay server configuration is unavailable.");

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.keyId}:${config.keySecret}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, currency: "INR" }),
      signal: AbortSignal.timeout(15_000),
    },
  );
  if (!response.ok) throw new Error("Razorpay did not accept the capture request.");
}
