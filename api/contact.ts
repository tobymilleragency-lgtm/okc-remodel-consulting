type VercelRequest = {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): void;
};

type GhlContactResponse = {
  contact?: { id?: string };
  id?: string;
};

type LeadSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  projectType: string;
  projectDescription: string;
  bestTime: string;
  sourceUrl: string;
  sourceLabel: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
};

const GHL_BASE_URL = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const LOCATION_ID = "f8kfxLOygXIaeYq7mHRl";
const PIPELINE_ID = "uuiC6pXDeEgz5al2NS1P";
const LANDING_STAGE_ID = "7e291f04-9e03-405f-9e9b-06871054fe96";
const BACKUP_EMAIL_TO = "toby@okcremodelconsulting.com";
const CUSTOM_FIELD_IDS = {
  projectType: "fAF72O7jHu0hyOgBazOZ",
  projectDescription: "hezZEwg6G6reAkoKhNFs",
  city: "cIYKF0oXZh7uZdCkiI68",
  state: "2aJ00bLy4gMJYaNDKmXG",
  bestTime: "kRx6sIvHVuB71Z2szEdY",
  sourceUrl: "R8iGTQoun3qunlKT6o3R",
};
const REQUIRED_PROJECT_TYPES = new Set([
  "Bathroom",
  "Kitchen",
  "Flooring",
  "Addition",
  "Deck",
  "Whole Home",
  "Exterior",
  "Other",
  "Basement",
  "New Construction",
  "Roof",
]);
const REQUIRED_STATES = new Set(["Oklahoma", "Oklahoma", "Missouri"]);
const CONTACT_TAGS = ["website_lead", "homeowner"];
const CONFIRMATION_EMAIL_SUBJECT = "Thanks for reaching out to Oklahoma Remodel Consulting";
const CONFIRMATION_EMAIL_TEXT =
  "Thanks for reaching out — we'll call you back within one business day to schedule your consultation. If you don't hear back, reply to this email and we'll check on it.";

function asTrimmedString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getHeader(req: VercelRequest, name: string): string | null {
  const headers = req.headers ?? {};
  const header = headers[name] ?? headers[name.toLowerCase()];
  if (Array.isArray(header)) return header[0] ?? null;
  return typeof header === "string" && header.trim().length > 0 ? header.trim() : null;
}

