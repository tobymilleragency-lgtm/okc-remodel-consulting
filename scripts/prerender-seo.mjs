import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist", "public");
const templatePath = join(dist, "index.html");
const siteUrl = (process.env.SITE_URL || "https://www.okcremodelconsulting.com").replace(/\/$/, "");
const generatedAt = new Date().toISOString();

const baseTemplate = readFileSync(templatePath, "utf8");


function readLocalSeoData() {
  const servicesText = readFileSync(join(root, "client", "src", "data", "services.ts"), "utf8");
  const citiesText = readFileSync(join(root, "client", "src", "data", "cities.ts"), "utf8");
  const serviceMatches = [...servicesText.matchAll(/slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?metaTitle:\s*"([^"]+)"[\s\S]*?metaDescription:\s*"([^"]+)"[\s\S]*?serviceType:\s*"([^"]+)"/g)];
  const services = serviceMatches.map((match) => ({ slug: match[1], name: match[2], metaTitle: match[3], metaDescription: match[4], serviceType: match[5] }));
  const cityBlocks = [...citiesText.matchAll(/\{\s*slug:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?state:\s*"([^"]+)"[\s\S]*?stateFull:\s*"([^"]+)"[\s\S]*?metaTitle:\s*"([^"]+)"[\s\S]*?metaDescription:\s*"([^"]+)"[\s\S]*?enabledCombinations:\s*\[([\s\S]*?)\][\s\S]*?zipCodes:\s*\[([\s\S]*?)\][\s\S]*?nearbyAreas:\s*\[([\s\S]*?)\]/g)];
  const cities = cityBlocks.map((match) => ({
    slug: match[1],
    name: match[2],
    state: match[3],
    stateFull: match[4],
    metaTitle: match[5],
    metaDescription: match[6],
    enabledCombinations: [...match[7].matchAll(/"([^"]+)"/g)].map((item) => item[1]),
    zipCodes: [...match[8].matchAll(/"([^"]+)"/g)].map((item) => item[1]),
    nearbyAreas: [...match[9].matchAll(/"([^"]+)"/g)].map((item) => item[1]),
  }));
  return { services, cities };
}

const localSeoData = readLocalSeoData();

function readSeoResources() {
  const text = readFileSync(join(root, "client", "src", "data", "seoResources.ts"), "utf8");
  const blocks = [...text.matchAll(/\{\s*kind:\s*"(guide|comparison|checklist)"[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?path:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?shortTitle:\s*"([^"]+)"[\s\S]*?description:\s*"([^"]+)"[\s\S]*?hero:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?readTime:\s*"([^"]+)"[\s\S]*?sections:\s*\[([\s\S]*?)\]\s*,\s*faqs:\s*\[([\s\S]*?)\]/g)];
  return blocks.map((match) => {
    const sectionText = match[10];
    const faqText = match[11];
    const headings = [...sectionText.matchAll(/heading:\s*"([^"]+)"/g)].map((item) => item[1]);
    const paragraphs = [...sectionText.matchAll(/paragraphs:\s*\[([\s\S]*?)\]/g)].flatMap((item) => [...item[1].matchAll(/"([^"]+)"/g)].map((p) => p[1]));
    const bullets = [...sectionText.matchAll(/bullets:\s*\[([\s\S]*?)\]/g)].flatMap((item) => [...item[1].matchAll(/"([^"]+)"/g)].map((p) => p[1]));
    const faqs = [...faqText.matchAll(/question:\s*"([^"]+)"\s*,\s*answer:\s*"([^"]+)"/g)].map((item) => ({ question: item[1], answer: item[2] }));
    return { kind: match[1], slug: match[2], path: match[3], title: match[4], shortTitle: match[5], description: match[6], hero: match[7], category: match[8], readTime: match[9], headings, paragraphs, bullets, faqs };
  });
}

const seoResourceData = readSeoResources();
const seoResourceKindMeta = {
  guide: { path: "/guides", title: "Remodel Planning Guides | Oklahoma Remodel Consulting", h1: "Remodel planning answers before contractor commitments.", description: "Detailed homeowner guides for remodel budgets, bid review, allowances, scope development, and contractor questions across Oklahoma City and communities within about 60 miles.", label: "Remodel Planning Guides" },
  comparison: { path: "/compare", title: "Remodel Comparison Guides | Oklahoma Remodel Consulting", h1: "Understand the remodel roles before you choose a path.", description: "Plain-English comparison pages explaining remodel consultants, contractors, bid review, design-build, project management, and contractor vetting.", label: "Remodel Comparison Guides" },
  checklist: { path: "/checklists", title: "Remodel Checklists | Oklahoma Remodel Consulting", h1: "Download-style remodel checklists without the fluff.", description: "Practical planning checklists for kitchen remodels, bathroom bid review, contractor comparison, scope writing, and deposit readiness.", label: "Remodel Checklists" },
};

function seoResourceIndexPages() {
  return Object.entries(seoResourceKindMeta).map(([kind, meta]) => {
    const resources = seoResourceData.filter((item) => item.kind === kind);
    return {
      path: meta.path,
      breadcrumbName: meta.label,
      title: meta.title,
      description: meta.description,
      h1: meta.h1,
      priority: "0.7",
      changefreq: "monthly",
      html: `<section aria-labelledby="resource-index-title"><h1 id="resource-index-title">${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.description)}</p><h2>${escapeHtml(meta.label)}</h2><ul>${resources.map((resource) => `<li><a href="${resource.path}">${escapeHtml(resource.shortTitle)}</a> — ${escapeHtml(resource.description)}</li>`).join("")}</ul><p><a href="/contact">Start your remodel plan</a></p></section>`,
      extraSchemas: [{ "@type": "CollectionPage", "@id": `${siteUrl}${meta.path}#webpage`, name: meta.h1, description: meta.description }, { "@type": "ItemList", name: meta.label, itemListElement: resources.map((resource, index) => ({ "@type": "ListItem", position: index + 1, name: resource.shortTitle, url: `${siteUrl}${resource.path}` })) }],
    };
  });
}

function seoResourceDetailPages() {
  return seoResourceData.map((resource) => ({
    path: resource.path,
    breadcrumbName: resource.shortTitle,
    title: resource.title,
    description: resource.description,
    h1: resource.shortTitle,
    priority: "0.65",
    changefreq: "monthly",
    mainEntity: { "@id": `${siteUrl}${resource.path}#article` },
    html: `<article aria-labelledby="resource-title"><h1 id="resource-title">${escapeHtml(resource.shortTitle)}</h1><p>${escapeHtml(resource.hero)}</p><p>${escapeHtml(resource.description)}</p>${resource.headings.map((heading, index) => `<section><h2>${escapeHtml(heading)}</h2>${renderParagraphs(resource.paragraphs.slice(index * 2, index * 2 + 2))}${index === 0 && resource.bullets.length ? renderList(resource.bullets.slice(0, 8)) : ""}</section>`).join("")}<section><h2>Common questions</h2><dl>${resource.faqs.map((faq) => `<dt>${escapeHtml(faq.question)}</dt><dd>${escapeHtml(faq.answer)}</dd>`).join("")}</dl></section><p><a href="/contact">Start your remodel plan</a></p></article>`,
    extraSchemas: [
      { "@type": ["Article", "BlogPosting"], "@id": `${siteUrl}${resource.path}#article`, headline: resource.shortTitle, description: resource.description, articleSection: resource.category, author: { "@id": `${siteUrl}/about#toby-miller` }, publisher: { "@id": `${siteUrl}/#business` }, inLanguage: "en-US" },
      { "@type": "FAQPage", mainEntity: resource.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    ],
  }));
}
const shouldIndexLocalSeo = process.env.VITE_ENABLE_LOCAL_SEO_INDEXING !== "false";
const localSeoRobots = shouldIndexLocalSeo ? "index,follow" : "noindex,nofollow";
const localSeoGenericDescription = "Independent remodel consulting with scope planning, budget guidance, contractor vetting, and bid review for homeowners in Oklahoma City and communities within about 60 miles.";


function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function words(text) {
  return String(text).trim().split(/\s+/).filter(Boolean).length;
}

const sharedSeoParagraphs = [
  "A remodel planning page should help a homeowner understand what needs to happen before a contractor agreement is signed. Oklahoma Remodel Consulting focuses on scope clarity, realistic budget expectations, contractor fit, and independent bid review so the homeowner can compare proposals with more confidence.",
  "The consulting process is intentionally separate from the construction contract. Contractors perform the construction work, provide firm pricing, manage crews, handle warranties, and contract directly with the homeowner. Our role is to help organize the decisions that come before that commitment.",
  "Strong remodel planning names the work clearly. It also identifies what is unknown, what should be verified on site, which finish levels are assumed, how allowances are handled, who is responsible for prep and cleanup, and which questions should be answered before money changes hands.",
  "Homeowners in Oklahoma City and communities within about 60 miles often deal with older homes, rural access, storm exposure, material availability, uneven floors, prior remodel work, and contractor scheduling constraints. Those local realities make written scope and bid comparison especially important.",
  "A useful consultation does not pressure the homeowner into a quick signature. It slows the decision down enough to review priorities, compare assumptions, understand risks, and decide whether the project is ready for contractor pricing or still needs more planning.",
  "When bids arrive, the bottom-line number is only one part of the decision. The homeowner should also compare exclusions, allowances, communication, schedule expectations, cleanup standards, warranty language, site protection, payment structure, and how clearly the contractor describes the work.",
  "This page is written for real homeowners and for local search visibility. The content uses readable sections, short paragraphs, service-specific language, local context, FAQs, and related service links instead of one large wall of text.",
  "The goal is a better-informed homeowner. With a clearer scope, contractors can respond to the same expectations, and the homeowner can choose a path with less confusion before construction begins."
];

function serviceSeoCopy(service) {
  const lower = service.name.toLowerCase();
  return [
    `${service.name} is for homeowners who want a stronger plan before they ask contractors for firm pricing. A remodel estimate is only useful when the request is clear, the finish level is understood, and each contractor is responding to the same expectations. Oklahoma Remodel Consulting helps turn early ideas into an organized scope so the homeowner can compare options with less guesswork.`,
    `Many ${lower} conversations start with a broad question like what should this cost. The better question is what exactly is being priced, what assumptions are included, and what decisions still need to be made before a reliable number is possible. We help identify those details before deposits, allowances, or change orders create confusion.`,
    `The goal is not to replace the contractor. The goal is to prepare the homeowner before contractor selection begins. We stay in the advisory role, help clarify priorities, and point out scope gaps that can make bids look similar while actually describing different levels of work.`,
    `For homeowners in Oklahoma City and communities within about 60 miles, local conditions can affect schedule, access, material choices, and contractor availability. A clear planning process gives contractors better information and gives the homeowner a calmer way to decide who is the right fit.`,
    `${service.name} also helps homeowners understand the difference between a planning range and a construction price. A planning range can guide priorities, but a contractor price should be tied to a defined scope, site conditions, material choices, and labor assumptions. We help the homeowner keep those categories separate so an early number is not mistaken for a complete commitment.`,
    `A good ${lower} page should answer the search intent behind remodel planning, contractor vetting, bid review, scope development, and budget guidance. Homeowners are often looking for a way to slow down the decision, understand what should be written down, and avoid comparing bids that use different assumptions. This service is built around that need for clarity.`,
    `The consulting conversation also looks at communication fit. A contractor may have the right skills but still be a poor match if the proposal is vague, the schedule is unclear, or the payment expectations are not explained. We help homeowners evaluate more than price, including responsiveness, detail, exclusions, allowances, cleanup, warranty language, and project boundaries.`,
    `By the end of the planning step, the homeowner should have a better sense of what matters most, what questions remain open, and what a contractor should verify before work begins. That preparation supports stronger local SEO content because it reflects real homeowner concerns instead of generic remodeling claims.`
  ];
}

function citySeoCopy(city) {
  const nearby = city.nearbyAreas.slice(0, 4).join(", ");
  return [
    `Remodel consulting in ${city.name}, ${city.state} is most useful before the project becomes a signed construction agreement. Homeowners often know what they want to improve, but they may not know which details should be decided before bids are compared. Oklahoma Remodel Consulting helps organize those decisions into a practical planning path.`,
    `${city.name} projects can involve older homes, prior remodel work, rural access, weather exposure, uneven floors, utility questions, and different expectations from one contractor to another. Those issues do not always appear in a short estimate. We help homeowners ask better questions before assuming every bid includes the same work.`,
    `The consulting process is designed to protect clarity. We help define the work, discuss budget ranges, identify unknowns, and review contractor proposals from the homeowner side of the conversation. Contractors still provide firm construction pricing, manage crews, and contract directly with the homeowner.`,
    `For homes around ${(city.zipCodes || []).join(" and ")}, the best remodel decisions usually come from better preparation, not pressure. A written scope, plain-language bid comparison, and early discussion of risk can reduce confusion when it is time to choose a contractor.`,
    `Local searchers in ${city.name} are often looking for remodel planning, contractor vetting, bid review, kitchen remodel guidance, bathroom remodel guidance, basement planning, exterior project advice, or help comparing bids. This page is written to answer those practical questions while keeping the content readable for homeowners, not just search engines.`,
    `Nearby areas such as ${nearby} can affect contractor availability, travel expectations, supplier access, and scheduling. Those details may not change the homeowner's goal, but they can change how a project should be discussed before bids are trusted. We help turn location-specific concerns into questions that belong in the planning conversation.`,
    `A city service-area page should not promise code, engineering, insurance, or legal answers. Instead, it should help homeowners know what to ask about permits, inspections, trade responsibilities, payment timing, cleanup, warranties, and change orders. That kind of preparation gives the homeowner a clearer role before construction begins.`,
    `Oklahoma Remodel Consulting keeps the focus on scope clarity and contractor fit. The homeowner remains in control of the contractor choice, and the construction contract stays directly between the homeowner and the contractor. Our role is to make the decision better informed before money, schedule, and expectations are locked in.`
  ];
}

function serviceCitySeoCopy(service, city) {
  const lower = service.name.toLowerCase();
  return [
    `${service.name} in ${city.name}, ${city.state} gives homeowners a local planning step before bids and deposits become serious commitments. The service is built for people who want to understand scope, budget assumptions, contractor fit, and risk before they sign a construction agreement.`,
    `A ${lower} project in ${city.name} can look simple at the idea stage, but the price depends on details that need to be named early. Finish expectations, access, sequencing, materials, prep work, cleanup, and local requirements can all affect what a contractor includes. We help put those questions on the table before bids are treated as final.`,
    `Oklahoma Remodel Consulting is advisor-led. That means we do not sell the construction work or push a homeowner toward a fast signature. We help shape a clearer scope, compare contractor responses, and explain differences so the homeowner can choose with more confidence.`,
    `For homeowners near ${city.nearbyAreas.slice(0, 3).join(", ")} and the broader tri-state region, this approach creates a more useful path from first idea to contractor selection. The construction contract stays directly between the homeowner and the contractor, while the planning support stays focused on homeowner clarity.`,
    `Search intent matters on a local service page. Someone looking for ${lower} in ${city.name} is usually trying to understand cost, timing, contractor reliability, scope detail, and whether a project is ready for bids. The page should answer those concerns with specific planning guidance instead of thin local copy.`,
    `The strongest local remodel pages combine the project type with the local market. In ${city.name}, that means discussing property conditions, nearby service areas, contractor availability, access, budget expectations, and the questions that protect the homeowner before a deposit is paid.`,
    `This consulting process helps homeowners compare proposals with a better framework. A lower bid may omit prep work, use lighter allowances, skip cleanup details, or leave responsibility unclear. A higher bid may include more complete work. We help identify the difference before the homeowner chooses a contractor.`,
    `The final decision remains with the homeowner. Our job is to help make that decision more informed by organizing scope, clarifying assumptions, reviewing bid language, and pointing out questions that should be answered before construction starts.`
  ];
}

function renderParagraphs(items) {
  return items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
}

function renderList(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function guidanceSections(paragraphs, titles) {
  const sections = [];
  for (let index = 0; index < paragraphs.length; index += 2) {
    sections.push({
      title: titles[Math.floor(index / 2)] ?? "Planning detail",
      paragraphs: paragraphs.slice(index, index + 2),
    });
  }
  return sections;
}

function renderGuidanceSections(sections) {
  return sections.map((section) => `<section><h3>${escapeHtml(section.title)}</h3>${renderParagraphs(section.paragraphs)}</section>`).join("\n");
}

function localSeoGuidance(page) {
  if (page.localSeoType === "service") {
    return guidanceSections(serviceSeoCopy(page.service), ["Start with scope clarity", "Protect the homeowner role", "Separate ranges from real prices", "Compare more than the number"]);
  }
  if (page.localSeoType === "city") {
    return guidanceSections(citySeoCopy(page.city), ["Local planning context", "Budget and bid assumptions", "Nearby market realities", "Questions before commitment"]);
  }
  if (page.localSeoType === "service-city") {
    return guidanceSections(serviceCitySeoCopy(page.service, page.city), ["Local service planning", "Advisor-led scope review", "Market-specific bid questions", "How proposals get compared"]);
  }
  return guidanceSections(sharedSeoParagraphs, ["Planning context", "Advisor role", "Scope clarity", "Bid comparison"]);
}

function topicFor(page) {
  if (page.localSeoType === "service") return page.service.name;
  if (page.localSeoType === "city") return `remodel consulting in ${page.city.name}, ${page.city.state}`;
  if (page.localSeoType === "service-city") return `${page.service.name} in ${page.city.name}, ${page.city.state}`;
  return "remodel consulting";
}

function richLocalSeoHtml(page) {
  const intro = page.description || localSeoGenericDescription;
  const topic = topicFor(page);
  const guidance = localSeoGuidance(page);
  const paragraphs = guidance.flatMap((section) => section.paragraphs);
  const visibleText = [page.h1, intro, topic, ...paragraphs, ...sharedSeoParagraphs].join(" ");
  void words(visibleText);
  return `<section aria-labelledby="local-seo-title"><h1 id="local-seo-title">${escapeHtml(page.h1)}</h1><p>${escapeHtml(intro)}</p></section>
<section><h2>${escapeHtml(topic)} planning overview</h2>${renderParagraphs(paragraphs.slice(0, 2))}</section>
<section><h2>What homeowners should clarify before bids</h2>${renderList(["Written scope boundaries", "Budget assumptions and allowances", "Contractor responsibilities", "Schedule, access, cleanup, and warranty expectations", "Questions that need site verification"])}</section>
<section><h2>Readable guidance by decision point</h2>${renderGuidanceSections(guidance)}<h3>What this protects</h3>${renderList(["Comparable contractor bids", "Clearer budget expectations", "Better scope documentation", "Fewer rushed decisions", "More confident contractor selection"])}</section>
<section><h2>Local SEO remodel guidance</h2>${renderParagraphs(sharedSeoParagraphs.slice(0, 4))}</section>
<section><h2>Bid review and contractor fit</h2>${renderParagraphs(sharedSeoParagraphs.slice(4))}<p>Each service and city page is organized into short sections, practical checklists, FAQs, and related local links so homeowners can scan the guidance without reading a wall of text.</p></section>`;
}

function localSeoSchemaGraph(page) {
  const graph = [
    businessSchema,
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "Oklahoma Remodel Consulting", url: siteUrl, publisher: { "@id": `${siteUrl}/#business` } },
    { "@type": "WebPage", "@id": `${routeUrl(page.path)}#webpage`, url: routeUrl(page.path), name: page.title, description: page.description, isPartOf: { "@id": `${siteUrl}/#website` }, about: { "@id": `${siteUrl}/#business` } },
  ];
  if (page.localSeoType === "service") {
    graph.push({ "@type": "Service", name: page.service.name, provider: { "@id": `${siteUrl}/#business` }, serviceType: page.service.serviceType, areaServed: localSeoData.cities.map((city) => `${city.name}, ${city.state}`) });
    graph.push({ "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: `What does ${page.service.name} include?`, acceptedAnswer: { "@type": "Answer", text: page.service.metaDescription } }] });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: page.service.name, item: routeUrl(page.path) },
    ] });
  }
  if (page.localSeoType === "city") {
    graph.push({ "@type": "Place", name: `${page.city.name}, ${page.city.state}`, containedInPlace: page.city.stateFull, additionalProperty: [{ name: "areaServed", value: [page.city.name, ...page.city.nearbyAreas].join(", ") }], subjectOf: { "@id": `${siteUrl}/#business` } });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Service Area", item: `${siteUrl}/serving` },
      { "@type": "ListItem", position: 3, name: `${page.city.name}, ${page.city.state}`, item: routeUrl(page.path) },
    ] });
  }
  if (page.localSeoType === "service-city") {
    graph.push({ "@type": "Service", name: `${page.service.name} in ${page.city.name}, ${page.city.state}`, provider: { "@id": `${siteUrl}/#business` }, serviceType: page.service.serviceType, areaServed: `${page.city.name}, ${page.city.state}` });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: page.service.name, item: `${siteUrl}/services/${page.service.slug}` },
      { "@type": "ListItem", position: 4, name: `${page.city.name}, ${page.city.state}`, item: routeUrl(page.path) },
    ] });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function localSeoPage(path, title, h1, type, data = {}) {
  return {
    path,
    breadcrumbName: h1,
    title,
    description: data.service?.metaDescription || data.city?.metaDescription || localSeoGenericDescription,
    h1,
    priority: type === "service-index" ? "0.9" : type === "service" ? "0.9" : type === "serving-index" ? "0.8" : type === "city" ? "0.8" : "0.7",
    changefreq: "monthly",
    isLocalSeo: true,
    localSeoType: type,
    ...data,
    html: richLocalSeoHtml({ path, title, h1, localSeoType: type, ...data, description: data.service?.metaDescription || data.city?.metaDescription || localSeoGenericDescription }),
  };
}

