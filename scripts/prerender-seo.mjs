import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
const dist = 'dist/public';
const siteUrl = (process.env.SITE_URL || 'https://brothers-remodeling-okc.vercel.app').replace(/\/$/, '');
const cityContent = JSON.parse(readFileSync('client/src/data/cityContent.json', 'utf8'));
function esc(value){ return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
const cities = [
  ['oklahoma-city','Oklahoma City','kitchen remodels, bathroom upgrades, flooring, drywall, trim, paint, exterior repairs, garage updates, and full-home refreshes for OKC homeowners'],
  ['edmond','Edmond','kitchen and bath updates, trim carpentry, flooring, painting, exterior improvements, and careful finish work for north metro homes'],
  ['yukon','Yukon','west-metro remodels including kitchens, bathrooms, floors, drywall, exterior repairs, garages, and whole-home updates'],
  ['nichols-hills','Nichols Hills','premium interior finishes, kitchens, bathrooms, exterior details, trim, doors, and careful home upgrades'],
  ['the-village','The Village','bathroom remodels, kitchen updates, flooring, paint, doors, trim, and practical repairs for established homes'],
  ['warr-acres','Warr Acres','whole-home refreshes, flooring, drywall, paint, garage improvements, exterior repair, and maintenance work'],
  ['bethany','Bethany','kitchens, baths, additions, flooring, exterior paint, window and door updates, and repair projects'],
  ['del-city','Del City','interior remodels, exterior updates, doors, windows, flooring, paint, and repair work'],
  ['midwest-city','Midwest City','kitchen updates, bathroom renovations, flooring, drywall, garages, exterior work, and general remodeling'],
  ['moore','Moore','nearby remodel projects for kitchens, bathrooms, floors, exterior repairs, paint, and full-home updates'],
];
const baseRoutes = [
  ['/', 'Brothers Remodeling OKC LLC | Full-Service Remodeling in Oklahoma City', 'Bilingual full-service remodeling for Oklahoma City homeowners: kitchens, bathrooms, flooring, paint, exterior work, garages, repairs, and whole-home updates.'],
  ['/services', 'Remodeling Services in OKC | Brothers Remodeling OKC', 'Kitchen, bathroom, interior, exterior, flooring, drywall, paint, garage, addition, and repair remodeling services in Oklahoma City.'],
  ['/process', 'Remodeling Process in OKC | Brothers Remodeling OKC', 'How Brothers Remodeling OKC moves from project details to visit, quote, scheduling, and remodeling work.'],
  ['/about', 'About Brothers Remodeling OKC | Local Remodeling Contractor', 'Learn about Brothers Remodeling OKC, a bilingual local remodeling contractor serving Oklahoma City homeowners.'],
  ['/service-area', 'Oklahoma City Remodeling Service Area | Brothers Remodeling OKC', 'Brothers Remodeling OKC serves Oklahoma City and nearby communities with bilingual full-service remodeling.'],
  ['/gallery', 'Remodeling Gallery | Brothers Remodeling OKC', 'Kitchen, bath, interior, exterior, flooring, paint, garage, and repair remodeling categories for Brothers Remodeling OKC homeowners.'],
  ['/contact', 'Request a Remodeling Quote | Brothers Remodeling OKC', 'Contact Brothers Remodeling OKC for bilingual remodeling quote conversations in the Oklahoma City area.'],
];
const cityRoutes = cities.map(([slug,name,note]) => [`/service-area/${slug}`, `${name} Remodeling Services | Brothers Remodeling OKC`, `Bilingual remodeling services near ${name}: ${note}. Request a kitchen, bath, flooring, paint, exterior, garage, or repair quote.`]);
const routes = [...baseRoutes, ...cityRoutes];
function bodyFor(path){
  const city = cities.find(([slug]) => path === `/service-area/${slug}`);
  if(city){const [slug,name,note]=city;const copy=cityContent[slug];const paragraphs=(copy?.paragraphs||[]).map((paragraph)=>`<p>${esc(paragraph)}</p>`).join('');return `<main data-jeriko-prerender="true"><section><p>Full-service bilingual remodeling near ${name}.</p><h1>${name} remodeling services for homeowners</h1><p>Brothers Remodeling OKC helps homeowners around ${name} with kitchen remodeling, bathroom remodeling, flooring, drywall, painting, exterior repairs, doors, windows, garages, and whole-home updates.</p><p>Common requests include ${note}. English and Spanish communication is available.</p><section class="cityLongCopy"><h2>${name} remodeling guidance for real homeowner decisions</h2>${paragraphs}</section><p><a href="/contact">Request a ${name} remodeling quote</a> or <a href="mailto:brothersremodelingokc@gmail.com" data-jeriko-track="email_click">email project photos</a>.</p><form action="/api/contact" method="post" data-jeriko-track="form_submit" aria-label="${name} remodel quote request"><input name="name" autocomplete="name" required /><input name="phone" type="tel" autocomplete="tel" required /><input name="city" value="${name}" /><textarea name="message" required></textarea><button type="submit">Request quote</button></form></section></main>`}
  return `<main data-jeriko-prerender="true"><section><p>Full-service bilingual remodeling company serving Oklahoma City and nearby areas.</p><h1>Brothers Remodeling OKC LLC</h1><p>Kitchen remodeling, bathroom remodeling, whole-home renovations, flooring, drywall, painting, exterior repairs, decks, fences, trim, doors, windows, garages, additions, and general repairs.</p><p>English and Spanish communication available for homeowners who want a clear remodeling path.</p><p><a href="/contact">Request a remodeling quote</a> or <a href="mailto:brothersremodelingokc@gmail.com" data-jeriko-track="email_click">email project photos</a>.</p><form action="/api/contact" method="post" data-jeriko-track="form_submit" aria-label="Remodel quote request"><input name="name" autocomplete="name" required /><input name="phone" type="tel" autocomplete="tel" required /><input name="email" type="email" autocomplete="email" /><textarea name="message" required></textarea><button type="submit">Request quote</button></form><h2>Service area</h2><ul>${cities.map(([slug,name])=>`<li><a href="/service-area/${slug}">${name} remodeling services</a></li>`).join('')}</ul></section></main>`;
}
function render(path, title, desc){let html=readFileSync(join(dist,'index.html'),'utf8');html=html.replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/,`<meta name="description" content="${desc}" />`).replace(/<div id="root"[^>]*>.*?<\/div>/s,`<div id="root" data-jeriko-prerender="true">${bodyFor(path)}</div>`);html=html.replace(/<link rel="canonical" href="[^"]*" \/>/g,'');html=html.replace('</head>',`<link rel="canonical" href="${siteUrl}${path==='/'?'':path}" /></head>`);const out=path==='/'?join(dist,'index.html'):join(dist,path,'index.html');mkdirSync(dirname(out),{recursive:true});writeFileSync(out,html);}
for (const r of routes) render(...r);
writeFileSync(join(dist,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
writeFileSync(join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(([p])=>`<url><loc>${siteUrl}${p==='/'?'':p}</loc></url>`).join('')}</urlset>`);
writeFileSync(join(dist,'llms.txt'),`# Brothers Remodeling OKC LLC\n\nFull-service bilingual remodeling in Oklahoma City.\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
for (const f of ['brothers-og.svg','brothers-hero.svg']) if (existsSync(`client/public/images/${f}`)) { mkdirSync(join(dist,'images'),{recursive:true}); copyFileSync(`client/public/images/${f}`, join(dist,'images',f)); }
console.log(`SEO prerendered ${routes.length} routes into ${dist}`);