function getClientIp(req: VercelRequest): string {
  const forwardedFor = getHeader(req, "x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return getHeader(req, "x-real-ip") ?? "unknown";
}

function sourceUrlFrom(req: VercelRequest, bodyValue: unknown): string {
  const submittedSource = asTrimmedString(bodyValue);
  if (submittedSource) return submittedSource;

  const origin = getHeader(req, "origin");
  const referer = getHeader(req, "referer");
  return referer ?? origin ?? "https://okcremodelconsulting.com/contact";
}

function ghlToken(): string {
  const token =
    process.env.GHL_PRIVATE_TOKEN ??
    process.env.GHL_PRIVATE_INTEGRATION_TOKEN ??
    process.env.GOHIGHLEVEL_PRIVATE_INTEGRATION_TOKEN;
  if (!token) {
    throw new Error("Missing GHL_PRIVATE_TOKEN");
  }
  return token;
}

async function ghlRequest<T>(path: string, init: RequestInit, token: string): Promise<T> {
  const response = await fetch(`${GHL_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(`GoHighLevel ${path} failed: ${response.status} ${text}`);
  }

  return body as T;
}

function contactIdFrom(response: GhlContactResponse): string | null {
  return response.contact?.id ?? response.id ?? null;
}

function metadataNote(metadata: { ipAddress: string; userAgent: string; submittedAt: string; sourceUrl: string; sourceLabel: string }) {
  return [
    "Website lead metadata",
    `Form source: ${metadata.sourceLabel}`,
    `IP address: ${metadata.ipAddress}`,
    `User agent: ${metadata.userAgent}`,
    `Submission timestamp: ${metadata.submittedAt}`,
    `Source URL: ${metadata.sourceUrl}`,
  ].join("\n");
}

function leadSummary(lead: LeadSubmission): string {
  return [
    "Oklahoma Remodel Consulting website lead",
    "",
    `Name: ${lead.firstName} ${lead.lastName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `City: ${lead.city}`,
    `State: ${lead.state}`,
    `Project Type: ${lead.projectType}`,
    `Best Time to Reach: ${lead.bestTime || "Not provided"}`,
    "",
    "Project Description:",
    lead.projectDescription,
    "",
    "Submission Metadata:",
    `Form source: ${lead.sourceLabel}`,
    `Source URL: ${lead.sourceUrl}`,
    `Submitted At: ${lead.submittedAt}`,
    `IP Address: ${lead.ipAddress}`,
    `User Agent: ${lead.userAgent}`,
  ].join("\n");
}

async function sendBackupEmail(lead: LeadSubmission, reason: unknown) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.BACKUP_LEAD_WEBHOOK_URL;
  const reasonText = reason instanceof Error ? reason.message : String(reason);
  const text = `${leadSummary(lead)}\n\nGHL Failure:\n${reasonText}`;

  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BACKUP_EMAIL_FROM ?? "Oklahoma Remodel Consulting <toby@okcremodelconsulting.com>",
        to: [BACKUP_EMAIL_TO],
        subject: `Backup website lead: ${lead.firstName} ${lead.lastName}`,
        text,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backup Resend email failed: ${response.status} ${await response.text()}`);
    }
    return;
  }

  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: BACKUP_EMAIL_TO, subject: `Backup website lead: ${lead.firstName} ${lead.lastName}`, text, lead, reason: reasonText }),
    });

    if (!response.ok) {
      throw new Error(`Backup lead webhook failed: ${response.status} ${await response.text()}`);
    }
    return;
  }

  throw new Error("Backup email is not configured: set RESEND_API_KEY or BACKUP_LEAD_WEBHOOK_URL");
}

async function createOrUpdateGhlContact(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  projectType: string;
  projectDescription: string;
  bestTime: string;
  sourceUrl: string;
  token: string;
}) {
  const payload = {
    locationId: LOCATION_ID,
    firstName: input.firstName,
    lastName: input.lastName,
    name: `${input.firstName} ${input.lastName}`,
    email: input.email,
    phone: input.phone,
    source: "Oklahoma Remodel Consulting website",
    tags: CONTACT_TAGS,
    customFields: [
      { id: CUSTOM_FIELD_IDS.projectType, key: "contact.project_type", field_value: input.projectType },
      { id: CUSTOM_FIELD_IDS.projectDescription, key: "contact.project_description", field_value: input.projectDescription },
      { id: CUSTOM_FIELD_IDS.city, key: "contact.property_address_city", field_value: input.city },
      { id: CUSTOM_FIELD_IDS.state, key: "contact.property_address_state", field_value: input.state },
      { id: CUSTOM_FIELD_IDS.bestTime, key: "contact.best_time_to_reach", field_value: input.bestTime },
      { id: CUSTOM_FIELD_IDS.sourceUrl, key: "contact.source_url", field_value: input.sourceUrl },
    ],
  };

  const response = await ghlRequest<GhlContactResponse>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(payload),
  }, input.token);

  const contactId = contactIdFrom(response);
  if (!contactId) throw new Error("GoHighLevel contact response did not include a contact id");
  return contactId;
}

async function findExistingOpportunity(contactId: string, token: string) {
  const query = new URLSearchParams({
    location_id: LOCATION_ID,
    pipeline_id: PIPELINE_ID,
    contact_id: contactId,
  });

  const response = await ghlRequest<{ opportunities?: Array<{ id?: string; pipelineStageId?: string; pipelineStageUId?: string; status?: string }> }>(`/opportunities/search?${query.toString()}`, {
    method: "GET",
  }, token);

  return response.opportunities?.find((opportunity) => opportunity.status === "open") ?? response.opportunities?.[0] ?? null;
}

async function createOpportunity(input: { contactId: string; firstName: string; lastName: string; projectType: string; city: string; state: string; token: string }) {
  try {
    return await ghlRequest("/opportunities/", {
      method: "POST",
      body: JSON.stringify({
        locationId: LOCATION_ID,
        pipelineId: PIPELINE_ID,
        pipelineStageId: LANDING_STAGE_ID,
        contactId: input.contactId,
        name: `${input.firstName} ${input.lastName} - ${input.projectType} - ${input.city}, ${input.state}`,
        status: "open",
        monetaryValue: 0,
      }),
    }, input.token);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes("duplicate opportunity")) {
      throw error;
    }

    const existingOpportunity = await findExistingOpportunity(input.contactId, input.token);
    if (!existingOpportunity?.id) {
      throw error;
    }

    return existingOpportunity;
  }
}

async function createMetadataNote(contactId: string, noteBody: string, token: string) {
  return ghlRequest(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body: noteBody }),
  }, token);
}

async function sendGhlEmail(input: { contactId: string; emailTo: string; subject: string; text: string; token: string }) {
  const fromEmail = process.env.GHL_CONFIRMATION_EMAIL_FROM ?? "toby@okcremodelconsulting.com";
  const html = input.text
    .split("\n")
    .map((line) => line.trim() ? `<p>${line.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char] ?? char))}</p>` : "<br />")
    .join("");

  return ghlRequest("/conversations/messages", {
    method: "POST",
    body: JSON.stringify({
      type: "Email",
      locationId: LOCATION_ID,
      contactId: input.contactId,
      emailFrom: fromEmail,
      emailTo: input.emailTo,
      subject: input.subject,
      html,
      message: input.text,
    }),
  }, input.token);
}

async function sendConfirmationEmail(input: { contactId: string; email: string; token: string }) {
  return sendGhlEmail({
    contactId: input.contactId,
    emailTo: input.email,
    subject: CONFIRMATION_EMAIL_SUBJECT,
    text: CONFIRMATION_EMAIL_TEXT,
    token: input.token,
  });
}

async function createOrUpdateOwnerNotificationContact(token: string) {
  const response = await ghlRequest<GhlContactResponse>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId: LOCATION_ID,
      firstName: "OKC Remodel",
      lastName: "Notifications",
      name: "OKC Remodel Notifications",
      email: BACKUP_EMAIL_TO,
      source: "Oklahoma Remodel Consulting website notifications",
    }),
  }, token);

  const contactId = contactIdFrom(response);
  if (!contactId) throw new Error("GoHighLevel owner notification contact response did not include a contact id");
  return contactId;
}

async function sendOwnerNotification(input: { lead: LeadSubmission; token: string }) {
  const ownerContactId = await createOrUpdateOwnerNotificationContact(input.token);

  return sendGhlEmail({
    contactId: ownerContactId,
    emailTo: BACKUP_EMAIL_TO,
    subject: `New OKC Remodel website lead: ${input.lead.firstName} ${input.lead.lastName}`,
    text: leadSummary(input.lead),
    token: input.token,
  });
}

async function bestEffort(label: string, task: Promise<unknown>) {
  try {
    await task;
  } catch (error) {
    console.error(`OKC Remodel ${label} failed`, error instanceof Error ? error.message : String(error));
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const body = req.body ?? {};
  const firstName = asTrimmedString(body.firstName);
  const lastName = asTrimmedString(body.lastName);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const city = asTrimmedString(body.city);
  const state = asTrimmedString(body.state);
  const projectType = asTrimmedString(body.projectType);
  const projectDescription = asTrimmedString(body.projectDescription);
  const bestTime = typeof body.bestTime === "string" ? body.bestTime.trim() : "";
  const sourceUrl = sourceUrlFrom(req, body.sourceUrl);
  const sourceLabel = asTrimmedString(body.sourceLabel) ?? "unknown-form";
  const submittedAt = new Date().toISOString();
  const ipAddress = getClientIp(req);
  const userAgent = getHeader(req, "user-agent") ?? "unknown";

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !city ||
    !state ||
    !projectType ||
    !projectDescription ||
    !REQUIRED_STATES.has(state) ||
    !REQUIRED_PROJECT_TYPES.has(projectType) ||
    body.consent !== true
  ) {
    return res.status(400).json({
      ok: false,
      message: "Please complete all required fields and confirm the advisory-service acknowledgement.",
    });
  }

  try {
    const lead: LeadSubmission = {
      firstName,
      lastName,
      email,
      phone,
      city,
      state,
      projectType,
      projectDescription,
      bestTime,
      sourceUrl,
      sourceLabel,
      submittedAt,
      ipAddress,
      userAgent,
    };
    const token = ghlToken();
    const contactId = await createOrUpdateGhlContact({
      ...lead,
      token,
    });

    await createOpportunity({ contactId, firstName, lastName, projectType, city, state, token });
    await createMetadataNote(contactId, metadataNote({ ipAddress, userAgent, submittedAt, sourceUrl, sourceLabel }), token);
    await bestEffort("owner notification email", sendOwnerNotification({ lead, token }));
    await bestEffort("customer confirmation email", sendConfirmationEmail({ contactId, email, token }));

    return res.status(200).json({
      ok: true,
      message: "Project intake received. You will be called back to schedule your consultation.",
    });
  } catch (error) {
    const lead: LeadSubmission | null = firstName && lastName && email && phone && city && state && projectType && projectDescription
      ? { firstName, lastName, email, phone, city, state, projectType, projectDescription, bestTime, sourceUrl, sourceLabel, submittedAt, ipAddress, userAgent }
      : null;

    console.error("OKC Remodel GHL project intake failed", error instanceof Error ? error.message : String(error));
    if (lead) {
      try {
        await sendBackupEmail(lead, error);
        console.error("OKC Remodel backup lead email sent", { submittedAt, sourceUrl });
      } catch (backupError) {
        console.error("OKC Remodel backup lead email failed", backupError instanceof Error ? backupError.message : String(backupError));
      }
    }
    return res.status(502).json({
      ok: false,
      message: "The form could not be sent. Please email toby@okcremodelconsulting.com.",
    });
  }
}