function buildLocalSeoPages() {
  const serviceIndex = localSeoPage("/services", "Services | Oklahoma Remodel Consulting", "Services", "service-index", { description: "Explore remodel consulting services for scope planning, budget guidance, contractor vetting, and independent bid review across the tri-state service area." });
  const servicePages = localSeoData.services.map((service) => localSeoPage(`/services/${service.slug}`, service.metaTitle, service.name, "service", { service, description: service.metaDescription }));
  const servingIndex = localSeoPage("/serving", "Service Area | Oklahoma Remodel Consulting", "Service Area", "serving-index", { description: "Oklahoma Remodel Consulting serves homeowners in Oklahoma City and communities within about 60 miles with remodel planning and contractor guidance." });
  const cityPages = localSeoData.cities.map((city) => localSeoPage(`/serving/${city.slug}`, city.metaTitle, `Remodel Consulting in ${city.name}, ${city.state}`, "city", { city, description: city.metaDescription }));
  const combos = localSeoData.cities.flatMap((city) => city.enabledCombinations.map((serviceSlug) => {
    const service = localSeoData.services.find((item) => item.slug === serviceSlug);
    return service ? localSeoPage(`/services/${service.slug}/${city.slug}`, `${service.name} in ${city.name}, ${city.state} | Oklahoma Remodel Consulting`, `${service.name} in ${city.name}, ${city.state}`, "service-city", { service, city, description: `${service.name} in ${city.name}, ${city.state} with independent remodel scope planning, budget guidance, contractor vetting, and bid review.` }) : null;
  }).filter(Boolean));
  return [serviceIndex, ...servicePages, servingIndex, ...cityPages, ...combos];
}

