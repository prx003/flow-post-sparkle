import { describe, expect, it } from "vitest";
import { hasVerificationDetails } from "@/lib/verification";

describe("Account-specific verification requirements", () => {
  const document = new File(["test"], "proof.pdf", { type: "application/pdf" });
  it("requires business and shop details plus both business documents", () => {
    const details = { businessName: "Test business", registrationNumber: "REG123", contactName: "Test owner", phone: "123456789", shopName: "Test shop", shopAddress: "Test address" };
    expect(hasVerificationDetails("business", details, { registration: document })).toBe(false);
    expect(hasVerificationDetails("business", details, { registration: document, shopProof: document })).toBe(true);
    expect(hasVerificationDetails("business", { ...details, shopAddress: "" }, { registration: document, shopProof: document })).toBe(false);
  });
  it("requires personal KYC details and an identity document, not business documents", () => {
    const details = { legalName: "Test person", birthDate: "1990-01-01", address: "Test address" };
    expect(hasVerificationDetails("personal", details, {})).toBe(false);
    expect(hasVerificationDetails("personal", details, { identity: document })).toBe(true);
    expect(hasVerificationDetails("personal", { ...details, birthDate: "" }, { identity: document })).toBe(false);
  });
});