export type VerificationAccount = "personal" | "business";
export type VerificationField = { name: string; label: string; type?: "date" | "tel"; multiline?: boolean };

export const verificationFields: Record<VerificationAccount, VerificationField[]> = {
  business: [
    { name: "businessName", label: "Registered business name" },
    { name: "registrationNumber", label: "Business registration number" },
    { name: "contactName", label: "Owner / authorised representative name" },
    { name: "phone", label: "Business contact number", type: "tel" },
    { name: "shopName", label: "Shop name" },
    { name: "shopAddress", label: "Shop address", multiline: true },
  ],
  personal: [
    { name: "legalName", label: "Full legal name" },
    { name: "birthDate", label: "Date of birth", type: "date" },
    { name: "address", label: "Residential address", multiline: true },
  ],
};

export const verificationDocuments: Record<VerificationAccount, { name: string; label: string }[]> = {
  business: [
    { name: "registration", label: "Business registration document" },
    { name: "shopProof", label: "Shop proof (licence, lease or utility bill)" },
  ],
  personal: [{ name: "identity", label: "Government-issued identity document" }],
};

export function hasVerificationDetails(account: VerificationAccount, values: Record<string, string>, documents: Record<string, File | undefined>) {
  return verificationFields[account].every((field) => Boolean(values[field.name]?.trim()))
    && verificationDocuments[account].every((document) => Boolean(documents[document.name]));
}