const localSeoPages = buildLocalSeoPages();

const serviceArea = [
  "Central Oklahoma",
  "Central Oklahoma",
  "Central Oklahoma",
  "Oklahoma City OK",
  "Parsons OK",
  "Pittsburg OK",
  "Independence OK",
  "Coffeyville OK",
  "Miami OK",
  "Vinita OK",
  "Grove OK",
  "Joplin MO",
  "Carthage MO",
  "Webb City MO",
];

const serviceEntities = [
  {
    "@type": "Service",
    "@id": `${siteUrl}/#service-remodel-planning`,
    name: "Remodel planning",
    serviceType: "Residential remodel planning",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#business` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#service-scope-development`,
    name: "Scope development",
    serviceType: "Preliminary residential remodel scope development",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#business` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#service-contractor-matching`,
    name: "Contractor matching",
    serviceType: "Vetted local contractor matching",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#business` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#service-bid-review`,
    name: "Bid review",
    serviceType: "Independent contractor bid review",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#business` },
  },
  {
    "@type": "Service",
    "@id": `${siteUrl}/#service-project-advocacy`,
    name: "Project advocacy",
    serviceType: "Homeowner project advocacy through completion",
    areaServed: serviceArea,
    provider: { "@id": `${siteUrl}/#business` },
  },
];

