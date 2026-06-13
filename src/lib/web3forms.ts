// Shared Web3Forms submission helper for the site's forms (Contact, Catering).
// The access key for elementsby456@gmail.com determines the destination inbox —
// there is no recipient field. Manage the key at https://web3forms.com.
const WEB3FORMS_ACCESS_KEY = "53b0027f-d727-48e1-8cf9-0eb7b6f49123";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// POST a form to Web3Forms. `subject` distinguishes the email in the inbox
// (e.g. "Catering Inquiry – Elements by 456" vs a general contact message).
// Returns true on success, false on a non-success response; throws on a network
// failure, so callers should wrap this in try/catch.
export async function submitWeb3Form(
  fields: Record<string, unknown>,
  subject: string,
): Promise<boolean> {
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "Elements by 456 Website",
      subject,
      ...fields,
    }),
  });
  const data = await res.json();
  return Boolean(data.success);
}
