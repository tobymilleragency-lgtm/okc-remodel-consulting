import { asJsonLd, robotsForLocalSeo, siteUrl } from "@/lib/localSeo";
import { useEffect } from "react";

export function LocalSeoHead({ title, description, canonicalPath, schema }: { title: string; description: string; canonicalPath: string; schema?: unknown }) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        if (selector.includes('name="description"')) element.setAttribute('name', 'description');
        if (selector.includes('name="robots"')) element.setAttribute('name', 'robots');
        if (selector.startsWith('link')) element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', robotsForLocalSeo());
    setMeta('link[rel="canonical"]', 'href', `${siteUrl}${canonicalPath}`);
    const oldJsonLd = document.head.querySelector('script[data-local-seo-jsonld="true"]');
    oldJsonLd?.remove();
    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.localSeoJsonld = 'true';
      script.text = asJsonLd(schema);
      document.head.appendChild(script);
    }
  }, [title, description, canonicalPath, schema]);
  return null;
}