const businessSchema = {
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${siteUrl}/#business`,
  name: "Oklahoma Remodel Consulting",
  legalName: "Oklahoma Remodel Consulting LLC",
  url: siteUrl,
  email: "toby@okcremodelconsulting.com",
  description:
    "Independent residential remodel advisory, planning, realistic budgeting, and vetted contractor matching for homeowners in Oklahoma City and communities within about 60 miles.",
  priceRange: "Free planning consultation; advisory pricing discussed before engagement",
  areaServed: serviceArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oklahoma City",
    addressRegion: "OK",
    postalCode: "67356",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.1675652,
    longitude: -95.1099645,
  },
  founder: { "@id": `${siteUrl}/about#toby-miller` },
  knowsAbout: [
    "Residential remodel planning",
    "Project scope development",
    "Realistic remodel budgeting",
    "Contractor matching",
    "Contractor bid review",
    "Homeowner advocacy",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential remodel advisory services",
    itemListElement: serviceEntities.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@id": service["@id"] },
    })),
  },
};

function breadcrumbSchema(page) {
  if (page.path === "/") return null;
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
  ];
  if (page.path.startsWith("/blog/") && page.path !== "/blog") {
    items.push({ "@type": "ListItem", position: 2, name: "Blog", item: routeUrl("/blog") });
    items.push({ "@type": "ListItem", position: 3, name: page.breadcrumbName, item: routeUrl(page.path) });
  } else {
    items.push({ "@type": "ListItem", position: 2, name: page.breadcrumbName, item: routeUrl(page.path) });
  }
  return {
    "@type": "BreadcrumbList",
    "@id": `${routeUrl(page.path)}#breadcrumb`,
    itemListElement: items,
  };
}

const faqItems = [
  {
    question: "Are you a contractor?",
    answer: "No. Oklahoma Remodel Consulting is an advisory service. Contractors perform the construction work and the homeowner contracts directly with the contractor.",
  },
  {
    question: "How much does this cost?",
    answer: "The first planning conversation is free. If the project is a fit, any advisory pricing is discussed clearly before engagement.",
  },
  {
    question: "What kinds of projects do you handle?",
    answer: "Common projects include bathroom, kitchen, flooring, additions, decks, whole-home, exterior, basement, new construction, roof, and other residential remodel planning needs.",
  },
  {
    question: "Where are you located and what areas do you serve?",
    answer: "Oklahoma Remodel Consulting is based in Oklahoma City, Oklahoma and serves Oklahoma City and communities within about 60 miles communities within roughly 60 to 70 miles.",
  },
  {
    question: "Can you give me a price for my project?",
    answer: "Oklahoma Remodel Consulting helps shape realistic planning ranges and review contractor bids, but contractors provide the actual construction pricing.",
  },
];

const blogArticlePages = [
  {
    path: "/blog/why-homeowners-need-construction-experience-on-their-side",
    headline: "Why Homeowners Need Real Construction Experience on Their Side Before a Remodel Starts",
    title: "Why Homeowners Need Real Construction Experience | Oklahoma Remodel Consulting",
    description: "A remodel is too expensive to enter blind. Learn why having an experienced construction advisor on the homeowner's side can protect scope, budget, decisions, and confidence.",
    category: "Homeowner Advocacy",
    datePublished: "2026-05-15",
    dateModified: generatedAt.slice(0, 10),
  },
  {
    path: "/blog/how-vetted-contractors-save-money-and-headaches",
    headline: "How Vetted Contractors and Independent Guidance Can Save Homeowners Money, Time, and Headaches",
    title: "How Vetted Contractors Save Money and Headaches | Oklahoma Remodel Consulting",
    description: "The cheapest remodel bid can become the most expensive mistake. See how planning, bid review, and vetted contractor matching can reduce costly surprises.",
    category: "Remodel Planning",
    datePublished: "2026-05-15",
    dateModified: generatedAt.slice(0, 10),
  },
];

