import { cities, getCityBySlug } from "@/data/cities";
import { getServiceBySlug, services } from "@/data/services";

export const siteUrl = "https://www.okcremodelconsulting.com";
export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;
export const localSeoDraftNotice = "Local SEO pages are indexable in production unless explicitly disabled.";

export function shouldShowPlaceholderBanner(mode = import.meta.env.MODE, flag = import.meta.env.VITE_SHOW_PLACEHOLDER_BANNER) {
  return mode !== "production" || flag === "true";
}

export function shouldIndexLocalSeoPages(flag = import.meta.env.VITE_ENABLE_LOCAL_SEO_INDEXING) {
  return flag !== "false";
}

export function robotsForLocalSeo(flag = import.meta.env.VITE_ENABLE_LOCAL_SEO_INDEXING) {
  return shouldIndexLocalSeoPages(flag) ? "index,follow" : "noindex,nofollow";
}

export function enabledServiceCityPairs() {
  return cities.flatMap((city) => services.map((service) => ({ serviceSlug: service.slug, citySlug: city.slug })));
}

export function serviceCityPath(serviceSlug: string, citySlug: string) {
  return `/services/${serviceSlug}/${citySlug}`;
}

export function isServiceCityEnabled(serviceSlug: string | undefined, citySlug: string | undefined) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  return Boolean(service && city && serviceSlug && city.enabledCombinations.includes(serviceSlug));
}

export function localSeoPaths() {
  return [
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/service-area",
    ...cities.map((city) => `/service-area/${city.slug}`),
    ...enabledServiceCityPairs().map((pair) => serviceCityPath(pair.serviceSlug, pair.citySlug)),
  ];
}

export function localSeoSitemapEntries() {
  return [
    { path: "/services", priority: "0.9", changefreq: "monthly" },
    ...services.map((service) => ({ path: `/services/${service.slug}`, priority: "0.9", changefreq: "monthly" })),
    { path: "/service-area", priority: "0.8", changefreq: "monthly" },
    ...cities.map((city) => ({ path: `/service-area/${city.slug}`, priority: "0.8", changefreq: "monthly" })),
    ...enabledServiceCityPairs().map((pair) => ({ path: serviceCityPath(pair.serviceSlug, pair.citySlug), priority: "0.7", changefreq: "monthly" })),
  ];
}

function baseGraph(path: string, title: string, description: string) {
  return [
    { "@type": "WebSite", "@id": websiteId, name: "Oklahoma Remodel Consulting", url: siteUrl, publisher: { "@id": businessId } },
    { "@type": "WebPage", "@id": `${siteUrl}${path}#webpage`, url: `${siteUrl}${path}`, name: title, description, isPartOf: { "@id": websiteId }, about: { "@id": businessId } },
  ];
}

export function serviceHubSchema(serviceSlug: string) {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(`/services/${service.slug}`, service.metaTitle, service.metaDescription),
      { "@type": "Service", name: service.name, provider: { "@id": businessId }, serviceType: service.serviceType, areaServed: cities.map((city) => `${city.name}, ${city.state}`) },
      { "@type": "FAQPage", mainEntity: service.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}/services/${service.slug}` },
      ] },
    ],
  };
}

export function cityHubSchema(citySlug: string) {
  const city = getCityBySlug(citySlug);
  if (!city) return undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(`/service-area/${city.slug}`, city.metaTitle, city.metaDescription),
      { "@type": "Place", name: `${city.name}, ${city.state}`, containedInPlace: city.stateFull, additionalProperty: [{ name: "areaServed", value: [city.name, ...city.nearbyAreas].join(", ") }], subjectOf: { "@id": businessId } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Service Area", item: `${siteUrl}/service-area` },
        { "@type": "ListItem", position: 3, name: `${city.name}, ${city.state}`, item: `${siteUrl}/service-area/${city.slug}` },
      ] },
    ],
  };
}

export function serviceCityDescription(serviceName: string, cityName: string, state: string) {
  return `${serviceName} in ${cityName}, ${state} with independent scope planning, budget guidance, contractor vetting, and bid review from Oklahoma Remodel Consulting.`;
}

export function serviceCitySchema(serviceSlug: string, citySlug: string) {
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city || !isServiceCityEnabled(serviceSlug, citySlug)) return undefined;
  const path = serviceCityPath(serviceSlug, citySlug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...baseGraph(path, `${service.name} in ${city.name}, ${city.state} | Oklahoma Remodel Consulting`, serviceCityDescription(service.name, city.name, city.state)),
      { "@type": "Service", name: `${service.name} in ${city.name}, ${city.state}`, provider: { "@id": businessId }, serviceType: service.serviceType, areaServed: `${city.name}, ${city.state}` },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}/services/${service.slug}` },
        { "@type": "ListItem", position: 4, name: `${city.name}, ${city.state}`, item: `${siteUrl}${path}` },
      ] },
    ],
  };
}

export function asJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll("<", "\u003c");
}
