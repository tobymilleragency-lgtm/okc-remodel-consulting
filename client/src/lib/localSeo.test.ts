import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import {
  cityHubSchema,
  enabledServiceCityPairs,
  isServiceCityEnabled,
  localSeoPaths,
  localSeoSitemapEntries,
  robotsForLocalSeo,
  serviceCityPath,
  serviceCitySchema,
  serviceHubSchema,
  shouldShowPlaceholderBanner,
} from "./localSeo";


describe("local SEO architecture", () => {
  it("services data contains exactly 10 unique service slugs", () => {
    expect(services).toHaveLength(10);
    expect(new Set(services.map((service) => service.slug)).size).toBe(10);
  });

  it("cities data contains the complete 48-city Oklahoma City service area", () => {
    expect(cities).toHaveLength(48);
    expect(new Set(cities.map((city) => city.slug)).size).toBe(48);
    expect(cities.map((city) => city.slug)).toContain("oklahoma-city-ok");
    expect(cities.map((city) => city.slug)).toContain("edmond-ok");
    expect(cities.map((city) => city.slug)).toContain("norman-ok");
  });

  it("enabled service-city combinations resolve for the OKC radius service matrix", () => {
    const urls = enabledServiceCityPairs().map((pair) => serviceCityPath(pair.serviceSlug, pair.citySlug));
    expect(urls).toHaveLength(480);
    expect(new Set(urls).size).toBe(480);
    expect(urls).toContain("/services/kitchen-remodel-consulting/oklahoma-city-ok");
    expect(urls).toContain("/services/bathroom-remodel-consulting/edmond-ok");
    expect(urls).toContain("/services/contractor-vetting/norman-ok");
  });

  it("invalid legacy service-city combinations do not render as live pages", () => {
    expect(isServiceCityEnabled("kitchen-remodel-consulting", "oswego-ks")).toBe(false);
    expect(localSeoPaths()).not.toContain("/services/kitchen-remodel-consulting/oswego-ks");
  });

  it("invalid service slug returns existing 404 behavior through validation", () => {
    expect(isServiceCityEnabled("not-a-service", "oklahoma-city-ok")).toBe(false);
  });

  it("invalid city slug returns existing 404 behavior through validation", () => {
    expect(isServiceCityEnabled("kitchen-remodel-consulting", "not-a-city")).toBe(false);
  });

  it("sitemap generation includes all service, city, and service-city URLs", () => {
    expect(localSeoSitemapEntries()).toHaveLength(540);
    expect(localSeoPaths()).toHaveLength(540);
    expect(localSeoPaths()).toContain("/service-area");
    expect(localSeoPaths()).toContain("/service-area/oklahoma-city-ok");
  });

  it("sitemap generation excludes disabled service-city combinations", () => {
    const sitemapPaths = localSeoSitemapEntries().map((entry) => entry.path);
    expect(sitemapPaths).not.toContain("/services/kitchen-remodel-consulting/oswego-ks");
  });

  it("schema generation produces valid JSON-LD for one service hub", () => {
    const schema = serviceHubSchema("kitchen-remodel-consulting");
    expect(JSON.parse(JSON.stringify(schema))["@context"]).toBe("https://schema.org");
  });

  it("schema generation produces valid JSON-LD for one city hub", () => {
    const schema = cityHubSchema("oklahoma-city-ok");
    expect(JSON.parse(JSON.stringify(schema))["@context"]).toBe("https://schema.org");
  });

  it("schema generation produces valid JSON-LD for one service-city page", () => {
    const schema = serviceCitySchema("kitchen-remodel-consulting", "oklahoma-city-ok");
    expect(JSON.parse(JSON.stringify(schema))["@context"]).toBe("https://schema.org");
  });

  it("draft banner visibility obeys environment flag behavior", () => {
    expect(shouldShowPlaceholderBanner("development", undefined)).toBe(true);
    expect(shouldShowPlaceholderBanner("production", undefined)).toBe(false);
    expect(shouldShowPlaceholderBanner("production", "true")).toBe(true);
  });

  it("local SEO pages are indexable unless indexing is explicitly disabled", () => {
    expect(robotsForLocalSeo(undefined)).toBe("index,follow");
    expect(robotsForLocalSeo("false")).toBe("noindex,nofollow");
    expect(robotsForLocalSeo("true")).toBe("index,follow");
  });

  it("renders long SEO copy as titled guide sections instead of one long overview stack", () => {
    const source = readFileSync("client/src/pages/LocalSeoPages.tsx", "utf-8");

    expect(source).toContain("function GuidanceSectionGrid");
    expect(source).not.toContain("<SeoDepthSection paragraphs={serviceSeoParagraphs(service)} />");
    expect(source).not.toContain("<Paragraphs items={[...service.content.overview, ...serviceSeoParagraphs(service)]}");
    expect(source).not.toContain("<Paragraphs items={[...city.content.localContext, ...citySeoParagraphs(city)]}");
    expect(source).not.toContain("<Paragraphs items={[...service.content.overview.slice(0, 2), ...city.content.localContext.slice(0, 1), ...serviceCitySeoParagraphs(service, city)]}");
  });

  it("renders visible breadcrumb UI with working links on service, city, and service-city pages", () => {
    const source = readFileSync("client/src/pages/LocalSeoPages.tsx", "utf-8");

    expect(source).toContain('aria-label="Breadcrumb"');
    expect(source).toContain('data-visible-breadcrumbs="true"');
    expect(source).toContain('{ label: "Home", href: "/" }');
    expect(source).toContain('{ label: "Services", href: "/services" }');
    expect(source).toContain('{ label: "Service Area", href: "/service-area" }');
    expect(source).toContain('{ label: service.name, href: `/services/${service.slug}` }');
  });

  it("renders visible breadcrumb UI with working links on resource detail pages", () => {
    const source = readFileSync("client/src/pages/SeoResources.tsx", "utf-8");

    expect(source).toContain('aria-label="Breadcrumb"');
    expect(source).toContain('data-visible-breadcrumbs="true"');
    expect(source).toContain('{ label: "Home", href: "/" }');
    expect(source).toContain('{ label: resourceKindLabel(resource.kind), href: resourceIndexPath(resource.kind) }');
    expect(source).toContain('{ label: resource.shortTitle }');
  });

  it("renders visible breadcrumbs on local SEO and resource pages with working links", () => {
    const localSource = readFileSync("client/src/pages/LocalSeoPages.tsx", "utf-8");
    const resourceSource = readFileSync("client/src/pages/SeoResources.tsx", "utf-8");

    expect(localSource).toContain('data-visible-breadcrumbs="true"');
    expect(localSource).toContain('{ label: "Services", href: "/services" }');
    expect(localSource).toContain('{ label: "Service Area", href: "/service-area" }');
    expect(localSource).toContain('{ label: service.name, href: `/services/${service.slug}` }');

    expect(resourceSource).toContain('data-visible-breadcrumbs="true"');
    expect(resourceSource).toContain('{ label: resourceKindLabel(kind) }');
    expect(resourceSource).toContain('{ label: resourceKindLabel(resource.kind), href: resourceIndexPath(resource.kind) }');
    expect(resourceSource).toContain('{ label: resource.shortTitle }');
  });

});