function blogPostingSchema(article) {
  return {
    "@type": ["Article", "BlogPosting"],
    "@id": `${routeUrl(article.path)}#article`,
    mainEntityOfPage: { "@id": `${routeUrl(article.path)}#webpage` },
    headline: article.headline,
    name: article.title,
    description: article.description,
    articleSection: article.category,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    image: `${siteUrl}/og-image.svg`,
    author: { "@id": `${siteUrl}/about#toby-miller` },
    publisher: { "@id": `${siteUrl}/#business` },
    inLanguage: "en-US",
  };
}

const blogSchemas = [
  {
    "@type": ["Blog", "CollectionPage"],
    "@id": `${siteUrl}/blog#blog`,
    name: "Remodel Planning Blog",
    url: `${siteUrl}/blog`,
    description: "Remodel planning guidance from Oklahoma Remodel Consulting on homeowner advocacy, realistic budgets, vetted contractors, and avoiding contractor roulette.",
    publisher: { "@id": `${siteUrl}/#business` },
  },
  {
    "@type": "ItemList",
    "@id": `${siteUrl}/blog#article-list`,
    name: "Oklahoma Remodel Consulting articles",
    itemListElement: blogArticlePages.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.headline,
      url: routeUrl(article.path),
      item: { "@id": `${routeUrl(article.path)}#article` },
    })),
  },
];

