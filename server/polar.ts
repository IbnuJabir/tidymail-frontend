"use server";
import { redirect } from "next/navigation";
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
  server: "sandbox",
});
export async function Subscribe() {
  const checkout = await polar.checkouts.create({
    products: ["b6d037e2-bc65-48ed-bcac-1867b70c4138"],
    successUrl: "http://localhost:3000/payment/success",
  });

  redirect(checkout.url);
}
