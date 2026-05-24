const FALLBACK_EMAIL = "brothersremodelingokc@gmail.com";

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 64) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

function normalize(value) {
  return String(value || "").trim();
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let payload;
  try {
    payload = await readBody(req);
  } catch (error) {
    return res.status(400).json({ ok: false, error: error.message || "Invalid request body" });
  }

  const firstName = normalize(payload.firstName);
  const phone = normalize(payload.phone);
  const projectType = normalize(payload.projectType);
  const projectDescription = normalize(payload.projectDescription);

  if (!firstName || !phone || !projectType || !projectDescription) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields",
      required: ["firstName", "phone", "projectType", "projectDescription"],
      fallbackEmail: FALLBACK_EMAIL,
    });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(503).json({
      ok: false,
      mode: "email_fallback_required",
      error: "Contact webhook is not configured. Please email the project details instead.",
      fallbackEmail: FALLBACK_EMAIL,
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        site: "Brothers Remodeling OKC",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook rejected lead with ${response.status}`);
    }

    return res.status(202).json({ ok: true, mode: "webhook_forwarded" });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      mode: "email_fallback_required",
      error: error.message || "Lead delivery failed",
      fallbackEmail: FALLBACK_EMAIL,
    });
  }
}