const pages = [
  {
    path: "/",
    breadcrumbName: "Home",
    title: "Oklahoma Remodel Consulting | Remodel advisor in Oklahoma City, OK",
    description: "Oklahoma City, OK remodel advisor helping homeowners plan scope, budget realistically, compare bids, and match with vetted local contractors.",
    h1: "Renovation, without the contractor roulette.",
    html: `
      <section aria-labelledby="home-title">
        <p>Independent remodel advisor serving Oklahoma City, Oklahoma City and communities within about 60 miles.</p>
        <h1 id="home-title">Renovation, without the contractor roulette.</h1>
        <p>High-touch remodel planning, realistic budgeting, and vetted contractor matching for homeowners who want clarity before signing anything.</p>
        <p>Oklahoma Remodel Consulting is an advisor, not a contractor. Your construction contract, when you are ready, is directly between you and the contractor.</p>
        <h2>How it works</h2>
        <ol>
          <li>Intake call</li>
          <li>We'll call you back within one business day</li>
          <li>Home visit and preliminary scope development</li>
          <li>Decision and refundable deposit</li>
          <li>Contractor matching and bid review</li>
          <li>Project advocacy through completion</li>
        </ol>
        <h2>What we do</h2>
        <ul>
          <li>Listen to your remodel goals, constraints, and timeline.</li>
          <li>Define realistic project scope and trade-offs.</li>
          <li>Build a practical budget range for planning.</li>
          <li>Match your scope with vetted local contractors.</li>
          <li>Review contractor bids independently.</li>
        </ul>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not perform construction work.</li>
          <li>We do not supervise contractor labor.</li>
          <li>We do not make warranty commitments for contractors.</li>
          <li>We do not provide legal, insurance, structural, electrical, plumbing, heating and cooling, or engineering advice.</li>
        </ul>
        <p>Base: Oklahoma City, OK 73102. Service area: Oklahoma City and communities within about 60 miles.</p>
        <p><a href="/how-it-works">See how the advisory process works</a> or <a href="/contact">start your project</a>.</p>
      </section>`,
  },
  {
    path: "/how-it-works",
    breadcrumbName: "How It Works",
    title: "How Oklahoma Remodel Consulting Works | Remodel Planning Process",
    description: "Advisor-led remodel planning process for Oklahoma City-area homeowners: intake, scope, realistic budget, contractor matching, bid review, and advocacy.",
    h1: "From remodel anxiety to a clear, contractor-ready plan.",
    html: `
      <section aria-labelledby="process-title">
        <h1 id="process-title">From remodel anxiety to a clear, contractor-ready plan.</h1>
        <p>Oklahoma Remodel Consulting gives homeowners in Oklahoma City and communities within about 60 miles an advisor-led process while keeping the homeowner in control of contractor selection.</p>
        <h2>Every step has a purpose.</h2>
        <ol>
          <li><strong>Initial call with Grace.</strong> Basic project information is collected quickly so the callback starts informed.</li>
          <li><strong>We'll call you back.</strong> You'll get a call back to schedule your consultation and clarify goals, constraints, and timing.</li>
          <li><strong>Home visit, estimate, and scope development.</strong> Toby helps shape a preliminary scope and realistic planning range.</li>
          <li><strong>Decision and commitment.</strong> If you move forward, the refundable deposit starts the advisory process.</li>
          <li><strong>Contractor matching and bid review.</strong> Your scope is matched with vetted local contractors and the bids are reviewed with you.</li>
          <li><strong>Project advocacy through completion.</strong> Oklahoma Remodel Consulting remains your advisor while the independent contractor performs the work.</li>
        </ol>
        <h2>Frequently asked questions</h2>
        <dl>
          ${faqItems.map((item) => `<dt>${item.question}</dt><dd>${item.answer}</dd>`).join("\n          ")}
        </dl>
        <h2>The fine print, made plain.</h2>
        <p>We advise. Contractors build. You choose the contractor you want to hire.</p>
        <p>Base: Oklahoma City, OK 73102. Service area: Oklahoma City and communities within about 60 miles.</p>
        <p><a href="/contact">Start with clarity</a></p>
      </section>`,
    extraSchemas: [
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/how-it-works#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  },
  {
    path: "/about",
    breadcrumbName: "About",
    title: "About Oklahoma Remodel Consulting | Veteran-Owned Remodel Advisor",
    description: "Veteran-owned remodel advisory business in Oklahoma City, OK serving Oklahoma City and communities within about 60 miles homeowners.",
    h1: "Calm expertise before the first contractor walks in.",
    html: `
      <section aria-labelledby="about-title">
        <h1 id="about-title">Calm expertise before the first contractor walks in.</h1>
        <p>Oklahoma Remodel Consulting was built to help homeowners make remodel decisions with discipline, clarity, and realistic expectations.</p>
        <h2>Built on discipline, not guesswork.</h2>
        <p>Founded by Toby Miller, a U.S. Army veteran, Oklahoma Remodel Consulting brings a structured advisory process to the messy early stage of remodeling.</p>
        <h2>Premium remodel guidance for the Four States region.</h2>
        <p>Service areas include Oklahoma City, Parsons, Pittsburg, Independence, Coffeyville, and surrounding communities in Central Oklahoma; Miami, Vinita, Grove, and nearby Central Oklahoma communities; and Joplin, Carthage, Webb City, and Central Oklahoma.</p>
        <h2>The boundary is the promise.</h2>
        <p>Oklahoma Remodel Consulting is not the contractor. The service is independent advice, scope clarity, contractor matching, bid review, and homeowner advocacy.</p>
        <p><a href="/contact">Ask about your location</a></p>
      </section>`,
    extraSchemas: [
      {
        "@type": "Person",
        "@id": `${siteUrl}/about#toby-miller`,
        name: "Toby Miller",
        worksFor: { "@id": `${siteUrl}/#business` },
        founder: { "@id": `${siteUrl}/#business` },
        jobTitle: "Founder, Oklahoma Remodel Consulting",
        knowsAbout: [
          "Residential remodeling",
          "Remodel planning",
          "Contractor bid review",
          "Project scope development",
          "Homeowner advocacy",
        ],
      },
    ],
  },
  {
    path: "/blog",
    breadcrumbName: "Blog",
    title: "Remodel Planning Blog | Oklahoma Remodel Consulting",
    description: "Read remodel planning guidance from Oklahoma Remodel Consulting on homeowner advocacy, realistic budgets, vetted contractors, and avoiding contractor roulette.",
    h1: "Clear advice before the remodel gets expensive.",
    mainEntity: { "@id": `${siteUrl}/blog#blog` },
    html: `
      <section aria-labelledby="blog-title">
        <h1 id="blog-title">Clear advice before the remodel gets expensive.</h1>
        <p>Practical homeowner guidance on scope, budget, contractor selection, and why independent construction experience matters before you sign.</p>
        <h2>Latest articles</h2>
        <article>
          <h3><a href="/blog/why-homeowners-need-construction-experience-on-their-side">Why Homeowners Need Real Construction Experience on Their Side Before a Remodel Starts</a></h3>
          <p>A remodel is too expensive to enter blind. Learn why having an experienced construction advisor on the homeowner's side can protect scope, budget, decisions, and confidence.</p>
        </article>
        <article>
          <h3><a href="/blog/how-vetted-contractors-save-money-and-headaches">How Vetted Contractors and Independent Guidance Can Save Homeowners Money, Time, and Headaches</a></h3>
          <p>The cheapest remodel bid can become the most expensive mistake. See how planning, bid review, and vetted contractor matching can reduce costly surprises.</p>
        </article>
      </section>`,
    extraSchemas: blogSchemas,
  },
  {
    path: "/blog/why-homeowners-need-construction-experience-on-their-side",
    breadcrumbName: "Why Homeowners Need Real Construction Experience",
    title: "Why Homeowners Need Real Construction Experience | Oklahoma Remodel Consulting",
    description: "A remodel is too expensive to enter blind. Learn why having an experienced construction advisor on the homeowner's side can protect scope, budget, decisions, and confidence.",
    h1: "Why Homeowners Need Real Construction Experience on Their Side Before a Remodel Starts",
    mainEntity: { "@id": `${siteUrl}/blog/why-homeowners-need-construction-experience-on-their-side#article` },
    html: `
      <article aria-labelledby="construction-experience-title">
        <h1 id="construction-experience-title">Why Homeowners Need Real Construction Experience on Their Side Before a Remodel Starts</h1>
        <p>Real construction experience changes the conversation before the first bid is signed.</p>
        <p>Most homeowners do not start a remodel because they want a construction education. They start because the kitchen no longer works for the family, the bathroom is outdated, the flooring is worn out, the deck is unsafe, or the home needs to change with the way life is changing. The problem is that remodeling quickly turns into a construction education whether the homeowner wants one or not. There are scopes, allowances, hidden conditions, material choices, trades, schedules, deposits, change orders, and bids that can look similar on paper while meaning very different things in real life.</p>
        <p>That is why having someone with actual construction experience on the homeowner's side matters. Not theory. Not a sales script. Not a checklist downloaded from the internet. Real field experience changes the way a project is evaluated from the beginning. Someone who has built, repaired, estimated, coordinated, and cleaned up after bad work sees risk differently. They know the difference between a vague promise and a workable scope. They know when a bid is missing the hard parts. They know when a timeline sounds too perfect. They know when a homeowner is being rushed past decisions that should be slowed down.</p>
        <p>A contractor may be skilled, honest, and capable, but the contractor is still bidding the job from the contractor's side of the table. That is not automatically a bad thing. It is simply the structure of the relationship. The contractor is responsible for pricing, staffing, scheduling, and protecting their own business. The homeowner is responsible for choosing wisely, understanding what is included, and living with the result. If the homeowner does not know what questions to ask, the project can be off track before demolition starts.</p>
        <p>Real construction experience helps turn a homeowner's ideas into something contractors can actually price. A homeowner may say, "We want to update the bathroom." That can mean paint and fixtures, or it can mean moving plumbing, waterproofing a shower, replacing subfloor, changing electrical, adding ventilation, and correcting years of hidden damage. Those are not small differences. They are the difference between a light refresh and a serious remodel. Before a homeowner compares bids, the homeowner needs to understand what the bids are supposed to include.</p>
        <p>An experienced advisor can also spot the danger in incomplete language. Words like "install tile," "update plumbing," or "repair as needed" may sound reasonable, but they can leave too much room for confusion. What tile pattern? What underlayment? What waterproofing method? What trim? What happens if damage is found? Who supplies fixtures? Who hauls debris? Who is responsible for permits if required? These details are not nitpicking. They are the project. When they are unclear, the homeowner is exposed to arguments, delays, and extra costs later.</p>
        <p>The value of experience also shows up in budget conversations. Many homeowners search online for remodel costs and find numbers that do not match their home, their area, or their expectations. A realistic planning range is not a guarantee, but it is a necessary guardrail. Without one, homeowners can waste time chasing bids that are too low to be real or too high because the scope is poorly explained. Someone with construction background can help identify what parts of the project are likely driving cost and where trade-offs may exist.</p>
        <p>Experience matters even more when comparing contractors. A polished conversation does not always equal a strong contractor. A low number does not always equal a good deal. A long bid does not always mean a complete bid. The homeowner needs help understanding the difference between a contractor who has thought through the work and one who is guessing. The best contractor match is not always the cheapest. It is the one whose skills, schedule, communication, and pricing fit the actual project.</p>
        <p>This is especially important because remodeling happens inside someone's home. Bad decisions are not abstract. They affect daily routines, family stress, safety, and finances. A project that goes sideways can leave a homeowner without a working bathroom, with unfinished flooring, or with money tied up in a job that is not moving. Having an advisor involved early gives the homeowner a better chance to prevent those situations instead of reacting after the damage is done.</p>
        <p>At Oklahoma Remodel Consulting, the point is not to replace the contractor. The point is to help the homeowner become prepared before choosing one. We are an advisor, not the contractor. That separation matters. The construction agreement remains between the homeowner and the contractor. Our role is to help define the scope, set realistic expectations, review options, match the project with vetted contractors, and stay involved as an advocate for the homeowner.</p>
        <p>A remodel will always involve decisions and some uncertainty. Older homes can hide surprises. Material lead times can change. Weather, schedules, and site conditions can affect progress. But uncertainty is not the same as confusion. When a homeowner has someone with real construction experience on their side, the process becomes clearer. Questions get sharper. Bids become easier to compare. Red flags are easier to see. The homeowner can move forward with more confidence and less fear of contractor roulette.</p>
        <p>The earlier that experience is brought into the process, the more useful it becomes. Once a bad contract is signed, a deposit is paid, or demolition has started, the options are more limited. The best time to protect a remodel is before the first contractor walks in with a bid. That is where experienced guidance can make the biggest difference: at the beginning, when scope, budget, and contractor selection are still within the homeowner's control.</p>
        <p>For many families, the most important part of that guidance is having a calm voice in the room who knows what normal looks like. A homeowner may not know whether a payment request is reasonable, whether a missing line item matters, or whether a contractor's answer is complete. An experienced advisor can slow the conversation down, translate construction language into plain English, and help the homeowner make decisions from understanding instead of pressure. That kind of support does not make the remodel perfect, but it can make the process far more informed, disciplined, and fair.</p>
      </article>`,
    extraSchemas: [blogPostingSchema(blogArticlePages[0])],
  },
  {
    path: "/blog/how-vetted-contractors-save-money-and-headaches",
    breadcrumbName: "How Vetted Contractors Save Money and Headaches",
    title: "How Vetted Contractors Save Money and Headaches | Oklahoma Remodel Consulting",
    description: "The cheapest remodel bid can become the most expensive mistake. See how planning, bid review, and vetted contractor matching can reduce costly surprises.",
    h1: "How Vetted Contractors and Independent Guidance Can Save Homeowners Money, Time, and Headaches",
    mainEntity: { "@id": `${siteUrl}/blog/how-vetted-contractors-save-money-and-headaches#article` },
    html: `
      <article aria-labelledby="vetted-contractors-title">
        <h1 id="vetted-contractors-title">How Vetted Contractors and Independent Guidance Can Save Homeowners Money, Time, and Headaches</h1>
        <p>The right contractor match is not just about price. It is about avoiding the expensive problems that come from the wrong fit.</p>
        <p>Every homeowner wants to save money on a remodel. That is reasonable. Remodeling is expensive, and most families have a limit to what they can spend. The mistake is assuming the lowest bid is automatically the money-saving choice. In construction, the cheapest number on day one can become the most expensive decision by the end of the project. The real savings often come from clear planning, honest scope, realistic expectations, and choosing a contractor who is actually suited for the work.</p>
        <p>A remodel can go wrong in ways that are easy to underestimate. A vague bid can leave out important materials. A contractor can be good at one type of work but not the project being requested. A low deposit can turn into a stream of change orders. A timeline can be promised without enough labor to support it. A homeowner can approve selections that do not fit the budget because nobody explained the impact early enough. Each of these problems costs money, but they also cost energy, time, and trust.</p>
        <p>Using an advisory service with vetted contractors helps reduce those risks before the contract is signed. The first savings comes from scope clarity. Contractors can only price what they understand. If three contractors are bidding three different versions of the same idea, the homeowner is not comparing prices. They are comparing confusion. A clear preliminary scope gives contractors a better target and gives the homeowner a better basis for comparison.</p>
        <p>Scope clarity also helps prevent the kind of missing-item surprise that makes homeowners feel trapped. For example, a bathroom bid may include tile installation but not necessary prep work, waterproofing details, trim replacement, fixture allowances, drywall repair, or disposal. A kitchen bid may include cabinets but not electrical changes, wall repair, appliance coordination, flooring transitions, or finish details. Those omissions may not be intentional, but they still become the homeowner's problem if they are discovered after work begins.</p>
        <p>The second savings comes from contractor fit. Not every contractor should do every job. Some are better at bathrooms. Some are stronger with kitchens. Some are set up for decks, additions, exterior work, flooring, or whole-home projects. Some are small and highly detailed but not built for a large, fast-moving job. Some are capable of larger projects but not ideal for a smaller repair-heavy remodel. Matching the project with the right type of contractor can prevent delays, miscommunication, and quality issues.</p>
        <p>Vetting matters because homeowners usually do not hire contractors often enough to know what normal looks like. A contractor may have nice photos but weak communication. Another may be skilled but disorganized. Another may be affordable but too overloaded to start when promised. Another may be a good tradesperson but not prepared to manage a remodel with several moving parts. An advisor who understands construction can look beyond the sales conversation and help identify who is actually likely to fit the project.</p>
        <p>The third savings comes from independent bid review. Homeowners often focus on the final number, but the number is only part of the story. What is included? What is excluded? What allowances are realistic? How are changes handled? What payment schedule is proposed? What decisions must be made before work starts? Are there assumptions that should be confirmed in writing? A bid that is higher but complete may be safer than a lower bid with holes in it. A bid that looks detailed may still be missing important protections.</p>
        <p>The headaches avoided can be just as valuable as the dollars saved. A remodel that starts without clear expectations can create weeks of stress. Homeowners may find themselves texting repeatedly for updates, wondering whether work is being done correctly, arguing over what was promised, or trying to understand why the price changed. When those issues happen, the homeowner is already emotionally and financially invested. Prevention is easier than rescue.</p>
        <p>Oklahoma Remodel Consulting is designed around that prevention. We help the homeowner think through the project before contractor selection becomes urgent. We help shape a realistic budget conversation. We connect the scope with vetted local contractors when the project is ready. We review bids with the homeowner so the decision is not based on guesswork. And we remain on the homeowner's side as an advisor while the independent contractor performs the work.</p>
        <p>This does not mean every surprise can be eliminated. Homes can hide water damage, structural concerns, old wiring, uneven framing, or previous work that was done wrong. Materials can change. Schedules can move. But a homeowner with an advisor and vetted contractor options is in a stronger position. The project begins with better information. The contractor is chosen with more care. The homeowner understands more of the risks before money is committed.</p>
        <p>The cost of poor contractor selection is rarely just the repair bill. It can be the cost of redoing work, replacing wasted materials, delaying the project, taking extra time off work, living in a torn-up home longer than expected, and losing confidence in everyone involved. Those are the headaches homeowners remember. A smoother project is not only about saving money. It is about protecting the homeowner's peace of mind.</p>
        <p>The best remodel savings come from avoiding preventable mistakes. That starts before the bid, before the deposit, and before demolition. With clear scope, experienced guidance, and vetted contractor matching, homeowners can make decisions with more confidence and fewer expensive surprises. That is the value of having Oklahoma Remodel Consulting involved early: fewer guesses, fewer gaps, and a calmer path from idea to finished project.</p>
        <p>There is also a practical savings in time. Homeowners can spend weeks calling random names, trying to explain the same project over and over, and wondering why every answer sounds different. A clearer advisory process narrows the field and helps the homeowner focus on contractors who are more likely to fit the work. That does not remove the homeowner's final choice, but it makes the choice better informed. The goal is not to pressure contractors for the cheapest possible number. The goal is to protect the homeowner from avoidable confusion, weak scope, poor fit, and the expensive stress that follows.</p>
      </article>`,
    extraSchemas: [blogPostingSchema(blogArticlePages[1])],
  },
  {
    path: "/contact",
    breadcrumbName: "Contact",
    title: "Contact Oklahoma Remodel Consulting | Start Your Remodel Plan",
    description: "Contact Oklahoma Remodel Consulting in Oklahoma City, OK to start a remodel planning conversation for Central Oklahoma, Central Oklahoma, or Central Oklahoma.",
    h1: "Tell us about your project. We'll call you back within one business day.",
    html: `
      <section aria-labelledby="contact-title">
        <h1 id="contact-title">Tell us about your project. We'll call you back within one business day.</h1>
        <p>Share the basics and our team will reach out within one business day to schedule your consultation. You get a calmer path into scope, budget, contractor selection, and the decisions that usually overwhelm homeowners.</p>
        <h2>Project intake</h2>
        <p>The intake asks for your first name, last name, email, phone, city and state, project type, project description, best time to reach you, and advisory-service acknowledgement.</p>
        <p>Oklahoma Remodel Consulting is based in Oklahoma City, OK 73102 and serves homeowners across Oklahoma City and communities within about 60 miles.</p>
        <h2>What happens next</h2>
        <ol>
          <li>Your notes are reviewed before the callback.</li>
          <li>Our team will reach out within one business day to schedule your consultation and clarify the project goals and constraints.</li>
          <li>If the project is a fit, you get a clear next planning step.</li>
        </ol>
        <p>Email: toby@okcremodelconsulting.com</p>
        <p>Base: Oklahoma City, OK 73102</p>
      </section>`,
    webPageType: ["WebPage", "ContactPage"],
    extraSchemas: [
      {
        "@type": "ContactPage",
        "@id": `${siteUrl}/contact#contactpage`,
        url: `${siteUrl}/contact`,
        name: "Contact Oklahoma Remodel Consulting",
        description: "Contact Oklahoma Remodel Consulting to start a remodel planning conversation.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#business` },
        mainEntity: { "@id": `${siteUrl}/#business` },
      },
    ],
  },
];
pages.push(...seoResourceIndexPages(), ...seoResourceDetailPages(), ...localSeoPages);

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function routeUrl(pathname) {
  return `${siteUrl}${pathname === "/" ? "" : pathname}`;
}

function schemaGraph(page) {
  if (page.isLocalSeo) return localSeoSchemaGraph(page);
  const graph = [
    businessSchema,
    ...serviceEntities,
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Oklahoma Remodel Consulting",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#business` },
    },
    {
      "@type": page.webPageType ?? "WebPage",
      "@id": `${routeUrl(page.path)}#webpage`,
      url: routeUrl(page.path),
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#business` },
      mainEntity: page.mainEntity ?? { "@id": `${siteUrl}/#business` },
    },
  ];
  const breadcrumb = breadcrumbSchema(page);
  if (breadcrumb) graph.push(breadcrumb);
  if (page.extraSchemas) graph.push(...page.extraSchemas);
  return { "@context": "https://schema.org", "@graph": graph };
}

function injectHead(html, page) {
  const canonical = routeUrl(page.path);
  const jsonLd = JSON.stringify(schemaGraph(page));
  const ogImage = `${siteUrl}/og-image.svg`;
  const head = `
    <title>${escapeAttr(page.title)}</title>
    <meta name="description" content="${escapeAttr(page.description)}" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta property="og:title" content="${escapeAttr(page.title)}" />
    <meta property="og:description" content="${escapeAttr(page.description)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Oklahoma Remodel Consulting" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:alt" content="Oklahoma Remodel Consulting — remodel planning advisor in Oklahoma City, Oklahoma" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(page.title)}" />
    <meta name="twitter:description" content="${escapeAttr(page.description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
    <meta name="robots" content="${page.isLocalSeo ? localSeoRobots : "index,follow"}" />
    <script type="application/ld+json">${jsonLd.replaceAll("<", "\\u003c")}</script>`;

  return html
    .replace(/<title>.*?<\/title>/s, "")
    .replace(/<meta name="description"[^>]*>\s*/i, "")
    .replace(/<meta property="og:title"[^>]*>\s*/i, "")
    .replace(/<meta property="og:description"[^>]*>\s*/i, "")
    .replace(/<meta property="og:type"[^>]*>\s*/i, "")
    .replace(/<meta property="og:site_name"[^>]*>\s*/i, "")
    .replace(/<meta property="og:image"[^>]*>\s*/gi, "")
    .replace(/<meta property="og:image:alt"[^>]*>\s*/gi, "")
    .replace(/<meta name="twitter:[^>]*>\s*/gi, "")
    .replace(/<\/head>/i, `${head}\n  </head>`);
}

function renderPage(page) {
  const primaryLinks = pages
    .map((linkPage) => `<a href="${linkPage.path}">${linkPage.path === "/" ? "Home" : linkPage.h1}</a>`)
    .join(" | ");
  const seoContent = `
    <div id="root">
      <noscript>This website works best with JavaScript enabled, but the core Oklahoma Remodel Consulting service information is available below.</noscript>
      <nav aria-label="Primary" data-seo-prerender="true">
        ${primaryLinks}
      </nav>
      <article data-seo-prerender="true">
        ${page.html}
      </article>
    </div>`;

  return injectHead(baseTemplate, page)
    .replace(/<div id="root"><\/div>/, seoContent)
    .replace(/<html lang="en">/, `<html lang="en" data-seo-generated-at="${escapeAttr(generatedAt)}">`);
}

for (const page of pages) {
  const outDir = page.path === "/" ? dist : join(dist, page.path.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), renderPage(page));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${routeUrl(page.path)}</loc><lastmod>${generatedAt.slice(0, 10)}</lastmod><changefreq>${page.changefreq ?? "weekly"}</changefreq><priority>${page.priority ?? (page.path === "/" || page.path === "/about" || page.path === "/how-it-works" ? "1.0" : page.path.startsWith("/blog") ? "0.6" : "0.8")}</priority></url>`).join("\n")}
</urlset>
`;

const robots = `# Oklahoma Remodel Consulting crawler policy
# Public marketing pages are intentionally available to search engines and AI assistants.

User-agent: Googlebot
Allow: /

User-agent: AdsBot-Google
Allow: /

User-agent: Google-InspectionTool
Allow: /

User-agent: Bingbot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const llmsTxt = `# Oklahoma Remodel Consulting

> Independent residential remodel advisory, realistic budgeting, scope planning, vetted contractor matching, bid review, and homeowner advocacy based in Oklahoma City, Oklahoma 67356.

Oklahoma Remodel Consulting is an advisor, not a contractor. Homeowners keep the construction contract directly with the contractor they choose. The service helps homeowners define project scope, understand realistic budgets, compare contractor bids, and avoid contractor roulette.

## Primary pages

- Home: ${siteUrl}/
- How it works: ${siteUrl}/how-it-works
- About: ${siteUrl}/about
- Contact: ${siteUrl}/contact
- Blog: ${siteUrl}/blog
- Guides: ${siteUrl}/guides
- Comparison guides: ${siteUrl}/compare
- Checklists: ${siteUrl}/checklists
- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt

## Service area

- Central Oklahoma: Oklahoma City, Parsons, Pittsburg, Independence, Coffeyville, and nearby communities.
- Central Oklahoma: Miami, Vinita, Grove, and nearby communities.
- Central Oklahoma: Joplin, Carthage, Webb City, and nearby communities.

## Services

- Remodel planning and homeowner intake
- Preliminary scope development
- Realistic remodel budget guidance
- Vetted contractor matching
- Independent contractor bid review
- Project advocacy through completion

## SEO resources

- Remodel planning guides: ${siteUrl}/guides
- Remodel comparison guides: ${siteUrl}/compare
- Remodel checklists: ${siteUrl}/checklists
- Kitchen budget planning, bathroom bid review, remodel scope templates, contractor comparison worksheets, and deposit-readiness checklists.

## Important boundary

Oklahoma Remodel Consulting does not perform construction work, supervise contractor labor, make contractor warranty commitments, or provide legal, insurance, structural, electrical, plumbing, heating and cooling, or engineering advice.

## Contact

Email: toby@okcremodelconsulting.com
Base: Oklahoma City, Oklahoma 67356
Founder: Toby Miller
`;

writeFileSync(join(dist, "sitemap.xml"), sitemap);
writeFileSync(join(dist, "robots.txt"), robots);
writeFileSync(join(dist, "llms.txt"), llmsTxt);

console.log(`SEO prerendered ${pages.length} routes into ${dist}`);
console.log(`Sitemap: ${siteUrl}/sitemap.xml`);
console.log(`LLMs: ${siteUrl}/llms.txt`);
