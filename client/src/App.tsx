import React from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { ArrowRight, Bath, Building2, CheckCircle2, ClipboardCheck, DoorOpen, Hammer, Home as HomeIcon, Languages, Mail, MapPin, Menu, Paintbrush, Phone, Shield, Sparkles, Utensils, Warehouse, Wrench, X } from "lucide-react";
import cityContent from "./data/cityContent.json";

type IconType = React.ComponentType<{ size?: number; className?: string }>;
type City = { name: string; slug: string; note: string; nearby: string };

const email = "brothersremodelingokc@gmail.com";

type Language = "en" | "es";
const LANGUAGE_STORAGE_KEY = "brothers-remodeling-okc-language";
const LanguageContext = React.createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: "en", setLanguage: () => {} });
function useLanguage() { return React.useContext(LanguageContext); }

const serviceNameEs: Record<string, string> = {
  "Kitchen Remodeling": "Remodelación de cocinas",
  "Bathroom Remodeling": "Remodelación de baños",
  "Interior Renovations": "Renovaciones interiores",
  "Flooring Installation": "Instalación de pisos",
  "Exterior Remodeling": "Remodelación exterior",
  "Additions, Garages & Conversions": "Ampliaciones, garajes y conversiones",
  "Outdoor Living Spaces": "Espacios exteriores",
  "Repair & Maintenance": "Reparaciones y mantenimiento",
};

const textEs: Record<string, string> = {
  "Brothers Remodeling OKC": "Brothers Remodeling OKC",
  "Brothers Remodeling OKC LLC": "Brothers Remodeling OKC LLC",
  "Home": "Inicio",
  "Services": "Servicios",
  "Process": "Proceso",
  "About": "Acerca de",
  "Gallery": "Galería",
  "Service Area": "Área de servicio",
  "Contact": "Contacto",
  "Request Quote": "Solicitar cotización",
  "Menu": "Menú",
  "Close menu": "Cerrar menú",
  "English": "English",
  "Español": "Español",
  "Full-service remodeling • English / Español": "Remodelación completa • English / Español",
  "Remodel your OKC home without the runaround.": "Remodele su casa en OKC sin vueltas ni confusión.",
  "Brothers Remodeling OKC LLC helps homeowners update kitchens, bathrooms, floors, walls, exterior spaces, garages, and full homes across Oklahoma City and nearby areas.": "Brothers Remodeling OKC LLC ayuda a propietarios a actualizar cocinas, baños, pisos, muros, áreas exteriores, garajes y casas completas en Oklahoma City y comunidades cercanas.",
  "Request Remodeling Quote": "Solicitar cotización de remodelación",
  "Email Project Photos": "Enviar fotos del proyecto",
  "Full": "Servicio",
  "service": "completo",
  "Bi": "Dos",
  "lingual": "idiomas",
  "OKC": "OKC",
  "focused": "enfocado",
  "Kitchens • Bathrooms • Floors • Paint • Exterior • Repairs": "Cocinas • Baños • Pisos • Pintura • Exterior • Reparaciones",
  "English and Spanish communication available": "Comunicación disponible en inglés y español",
  "Kitchens, baths, floors, paint, exterior work, garages, and repairs": "Cocinas, baños, pisos, pintura, exterior, garajes y reparaciones",
  "Focused on Oklahoma City and nearby communities": "Enfocados en Oklahoma City y comunidades cercanas",
  "Direct remodeling communication": "Comunicación directa para su remodelación",
  "Remodeling services": "Servicios de remodelación",
  "One remodeling company for almost every part of the home.": "Una compañía de remodelación para casi cada parte de la casa.",
  "Kitchen Remodeling": "Remodelación de cocinas",
  "Cabinets, counters, backsplash, lighting, islands, flooring, layout improvements, and cleaner daily function.": "Gabinetes, cubiertas, backsplash, iluminación, islas, pisos, mejoras de distribución y una función diaria más cómoda.",
  "Bathroom Remodeling": "Remodelación de baños",
  "Showers, tubs, tile, vanities, fixtures, waterproofing details, ventilation, and better storage.": "Regaderas, tinas, azulejo, vanities, accesorios, impermeabilización, ventilación y mejor almacenamiento.",
  "Interior Renovations": "Renovaciones interiores",
  "Drywall, texture, trim, paint, doors, baseboards, accent walls, room updates, and layout changes.": "Drywall, textura, molduras, pintura, puertas, zoclos, muros de acento, mejoras de habitaciones y cambios de distribución.",
  "Flooring Installation": "Instalación de pisos",
  "LVP, tile, laminate, transitions, subfloor prep, and finish carpentry that ties the remodel together.": "LVP, loseta, laminado, transiciones, preparación de subpiso y carpintería de acabado para integrar la remodelación.",
  "Exterior Remodeling": "Remodelación exterior",
  "Siding, facade updates, decks, fences, exterior paint, curb appeal, windows, doors, and practical repairs.": "Siding, mejoras de fachada, decks, cercas, pintura exterior, curb appeal, ventanas, puertas y reparaciones prácticas.",
  "Additions, Garages & Conversions": "Ampliaciones, garajes y conversiones",
  "Added living areas, garage remodels, storage upgrades, offices, commercial spaces, and better use of square footage.": "Nuevas áreas habitables, remodelación de garajes, almacenamiento, oficinas, espacios comerciales y mejor uso de los pies cuadrados.",
  "Outdoor Living Spaces": "Espacios exteriores",
  "Patios, exterior gathering areas, repairs, fencing, and improvements that make the outside more usable.": "Patios, áreas exteriores de reunión, reparaciones, cercas y mejoras que hacen el exterior más útil.",
  "Repair & Maintenance": "Reparaciones y mantenimiento",
  "Punch-list repairs, patching, painting, maintenance, and smaller details that keep a property sharp.": "Reparaciones pendientes, parches, pintura, mantenimiento y detalles pequeños que mantienen la propiedad en buen estado.",
  "Project details": "Detalles del proyecto",
  "Room, city, timing, and the real problem": "Área, ciudad, tiempo y el problema real",
  "Photos reviewed": "Fotos revisadas",
  "Access, finishes, damage, and hidden-condition clues": "Acceso, acabados, daños y señales de condiciones ocultas",
  "Quote path": "Ruta de cotización",
  "Call, visit, scope notes, and next-step fit": "Llamada, visita, notas de alcance y siguiente paso adecuado",
  "Build plan": "Plan de trabajo",
  "Schedule, materials, cleanup, and communication": "Horario, materiales, limpieza y comunicación",
  "Live project path": "Ruta activa del proyecto",
  "Kitchen / bath requests": "Solicitudes de cocina / baño",
  "Photos and access notes": "Fotos y notas de acceso",
  "Materials and finish level": "Materiales y nivel de acabado",
  "Scheduling and next steps": "Agenda y siguientes pasos",
  "Scope clarity": "Alcance claro",
  "Photo review": "Revisión de fotos",
  "Quote fit": "Ajuste de cotización",
  "Project flow": "Flujo del proyecto",
  "A cleaner path from first message to remodel plan.": "Un camino más claro desde el primer mensaje hasta el plan de remodelación.",
  "Project details received": "Detalles recibidos",
  "Details reviewed": "Detalles revisados",
  "Visit or quote step confirmed": "Visita o paso de cotización confirmado",
  "Remodel work scheduled": "Trabajo de remodelación agendado",
  "Interactive checklist": "Lista interactiva",
  "Before you request a quote, collect the details that prevent back-and-forth.": "Antes de pedir una cotización, reúna los detalles que evitan vueltas innecesarias.",
  "Room or area is clearly described": "La habitación o área está claramente descrita",
  "Photos are ready to send": "Las fotos están listas para enviar",
  "Timeline expectations are known": "Ya se conocen las expectativas de tiempo",
  "Access, pets, parking, or special notes are listed": "Se anotaron acceso, mascotas, estacionamiento o notas especiales",
  "Budget range or finish level can be discussed": "Se puede hablar del rango de presupuesto o nivel de acabado",
  "Before / after comparison": "Comparación antes / después",
  "From scattered remodel ideas to a clear project conversation.": "De ideas dispersas a una conversación clara sobre el proyecto.",
  "Before": "Antes",
  "Loose ideas, missing photos, unclear priorities, unknown timeline, and no easy way to explain the remodel.": "Ideas sueltas, fotos faltantes, prioridades poco claras, tiempo indefinido y dificultad para explicar la remodelación.",
  "After": "Después",
  "Room, photos, timeline, city, and project type collected so Brothers Remodeling OKC can respond with a useful next step.": "Área, fotos, tiempos, ciudad y tipo de proyecto reunidos para que Brothers Remodeling OKC responda con un siguiente paso útil.",
  "Ready for a remodel?": "¿Listo para remodelar?",
  "Request quote": "Solicitar cotización",
  "Fast quote request": "Solicitud rápida de cotización",
  "Tell Brothers Remodeling OKC who to call and what needs remodeled.": "Dígale a Brothers Remodeling OKC a quién llamar y qué necesita remodelarse.",
  "Add your name, phone number, project type, and clear instructions. If photos are ready, email them after submitting.": "Agregue su nombre, teléfono, tipo de proyecto e instrucciones claras. Si tiene fotos listas, envíelas por email después de enviar el formulario.",
  "Request a remodeling quote": "Solicitar una cotización de remodelación",
  "Fill in the basics below so Brothers Remodeling OKC knows exactly who to call, where the project is, and what needs remodeled. English or Spanish is welcome.": "Complete lo básico para que Brothers Remodeling OKC sepa a quién llamar, dónde está el proyecto y qué necesita remodelarse. Inglés o español es bienvenido.",
  "Request sent.": "Solicitud enviada.",
  "Email option available.": "Opción por email disponible.",
  "Your name / Nombre": "Su nombre / Nombre",
  "Phone number / Teléfono": "Teléfono / Phone number",
  "Email, if you want replies there": "Email, si prefiere respuestas ahí",
  "City or part of OKC": "Ciudad o zona de OKC",
  "Project type": "Tipo de proyecto",
  "Choose the closest project type": "Elija el tipo de proyecto más cercano",
  "Kitchen": "Cocina",
  "Bathroom": "Baño",
  "Flooring": "Pisos",
  "Addition": "Ampliación",
  "Deck": "Deck",
  "Whole Home": "Casa completa",
  "Exterior": "Exterior",
  "Other": "Otro",
  "Project instructions": "Instrucciones del proyecto",
  "Best time to call": "Mejor horario para llamar",
  "Sending...": "Enviando...",
  "Send My Project": "Enviar mi proyecto",
  "Full-service bilingual remodeling in Oklahoma City and nearby communities. Kitchens, bathrooms, flooring, interiors, exterior work, garages, additions, outdoor living, repairs, and maintenance.": "Remodelación bilingüe de servicio completo en Oklahoma City y comunidades cercanas. Cocinas, baños, pisos, interiores, exterior, garajes, ampliaciones, espacios exteriores, reparaciones y mantenimiento.",
  "Main pages": "Páginas principales",
  "Service areas": "Áreas de servicio",
  "HTML Sitemap": "Mapa del sitio HTML",
  "XML Sitemap: /sitemap.xml": "Mapa del sitio XML: /sitemap.xml",
  "Oklahoma City, Oklahoma": "Oklahoma City, Oklahoma",
  "Built for real remodeling quote conversations.": "Hecho para conversaciones reales de cotización de remodelación.",
  "No fake reviews, no online payments, no auth.": "Sin reseñas falsas, sin pagos en línea, sin inicio de sesión.",
  "Kitchen, bathroom, interior, exterior, flooring, paint, and repair remodeling in OKC.": "Remodelación de cocinas, baños, interiores, exteriores, pisos, pintura y reparaciones en OKC.",
  "Brothers Remodeling OKC gives homeowners one place to start for the most common remodeling needs around the home.": "Brothers Remodeling OKC ofrece a propietarios un solo lugar para empezar con las necesidades más comunes de remodelación del hogar.",
  "Remodeling service": "Servicio de remodelación",
  "Detailed service guidance": "Guía detallada del servicio",
  "Common": "Detalles comunes de",
  "Existing condition and repair needs": "Condición existente y necesidades de reparación",
  "Material and finish expectations": "Expectativas de materiales y acabado",
  "Schedule, access, and cleanup notes": "Notas de horario, acceso y limpieza",
  "Related drywall, paint, trim, floor, door, or exterior tie-ins": "Detalles relacionados de drywall, pintura, molduras, piso, puertas o exterior",
  "Photos, measurements, and address-area details for the quote conversation": "Fotos, medidas y zona de la dirección para la conversación de cotización",
  "A clear remodeling process before work begins.": "Un proceso claro de remodelación antes de comenzar el trabajo.",
  "The goal is direct communication, realistic scope conversations, and a next step homeowners understand.": "La meta es comunicación directa, conversaciones realistas sobre el alcance y un siguiente paso que el propietario entienda.",
  "How the project path works": "Cómo funciona la ruta del proyecto",
  "Send details": "Enviar detalles",
  "Share the room, city, photos, timeline, and what needs to change.": "Comparta la habitación, ciudad, fotos, tiempos y lo que necesita cambiar.",
  "Check scope": "Revisar alcance",
  "Brothers Remodeling OKC reviews the work type, access, materials, and schedule.": "Brothers Remodeling OKC revisa el tipo de trabajo, acceso, materiales y agenda.",
  "Confirm next step": "Confirmar siguiente paso",
  "If the job is a good match, the team follows up with the visit, quote step, or project conversation.": "Si el trabajo es adecuado, el equipo da seguimiento con visita, cotización o conversación del proyecto.",
  "Build with updates": "Trabajar con actualizaciones",
  "Work proceeds with clear communication in English or Spanish.": "El trabajo avanza con comunicación clara en inglés o español.",
  "Brothers Remodeling OKC is a local remodeling contractor for real home upgrades.": "Brothers Remodeling OKC es un contratista local de remodelación para mejoras reales del hogar.",
  "The company focuses on practical, good-looking remodel work across kitchens, bathrooms, flooring, interiors, exterior improvements, garages, repairs, and whole-home updates.": "La compañía se enfoca en remodelaciones prácticas y bien terminadas para cocinas, baños, pisos, interiores, exteriores, garajes, reparaciones y casas completas.",
  "Built for homeowners who want direct remodeling help.": "Hecho para propietarios que quieren ayuda directa con su remodelación.",
  "Brothers Remodeling OKC presents services, service area, process, and quote options plainly, without invented credentials or exaggerated claims.": "Brothers Remodeling OKC presenta servicios, área de servicio, proceso y opciones de cotización con claridad, sin credenciales inventadas ni promesas exageradas.",
  "Bilingual communication": "Comunicación bilingüe",
  "English and Spanish project conversations are welcome.": "Las conversaciones del proyecto en inglés o español son bienvenidas.",
  "Wide service range": "Amplio rango de servicios",
  "Multiple rooms and repair scopes can be discussed in one place.": "Varias habitaciones y alcances de reparación se pueden hablar en un solo lugar.",
  "OKC area focus": "Enfoque en el área de OKC",
  "Oklahoma City and nearby communities are the primary service area.": "Oklahoma City y comunidades cercanas son el área principal de servicio.",
  "Project inspiration for kitchens, baths, interiors, and exterior updates.": "Inspiración de proyectos para cocinas, baños, interiores y mejoras exteriores.",
  "Use these remodeling categories to show Brothers Remodeling OKC what kind of finish, room, or repair you want quoted.": "Use estas categorías para mostrar a Brothers Remodeling OKC qué tipo de acabado, habitación o reparación desea cotizar.",
  "Real Brothers Remodeling OKC project photos and remodeling categories.": "Fotos reales de proyectos de Brothers Remodeling OKC y categorías de remodelación.",
  "These photos were carried over from the original Brothers Remodeling OKC gallery so homeowners can reference actual project images when they request a quote.": "Estas fotos se trajeron de la galería original de Brothers Remodeling OKC para que los propietarios puedan revisar imágenes reales al pedir una cotización.",
  "Original site gallery": "Galería del sitio original",
  "Project photos from the existing Brothers Remodeling OKC portfolio.": "Fotos de proyectos del portafolio existente de Brothers Remodeling OKC.",
  "The gallery below preserves the real photo assets from the prior Brothers Remodeling OKC website instead of using generic placeholder cards.": "La galería de abajo conserva las fotos reales del sitio anterior de Brothers Remodeling OKC en lugar de usar tarjetas genéricas.",
  "Finished remodel photo": "Foto de remodelación terminada",
  "Interior remodeling detail": "Detalle de remodelación interior",
  "Remodel finish detail": "Detalle de acabado de remodelación",
  "Completed work view": "Vista de trabajo terminado",
  "Project detail photo": "Foto de detalle del proyecto",
  "Remodel detail": "Detalle de remodelación",
  "Room update photo": "Foto de actualización de habitación",
  "Project photo": "Foto del proyecto",
  "Remodeling project image": "Imagen de proyecto de remodelación",
  "Real project image from the existing Brothers Remodeling OKC gallery.": "Imagen real de proyecto de la galería existente de Brothers Remodeling OKC.",
  "Gallery photo carried over from the original Brothers Remodeling OKC site.": "Foto de galería traída del sitio original de Brothers Remodeling OKC.",
  "Original gallery image preserved for project reference.": "Imagen original de galería conservada como referencia del proyecto.",
  "Real Brothers Remodeling OKC gallery photo.": "Foto real de la galería de Brothers Remodeling OKC.",
  "Original site portfolio image.": "Imagen del portafolio del sitio original.",
  "Photo imported from the prior Brothers Remodeling OKC gallery.": "Foto importada de la galería anterior de Brothers Remodeling OKC.",
  "Existing Brothers Remodeling OKC gallery asset.": "Recurso existente de la galería de Brothers Remodeling OKC.",
  "Gallery photo brought over from the old site.": "Foto de galería traída del sitio anterior.",
  "New portfolio photo": "Nueva foto del portafolio",
  "New project detail": "Nuevo detalle del proyecto",
  "Added gallery photo": "Foto agregada a la galería",
  "Added project photo": "Foto de proyecto agregada",
  "Recent photo supplied for the Brothers Remodeling OKC gallery.": "Foto reciente proporcionada para la galería de Brothers Remodeling OKC.",
  "Recent homeowner-supplied image added to the portfolio.": "Imagen reciente proporcionada por el propietario y agregada al portafolio.",
  "Additional Brothers Remodeling OKC portfolio image.": "Imagen adicional del portafolio de Brothers Remodeling OKC.",
  "New gallery photo supplied for project reference.": "Nueva foto de galería proporcionada como referencia del proyecto.",
  "Exterior and curb appeal work": "Trabajo exterior y presentación de fachada",
  "Interior remodel finish work": "Acabados de remodelación interior",
  "Remodeling categories": "Categorías de remodelación",
  "Remodeling help centered on Oklahoma City.": "Ayuda de remodelación centrada en Oklahoma City.",
  "Brothers Remodeling OKC focuses on the core Oklahoma City metro first: kitchens, bathrooms, flooring, paint, exterior repairs, garages, additions, and whole-home updates. Nearby communities are reviewed by project fit, access, timing, and work type.": "Brothers Remodeling OKC se enfoca primero en el área central del metro de Oklahoma City: cocinas, baños, pisos, pintura, reparaciones exteriores, garajes, ampliaciones y mejoras de casa completa. Las comunidades cercanas se revisan según el proyecto, acceso, tiempos y tipo de trabajo.",
  "Primary OKC-area communities": "Comunidades principales del área de OKC",
  "Use the city links below to describe where the home is and what kind of remodeling help you need.": "Use los enlaces de ciudad para describir dónde está la casa y qué tipo de ayuda de remodelación necesita.",
  "Core metro first. Nearby communities reviewed by project type, access, schedule, and fit.": "Primero el metro principal. Comunidades cercanas se revisan por tipo de proyecto, acceso, agenda y ajuste.",
  "Local remodeling service area": "Área local de servicio de remodelación",
  "Kitchen, bathroom, interior, exterior, and repair remodeling near Oklahoma City.": "Remodelación de cocinas, baños, interiores, exteriores y reparaciones cerca de Oklahoma City.",
  "Brothers Remodeling OKC serves Oklahoma City and nearby surrounding communities with bilingual remodeling communication and a practical quote path.": "Brothers Remodeling OKC sirve a Oklahoma City y comunidades cercanas con comunicación bilingüe y una ruta práctica de cotización.",
  "What service-area fit means.": "Qué significa que el área de servicio sea adecuada.",
  "Location": "Ubicación",
  "Start with the city or nearest OKC-area community so the team can review drive time and access.": "Empiece con la ciudad o comunidad cercana a OKC para revisar tiempo de traslado y acceso.",
  "Scope": "Alcance",
  "Details": "Detalles",
  "Communication": "Comunicación",
  "Sitemap": "Mapa del sitio",
  "All Brothers Remodeling OKC website pages.": "Todas las páginas del sitio de Brothers Remodeling OKC.",
  "Use this page to find every main route, service page, service-area page, contact option, and sitemap file.": "Use esta página para encontrar rutas principales, páginas de servicio, áreas de servicio, contacto y sitemap.",
  "Contact Brothers Remodeling OKC": "Contactar a Brothers Remodeling OKC",
  "Tell us what you want remodeled.": "Díganos qué quiere remodelar.",
  "Send project details in English or Spanish. Include the room, address area, timeline, and photos if you have them.": "Envíe detalles del proyecto en inglés o español. Incluya la habitación, zona de la dirección, tiempo y fotos si las tiene.",
  "Request a quote conversation.": "Solicitar una conversación de cotización.",
  "Use the form or email project photos to start a real quote conversation.": "Use el formulario o envíe fotos por email para iniciar una conversación real de cotización.",
  "Page not found": "Página no encontrada",
  "The page you requested is not available.": "La página solicitada no está disponible.",
  "Back home": "Volver al inicio",
  "Please add your name, phone, project type, and a short project description before sending.": "Agregue su nombre, teléfono, tipo de proyecto y una breve descripción antes de enviar.",
  "Your project details were sent. Brothers Remodeling OKC will review the request and follow up with the next step.": "Sus detalles fueron enviados. Brothers Remodeling OKC revisará la solicitud y dará seguimiento con el siguiente paso.",
  "The form could not be sent right now. Please email the project details and photos to brothersremodelingokc@gmail.com.": "El formulario no se pudo enviar en este momento. Envíe los detalles y fotos por email a brothersremodelingokc@gmail.com.",
};

const placeholderEs: Record<string, string> = {
  "Full name": "Nombre completo",
  "Best phone number to call or text": "Mejor teléfono para llamar o enviar texto",
  "Email address optional": "Email opcional",
  "Oklahoma City, Edmond, Yukon...": "Oklahoma City, Edmond, Yukon...",
  "Tell us what needs remodeled, repaired, replaced, or updated. Include room, rough timeline, access notes, pets, parking, budget range, and whether you have photos ready.": "Díganos qué necesita remodelarse, repararse, reemplazarse o actualizarse. Incluya habitación, tiempo aproximado, acceso, mascotas, estacionamiento, rango de presupuesto y si tiene fotos listas.",
  "Morning, afternoon, evening, or specific days": "Mañana, tarde, noche o días específicos",
};

function translateTextValue(value: string): string {
  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) return value;
  let translated = textEs[compact];
  if (!translated) {
    const serviceMatch = compact.match(/^Read the (.+) service page$/);
    if (serviceMatch) translated = `Leer la página de ${serviceNameEs[serviceMatch[1]] || serviceMatch[1]}`;
  }
  if (!translated) {
    const progress = compact.match(/^Checklist progress: (\d+) of (\d+) ready\.$/);
    if (progress) translated = `Progreso de la lista: ${progress[1]} de ${progress[2]} listo(s).`;
  }
  if (!translated) {
    const serviceTitle = Object.entries(serviceNameEs).find(([, es]) => compact.includes(es))?.[0];
    const commonMatch = compact.match(/^Common (.+) details$/);
    if (commonMatch) translated = `Detalles comunes de ${serviceNameEs[commonMatch[1]] || commonMatch[1]}`;
    const knowMatch = compact.match(/^What homeowners should know before starting (.+)\.$/);
    if (knowMatch) translated = `Lo que los propietarios deben saber antes de comenzar ${serviceNameEs[serviceTitle || knowMatch[1]] || knowMatch[1]}.`;
  }
  if (!translated) return value;
  return value.replace(compact, translated);
}

function applyNativeTranslations(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language;
  document.title = language === "es" ? "Brothers Remodeling OKC | Remodelación en Oklahoma City" : "Brothers Remodeling OKC | Oklahoma City Remodeling";
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", language === "es" ? "Brothers Remodeling OKC ofrece remodelación bilingüe para cocinas, baños, pisos, interiores, exteriores, garajes y reparaciones en Oklahoma City." : "Brothers Remodeling OKC provides bilingual remodeling for kitchens, bathrooms, flooring, interiors, exterior work, garages, and repairs in Oklahoma City.");
  document.querySelectorAll("[data-i18n-original]").forEach((node) => {
    const original = node.getAttribute("data-i18n-original") || "";
    node.textContent = language === "es" ? translateTextValue(original) : original;
  });
  document.querySelectorAll("body *").forEach((node) => {
    const element = node as HTMLElement;
    if (["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "PATH"].includes(element.tagName)) return;
    element.childNodes.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return;
      const original = (child as Text).data;
      if (!original.replace(/\s+/g, "").length) return;
      const parent = child.parentElement;
      if (!parent) return;
      if (parent.childNodes.length === 1) {
        if (!parent.getAttribute("data-i18n-original")) parent.setAttribute("data-i18n-original", original);
        child.textContent = language === "es" ? translateTextValue(parent.getAttribute("data-i18n-original") || original) : (parent.getAttribute("data-i18n-original") || original);
      } else {
        child.textContent = language === "es" ? translateTextValue(original) : original;
      }
    });
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const current = element.getAttribute(attribute);
      if (!current) return;
      const key = `data-i18n-${attribute}`;
      const original = element.getAttribute(key) || current;
      if (!element.getAttribute(key)) element.setAttribute(key, original);
      const translated = attribute === "placeholder" ? (placeholderEs[original] || translateTextValue(original)) : translateTextValue(original);
      element.setAttribute(attribute, language === "es" ? translated : original);
    });
  });
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return <div className="languageToggle" aria-label="Language selector">
    <button type="button" className={language === "en" ? "active" : ""} aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
    <span>/</span>
    <button type="button" className={language === "es" ? "active" : ""} aria-pressed={language === "es"} onClick={() => setLanguage("es")}>Español</button>
  </div>;
}

function NativeTranslationLayer({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  React.useEffect(() => {
    applyNativeTranslations(language);
    const observer = new MutationObserver(() => window.requestAnimationFrame(() => applyNativeTranslations(language)));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);
  return <>{children}</>;
}


const services: Array<[string, string, IconType]> = [
  ["Kitchen Remodeling", "Cabinets, counters, backsplash, lighting, islands, flooring, layout improvements, and cleaner daily function.", Utensils],
  ["Bathroom Remodeling", "Showers, tubs, tile, vanities, fixtures, waterproofing details, ventilation, and better storage.", Bath],
  ["Interior Renovations", "Drywall, texture, trim, paint, doors, baseboards, accent walls, room updates, and layout changes.", HomeIcon],
  ["Flooring Installation", "LVP, tile, laminate, transitions, subfloor prep, and finish carpentry that ties the remodel together.", Hammer],
  ["Exterior Remodeling", "Siding, facade updates, decks, fences, exterior paint, curb appeal, windows, doors, and practical repairs.", DoorOpen],
  ["Additions, Garages & Conversions", "Added living areas, garage remodels, storage upgrades, offices, commercial spaces, and better use of square footage.", Building2],
  ["Outdoor Living Spaces", "Patios, exterior gathering areas, repairs, fencing, and improvements that make the outside more usable.", Warehouse],
  ["Repair & Maintenance", "Punch-list repairs, patching, painting, maintenance, and smaller details that keep a property sharp.", Wrench],
];

const portfolioPhotos = [
  { src: "/images/portfolio/1000017123.jpg", alt: "Brothers Remodeling OKC completed remodeling project photo", title: "Finished remodel photo", note: "Real project image from the existing Brothers Remodeling OKC gallery." },
  { src: "/images/portfolio/1000061807.jpg", alt: "Brothers Remodeling OKC interior remodeling project photo", title: "Interior remodeling detail", note: "Gallery photo carried over from the original Brothers Remodeling OKC site." },
  { src: "/images/portfolio/1000061808.jpg", alt: "Brothers Remodeling OKC remodeling finish photo", title: "Remodel finish detail", note: "Original gallery image preserved for project reference." },
  { src: "/images/portfolio/1000061858.jpg", alt: "Brothers Remodeling OKC wide remodeling project photo", title: "Completed work view", note: "Real Brothers Remodeling OKC gallery photo." },
  { src: "/images/portfolio/1000050989.jpg", alt: "Brothers Remodeling OKC vertical project photo", title: "Project detail photo", note: "Original site portfolio image." },
  { src: "/images/portfolio/1000024889.jpg", alt: "Brothers Remodeling OKC remodeling detail photo", title: "Remodel detail", note: "Photo imported from the prior Brothers Remodeling OKC gallery." },
  { src: "/images/portfolio/1000023327.jpg", alt: "Brothers Remodeling OKC completed room update photo", title: "Room update photo", note: "Real project image from the existing gallery." },
  { src: "/images/portfolio/1000023299.jpg", alt: "Brothers Remodeling OKC project progress or finish photo", title: "Project photo", note: "Existing Brothers Remodeling OKC gallery asset." },
  { src: "/images/portfolio/1000019089.jpg", alt: "Brothers Remodeling OKC remodeling project image", title: "Remodeling project image", note: "Gallery photo brought over from the old site." },
  { src: "/images/portfolio/brothers-whatsapp-gallery-01.jpeg", alt: "Brothers Remodeling OKC homeowner-supplied portfolio photo", title: "New portfolio photo", note: "Recent photo supplied for the Brothers Remodeling OKC gallery." },
  { src: "/images/portfolio/brothers-whatsapp-gallery-02.jpeg", alt: "Brothers Remodeling OKC recent project portfolio photo", title: "New project detail", note: "Recent homeowner-supplied image added to the portfolio." },
  { src: "/images/portfolio/brothers-whatsapp-gallery-03.jpeg", alt: "Brothers Remodeling OKC added remodeling portfolio photo", title: "Added gallery photo", note: "Additional Brothers Remodeling OKC portfolio image." },
  { src: "/images/portfolio/brothers-whatsapp-gallery-04.jpeg", alt: "Brothers Remodeling OKC added project gallery photo", title: "Added project photo", note: "New gallery photo supplied for project reference." },
];

const serviceDetails = [
  { slug: "kitchen-remodeling", title: "Kitchen Remodeling", short: "Cabinets, counters, backsplash, lighting, islands, flooring, layout improvements, and cleaner daily function.", icon: Utensils, focus: "cabinet layout, countertops, backsplash, lighting, flooring, appliance placement, storage, and the way the kitchen connects to daily traffic", rooms: "kitchens, dining edges, pantry areas, laundry connections, and open living spaces" },
  { slug: "bathroom-remodeling", title: "Bathroom Remodeling", short: "Showers, tubs, tile, vanities, fixtures, waterproofing details, ventilation, and better storage.", icon: Bath, focus: "showers, tubs, tile, vanities, waterproofing, ventilation, storage, fixture placement, and clean finish details", rooms: "primary baths, hall baths, powder rooms, guest baths, and compact bathrooms" },
  { slug: "interior-renovations", title: "Interior Renovations", short: "Drywall, texture, trim, paint, doors, baseboards, accent walls, room updates, and layout changes.", icon: HomeIcon, focus: "drywall, texture, trim, paint, doors, baseboards, room openings, accent details, and layout improvements", rooms: "living rooms, bedrooms, hallways, offices, rental spaces, and whole-home interiors" },
  { slug: "flooring-installation", title: "Flooring Installation", short: "LVP, tile, laminate, transitions, subfloor prep, and finish carpentry that ties the remodel together.", icon: Hammer, focus: "floor removal, subfloor prep, LVP, laminate, tile, transitions, baseboards, and finish carpentry", rooms: "kitchens, baths, living rooms, bedrooms, hallways, garages, and rental properties" },
  { slug: "exterior-remodeling", title: "Exterior Remodeling", short: "Siding, facade updates, decks, fences, exterior paint, curb appeal, windows, doors, and practical repairs.", icon: DoorOpen, focus: "siding, trim, paint, doors, windows, decks, fences, exterior repairs, curb appeal, and weather-facing details", rooms: "front elevations, patios, side yards, backyards, garages, entries, and rental exteriors" },
  { slug: "additions-garages-conversions", title: "Additions, Garages & Conversions", short: "Added living areas, garage remodels, storage upgrades, offices, commercial spaces, and better use of square footage.", icon: Building2, focus: "added square footage, garage conversions, office spaces, storage, framing, insulation, drywall, flooring, and finish tie-ins", rooms: "garages, bonus rooms, additions, offices, workshops, and light commercial spaces" },
  { slug: "outdoor-living-spaces", title: "Outdoor Living Spaces", short: "Patios, exterior gathering areas, repairs, fencing, and improvements that make the outside more usable.", icon: Warehouse, focus: "patios, decks, fences, exterior gathering areas, repairs, access, shade, privacy, and usable outdoor upgrades", rooms: "patios, backyards, side yards, porches, deck areas, and exterior gathering spaces" },
  { slug: "repair-maintenance", title: "Repair & Maintenance", short: "Punch-list repairs, patching, painting, maintenance, and smaller details that keep a property sharp.", icon: Wrench, focus: "drywall patches, paint touchups, trim repairs, doors, hardware, exterior fixes, punch-list work, and property maintenance", rooms: "occupied homes, rental properties, offices, garages, kitchens, baths, and exterior areas" },
] as const;
const serviceSlugs = serviceDetails.map((service) => service.slug);
function slugifyService(title: string) { return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function serviceBySlug(slug?: string) { return serviceDetails.find((service) => service.slug === slug); }
function serviceSeoSections(service: typeof serviceDetails[number]) {
  const lower = service.title.toLowerCase();
  return [
    {
      heading: `${service.title} in Oklahoma City: start with the real condition of the home`,
      body: `Brothers Remodeling OKC handles ${lower} for homeowners who want practical remodeling help, not vague promises or a generic brochure answer. A good project starts by looking at what is already there: the age of the home, the condition of the surfaces, how the room is used, what has been repaired before, what needs to stay, what needs to change, and what level of finish makes sense for the budget. Many Oklahoma City homes have older framing, uneven floors, dated texture, old caulk lines, patched drywall, shifted trim, weather exposure, rental wear, or previous work that was done quickly. Those details matter because remodeling is never just the visible finish. The finish depends on prep, repair, installation, cleanup, and communication before the final coat of paint or last piece of trim goes in.`
    },
    {
      heading: `What ${lower} can include`,
      body: `For ${lower}, common work can include ${service.focus}. The exact scope depends on the home, the existing materials, the desired finish, and the way the project connects to nearby rooms or exterior areas. A kitchen update may involve cabinets, counters, backsplash, flooring, wall repair, lighting changes, appliance fit, and trim. A bathroom update may involve waterproofing, tile, fixtures, ventilation, drywall, vanity placement, flooring, and paint. Flooring work can affect baseboards, transitions, door clearance, and subfloor preparation. Exterior work can involve siding, trim, caulk, paint, doors, windows, deck details, fencing, and weather-facing repairs. Brothers Remodeling OKC keeps those connected details in one conversation so homeowners are not left coordinating unrelated pieces of the same finished result.`
    },
    {
      heading: `How to prepare before requesting a quote`,
      body: `The most useful first request includes the address area, the project type, photos if available, the room or exterior area involved, the approximate timeline, and a plain-English description of what is not working now. Homeowners do not need perfect measurements to start, but photos help show the existing condition, corners, transitions, access, ceiling height, flooring changes, water damage, trim gaps, patched areas, and other details that can affect the work. If the project involves ${service.rooms}, it helps to mention whether the home is occupied, whether pets are present, whether parking is limited, whether there are access restrictions, and whether the work needs to be phased around family schedules or tenants. Clear information helps Brothers Remodeling OKC decide whether the next step should be a call, a visit, a quote path, or a more detailed materials conversation.`
    },
    {
      heading: `A structured project path instead of guesswork`,
      body: `The project path is intentionally straightforward: receive the details, review the fit, confirm the next step, and then plan the work if the project makes sense. That structure is important because remodeling is a sequence of decisions. Before work begins, the homeowner and contractor should understand what area is being changed, what materials are expected, what preparation may be needed, how the new work meets existing surfaces, and what cleanup or finish details matter. During the project, small decisions can affect the final look: trim alignment, caulk lines, grout color, texture matching, flooring direction, thresholds, paint sheen, door swings, cabinet clearance, fixture height, and how old construction meets new material. Brothers Remodeling OKC focuses on direct communication so the homeowner understands the work being discussed before the project moves forward.`
    },
    {
      heading: `Why local Oklahoma City remodeling details matter`,
      body: `Oklahoma City homes are not all built the same. Some are older properties with original framing and settled floors. Some have storm exposure or exterior materials that need extra attention. Some have been updated several times by different owners. Some rental or investment properties need durable, clean work instead of delicate finishes. Local remodeling requires flexibility because hidden conditions can appear after old materials are removed. A wall that looked simple may have old patching behind it. Flooring may reveal subfloor movement. Exterior trim may show rot once paint is scraped. A bathroom may need more prep before tile can be installed correctly. Brothers Remodeling OKC does not need to invent big claims to explain that. The value is in careful observation, practical construction thinking, and honest next-step communication.`
    },
    {
      heading: `Materials, finishes, and realistic expectations`,
      body: `${service.title} can look very different depending on the finish level. A practical rental refresh, a mid-range family-home update, and a more detailed finish upgrade are not the same project even if they involve the same room. Materials affect cost, schedule, installation method, durability, and cleanup. Homeowners should think about whether they want simple and durable, clean and modern, or more detailed and custom. They should also consider how the project connects with nearby finishes. New flooring may make old trim look rough. New paint may expose wall texture problems. A new door may reveal framing that is not square. New exterior paint may show where caulking, trim, or siding repair is needed first. A clear conversation about finish expectations helps prevent a quote from being based on assumptions.`
    },
    {
      heading: `Communication in English or Spanish`,
      body: `Brothers Remodeling OKC welcomes English and Spanish project conversations. That matters because remodeling details need to be understood clearly. Homeowners should feel comfortable explaining what they want changed, asking what the next step is, and sharing concerns about timing, access, budget range, or finish level. A strong remodeling conversation is not only about selling the job. It is about understanding the home, the homeowner's priorities, and the practical steps required to complete the work. If project photos are available, sending them with the city or neighborhood, the room, and the desired result helps the team respond with better questions and a more useful next step.`
    },
    {
      heading: `Service area for this remodeling work`,
      body: `This ${lower} service is centered on Oklahoma City and nearby communities such as Edmond, Yukon, Moore, Midwest City, Del City, Bethany, Warr Acres, The Village, and Nichols Hills. Projects outside the core area can still be reviewed by work type, schedule, access, and fit. The goal is not to promise every project in every location. The goal is to review the request honestly and decide whether Brothers Remodeling OKC is the right fit for the work. Larger or clearer projects are easier to evaluate than vague requests with no photos, no city, and no description. Homeowners can improve the first response by sharing enough context to understand the scope.`
    },
    {
      heading: `What this page is meant to do`,
      body: `This page is written to help homeowners understand ${lower} before reaching out. It avoids fake review counts, invented awards, fake license numbers, and generic claims that do not help with a real project. Instead, it explains how Brothers Remodeling OKC thinks about the service, what details are useful, how the work may connect to other parts of the home, and how to begin the quote conversation. If you are comparing remodeling options, use this page as a checklist. Describe the room or exterior area. Gather photos. Note the city or neighborhood. Think about the desired finish level. Mention your timeline. Then send enough detail for a useful response.`
    },
    {
      heading: `Requesting a ${lower} quote`,
      body: `When you are ready to discuss ${lower}, use the contact form or email project photos directly to Brothers Remodeling OKC. Include the project type, the address area, the rooms or exterior areas involved, and what you want the finished result to accomplish. A clear request helps the team respond with better questions and a better next step. Whether the project is a focused update, a repair-heavy improvement, or part of a larger whole-home plan, the goal is the same: practical remodeling work, direct communication, and a finished space that makes the home look better and work better for everyday life.`
    }
  ];
}
function serviceSeoCopy(title: string) { const detail = serviceDetails.find((service) => service.title === title) || serviceDetails[0]; return serviceSeoSections(detail).map((section) => section.body); }
function splitServiceFocus(focus: string) { return focus.split(/,\s*|,\s*and\s*/).map((item) => item.replace(/^and\s+/i, "").trim()).filter(Boolean).slice(0, 8); }
function splitServiceRooms(rooms: string) { return rooms.split(/,\s*|,\s*and\s*/).map((item) => item.replace(/^and\s+/i, "").trim()).filter(Boolean).slice(0, 6); }
function ServiceDetailLayout({ service, sections }: { service: typeof serviceDetails[number]; sections: ReturnType<typeof serviceSeoSections> }) {
  const focusItems = splitServiceFocus(service.focus);
  const roomItems = splitServiceRooms(service.rooms);
  const keySections = sections.slice(0, 6);
  const supportSections = sections.slice(6);
  return <>
    <section className="section serviceOverview">
      <div className="serviceIntroPanel">
        <p className="eyebrow dark"><Hammer size={18} /> Service overview</p>
        <h2>Clear scope first. Better remodeling conversation next.</h2>
        <p className="sectionLead">{service.short} Brothers Remodeling OKC keeps the service page organized around what homeowners actually need to decide: scope, condition, prep, finish level, communication, and next steps.</p>
        <div className="serviceQuickStats">
          <span><b>1</b> Describe the room</span>
          <span><b>2</b> Send photos</span>
          <span><b>3</b> Review scope</span>
        </div>
      </div>
      <LeadForm />
    </section>
    <section className="section serviceStructured">
      <div>
        <p className="eyebrow dark"><CheckCircle2 size={18} /> What this can include</p>
        <h2>{service.title} details without the wall of text.</h2>
      </div>
      <div className="serviceDetailCards">
        {focusItems.map((item) => <article key={item}><CheckCircle2 size={18} /><span>{item}</span></article>)}
      </div>
    </section>
    <section className="section serviceTwoColumn">
      <article className="servicePanel">
        <h2>Where this work commonly shows up.</h2>
        <div className="chips compactChips">{roomItems.map((item) => <span key={item}>{item}</span>)}</div>
      </article>
      <article className="servicePanel accentPanel">
        <h2>Helpful first details.</h2>
        <ul>{["Address area or nearest OKC neighborhood", "Photos from multiple angles", "Timeline and access notes", "Finish level or budget range", "What must be repaired, replaced, or updated"].map((item) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}</ul>
      </article>
    </section>
    <section className="section serviceGuideGrid">
      <div className="serviceGuideIntro"><p className="eyebrow dark"><ClipboardCheck size={18} /> Project guide</p><h2>Short, scannable guidance for {service.title.toLowerCase()}.</h2></div>
      <div className="guideCards">{keySections.map((section, index) => <article className="guideCard" key={section.heading}><b>{String(index + 1).padStart(2, "0")}</b><h3>{section.heading}</h3><p>{section.body}</p></article>)}</div>
    </section>
    <section className="section serviceSupportGrid">
      {supportSections.map((section) => <article className="servicePanel" key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></article>)}
    </section>
    <LeadLeakAudit />
    <BeforeAfterComparison />
  </>;
}

const cities: City[] = [
  { name: "Oklahoma City", slug: "oklahoma-city", note: "kitchen remodels, bathroom upgrades, flooring, drywall, trim, paint, exterior repairs, garage updates, and full-home refreshes for OKC homeowners", nearby: "Downtown, Uptown, Classen, Mayfair, Belle Isle, Capitol Hill, and central OKC neighborhoods" },
  { name: "Edmond", slug: "edmond", note: "kitchen and bath updates, trim carpentry, flooring, painting, exterior improvements, and careful finish work for north metro homes", nearby: "Edmond, Memorial Road, north OKC, and nearby neighborhoods that need clean, practical remodeling" },
  { name: "Yukon", slug: "yukon", note: "west-metro remodels including kitchens, bathrooms, floors, drywall, exterior repairs, garages, and whole-home updates", nearby: "Yukon, Lake Overholser, west OKC, and nearby Canadian County homes" },
  { name: "Nichols Hills", slug: "nichols-hills", note: "premium interior finishes, kitchens, bathrooms, exterior details, trim, doors, and careful home upgrades", nearby: "Nichols Hills, Grand Boulevard, Wilshire, and nearby northwest OKC homes" },
  { name: "The Village", slug: "the-village", note: "bathroom remodels, kitchen updates, flooring, paint, doors, trim, and practical repairs for established homes", nearby: "The Village, Britton, Casady, and nearby north OKC streets" },
  { name: "Warr Acres", slug: "warr-acres", note: "whole-home refreshes, flooring, drywall, paint, garage improvements, exterior repair, and maintenance work", nearby: "Warr Acres, Putnam City, Bethany edge, and northwest OKC homes" },
  { name: "Bethany", slug: "bethany", note: "kitchens, baths, additions, flooring, exterior paint, window and door updates, and repair projects", nearby: "Bethany, Lake Overholser edge, Route 66 corridor, and west OKC homes" },
  { name: "Del City", slug: "del-city", note: "interior remodels, exterior updates, doors, windows, flooring, paint, and repair work", nearby: "Del City, Sunnylane corridor, Tinker-area neighborhoods, and southeast OKC edge" },
  { name: "Midwest City", slug: "midwest-city", note: "kitchen updates, bathroom renovations, flooring, drywall, garages, exterior work, and general remodeling", nearby: "Midwest City, Tinker-area homes, Soldier Creek, and nearby east-side communities" },
  { name: "Moore", slug: "moore", note: "nearby remodel projects for kitchens, bathrooms, floors, exterior repairs, paint, and full-home updates", nearby: "Moore, north Moore, south OKC edge, and I-35 corridor homes" },
];

function track(type: string, payload: Record<string, string> = {}) { try { window.dispatchEvent(new CustomEvent("jeriko:track", { detail: { type, ...payload } })); } catch {} }
const QuoteModalContext = React.createContext<(source?: string) => void>(() => {});
function AppLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) { return <Link href={href} className={className} onClick={onClick}>{children}</Link>; }
function QuoteButton({ children, className = "cta", source = "quote-button" }: { children: React.ReactNode; className?: string; source?: string }) { const openQuote = React.useContext(QuoteModalContext); return <button type="button" className={className} onClick={() => { track("quote_modal_open", { source }); openQuote(source); }}>{children}</button>; }
function cityBySlug(slug?: string) { return cities.find((city) => city.slug === slug); }

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);
  const navItems = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Process", "/process"],
    ["About", "/about"],
    ["Gallery", "/gallery"],
    ["Service Area", "/service-area"],
    ["Contact", "/contact"],
  ];
  return <header className={`top ${menuOpen ? "menuOpen" : ""}`}>
    <div className="mobileTopRow">
      <AppLink className="brand" href="/" onClick={closeMenu}><img src="/images/current-site/logo.jpg" alt="Brothers Remodeling OKC logo" /><b>Brothers Remodeling OKC</b></AppLink>
      <button type="button" className="mobileMenuButton" aria-label={menuOpen ? "Close menu" : "Menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}<span>{menuOpen ? "Close menu" : "Menu"}</span></button>
    </div>
    <nav id="main-navigation" className="mainNav" aria-label="Main navigation">{navItems.map(([label, href]) => <AppLink key={href} href={href} onClick={closeMenu}>{label}</AppLink>)}</nav>
    <div className="headerActions"><LanguageToggle /><QuoteButton className="pill" source="header-request-quote">Request Quote</QuoteButton></div>
  </header>;
}
function SiteMotion() {
  React.useEffect(() => {
    const root = document.documentElement;
    const updateMouse = (event: PointerEvent) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };
    const updateScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      root.style.setProperty("--scroll", `${progress * 100}%`);
    };
    window.addEventListener("pointermove", updateMouse, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener("pointermove", updateMouse);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);
  return <><div className="scrollProgress" aria-hidden="true" /><div className="cursorGlow" aria-hidden="true" /><div className="siteParticles" aria-hidden="true"><i /><i /><i /><i /></div></>;
}
function Footer() {
  return <footer className="siteFooter">
    <div className="footerBrand">
      <img src="/images/current-site/logo.jpg" alt="Brothers Remodeling OKC logo" />
      <div><b>Brothers Remodeling OKC LLC</b><p>Full-service bilingual remodeling in Oklahoma City and nearby communities. Kitchens, bathrooms, flooring, interiors, exterior work, garages, additions, outdoor living, repairs, and maintenance.</p></div>
    </div>
    <div className="footerColumns">
      <section><h3>Contact</h3><p><Mail size={16} /> <a data-jeriko-track="email_click" href={`mailto:${email}`}>{email}</a></p><p><MapPin size={16} /> Oklahoma City, Oklahoma</p><p><Languages size={16} /> English / Español</p><QuoteButton className="footerCta" source="footer-request-quote">Request a remodeling quote</QuoteButton></section>
      <section><h3>Main pages</h3><AppLink href="/">Home</AppLink><AppLink href="/services">Services</AppLink><AppLink href="/process">Process</AppLink><AppLink href="/about">About</AppLink><AppLink href="/gallery">Gallery</AppLink><AppLink href="/service-area">Service Area</AppLink><AppLink href="/contact">Contact</AppLink><AppLink href="/sitemap">HTML Sitemap</AppLink><span>XML Sitemap: /sitemap.xml</span></section>
      <section><h3>Services</h3>{serviceDetails.map((service) => <AppLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</AppLink>)}</section>
      <section><h3>Service areas</h3>{cities.map((city) => <AppLink key={city.slug} href={`/service-area/${city.slug}`}>{city.name}</AppLink>)}</section>
    </div>
    <div className="footerBottom"><span>© {new Date().getFullYear()} Brothers Remodeling OKC LLC. No fake reviews, no online payments, no auth.</span><span>Built for real remodeling quote conversations.</span></div>
  </footer>;
}
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="quoteModalBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="quoteModal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <button type="button" className="modalClose" aria-label="Close quote form" onClick={onClose}>×</button>
      <div className="modalIntro"><p className="eyebrow dark"><Mail size={18} /> Fast quote request</p><h2 id="quote-modal-title">Tell Brothers Remodeling OKC who to call and what needs remodeled.</h2><p>Add your name, phone number, project type, and clear instructions. If photos are ready, email them after submitting.</p></div>
      <LeadForm />
    </section>
  </div>;
}

function Shell({ children }: { children: React.ReactNode }) {
  const [quoteOpen, setQuoteOpen] = React.useState(false);
  const closeQuote = React.useCallback(() => setQuoteOpen(false), []);
  const openQuote = React.useCallback(() => setQuoteOpen(true), []);
  return <QuoteModalContext.Provider value={openQuote}><SiteMotion /><Header /><main>{children}</main><StickyAuditRail /><Footer /><ContactModal open={quoteOpen} onClose={closeQuote} /></QuoteModalContext.Provider>;
}

function LeadForm({ city }: { city?: string }) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = React.useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const projectType = String(data.get("project") || "").trim();
    const projectDescription = String(data.get("message") || "").trim();
    if (!fullName || !phone || !projectType || !projectDescription) {
      setStatus("error");
      setMessage("Please add your name, phone, project type, and a short project description before sending.");
      return;
    }
    const [firstName, ...rest] = fullName.split(/\s+/);
    const payload = {
      firstName: firstName || "Homeowner",
      lastName: rest.join(" ") || "Not provided",
      email: String(data.get("email") || email),
      phone,
      city: String(data.get("city") || city || "Oklahoma City"),
      state: "Oklahoma",
      projectType,
      projectDescription,
      bestTime: String(data.get("bestTime") || "Not specified"),
      sourceUrl: window.location.href,
      sourceLabel: city ? "city-page" : "website",
      consent: true,
    };
    setStatus("sending");
    track("form_submit", { form: city ? "city-page" : "main" });
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Contact endpoint rejected the request");
      setStatus("sent");
      setMessage("Your project details were sent. Brothers Remodeling OKC will review the request and follow up with the next step.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`The form could not be sent right now. Please email the project details and photos to ${email}.`);
    }
  }
  return <form data-jeriko-track="form_submit" className="lead" onSubmit={submit} noValidate>
    <h3>Request a remodeling quote</h3>
    <p className="formInstructions">Fill in the basics below so Brothers Remodeling OKC knows exactly who to call, where the project is, and what needs remodeled. English or Spanish is welcome.</p>
    {message && <div className={`formStatus ${status}`} role="status"><b>{status === "sent" ? "Request sent." : "Email option available."}</b><span>{message}</span></div>}
    <div className="fieldGrid">
      <label><span>Your name / Nombre</span><input name="name" autoComplete="name" required autoFocus placeholder="Full name" /></label>
      <label><span>Phone number / Teléfono</span><input name="phone" type="tel" autoComplete="tel" required placeholder="Best phone number to call or text" /></label>
    </div>
    <div className="fieldGrid">
      <label><span>Email, if you want replies there</span><input name="email" type="email" autoComplete="email" placeholder="Email address optional" /></label>
      <label><span>City or part of OKC</span><input name="city" defaultValue={city || ""} placeholder="Oklahoma City, Edmond, Yukon..." /></label>
    </div>
    <label><span>Project type</span><select name="project" required><option value="">Choose the closest project type</option><option>Kitchen</option><option>Bathroom</option><option>Flooring</option><option>Addition</option><option>Deck</option><option>Whole Home</option><option>Exterior</option><option>Other</option></select></label>
    <label><span>Project instructions</span><textarea name="message" required placeholder="Tell us what needs remodeled, repaired, replaced, or updated. Include room, rough timeline, access notes, pets, parking, budget range, and whether you have photos ready." /></label>
    <label><span>Best time to call</span><input name="bestTime" placeholder="Morning, afternoon, evening, or specific days" /></label>
    <button disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Project"} <ArrowRight size={18} /></button>
    <small>You can also send photos and details to <a href={`mailto:${email}`}>{email}</a>.</small>
  </form>;
}

function ServicesGrid() { return <div className="cards">{services.map(([title, text, Icon]) => <article className="card" key={title}><Icon size={34} /><h3>{title}</h3><p>{text}</p></article>)}</div>; }
function LeadOpsVisual() {
  const steps = [
    { label: "Project details", detail: "Room, city, timing, and the real problem", width: 24 },
    { label: "Photos reviewed", detail: "Access, finishes, damage, and hidden-condition clues", width: 49 },
    { label: "Quote path", detail: "Call, visit, scope notes, and next-step fit", width: 73 },
    { label: "Build plan", detail: "Schedule, materials, cleanup, and communication", width: 94 },
  ];
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % steps.length), 1900);
    return () => window.clearInterval(timer);
  }, [steps.length]);
  return <div className="opsVisual animatedOps" aria-label="Animated remodel project command center visual">
    <div className="opsScanner" />
    <div className="opsTop"><span><i /> Live project path</span><b>{steps[active].label} → {steps[(active + 1) % steps.length].label}</b></div>
    <div className="opsStageRail">{steps.map((step, index) => <button type="button" key={step.label} className={index === active ? "current" : ""} onClick={() => setActive(index)}><em>{index + 1}</em><strong>{step.label}</strong><small>{step.detail}</small></button>)}</div>
    <div className="opsRows">{["Kitchen / bath requests", "Photos and access notes", "Materials and finish level", "Scheduling and next steps"].map((item, index) => <span key={item} className={index === active ? "active" : ""}><i />{item}</span>)}</div>
    <div className="opsMeter"><i style={{ width: `${steps[active].width}%` }} /></div>
    <div className="opsPulseGrid"><span>Scope clarity</span><span>Photo review</span><span>Quote fit</span></div>
  </div>;
}
function LeadFlowLineSection() { const steps = ["Project details received", "Details reviewed", "Visit or quote step confirmed", "Remodel work scheduled"]; return <section className="section flow"><p className="eyebrow dark"><ClipboardCheck size={18} /> Project flow</p><h2>A cleaner path from first message to remodel plan.</h2><div className="flowLine">{steps.map((step, index) => <div key={step} className="flowStep"><b>{index + 1}</b><span>{step}</span></div>)}</div></section>; }
function LeadLeakAudit() { const { language } = useLanguage(); const items = ["Room or area is clearly described", "Photos are ready to send", "Timeline expectations are known", "Access, pets, parking, or special notes are listed", "Budget range or finish level can be discussed"]; const [checked, setChecked] = React.useState<string[]>([]); return <section className="section audit"><p className="eyebrow dark"><Shield size={18} /> Interactive checklist</p><h2>Before you request a quote, collect the details that prevent back-and-forth.</h2><div className="auditGrid">{items.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={(e) => setChecked((current) => e.target.checked ? [...current, item] : current.filter((x) => x !== item))} /><span>{item}</span></label>)}</div><p className="sectionLead">{language === "es" ? `Progreso de la lista: ${checked.length} de ${items.length} listo(s).` : `Checklist progress: ${checked.length} of ${items.length} ready.`}</p></section>; }
function BeforeAfterComparison() { return <section className="section compare"><p className="eyebrow dark"><Paintbrush size={18} /> Before / after comparison</p><h2>From scattered remodel ideas to a clear project conversation.</h2><div className="compareGrid"><article><b>Before</b><p>Loose ideas, missing photos, unclear priorities, unknown timeline, and no easy way to explain the remodel.</p></article><article><b>After</b><p>Room, photos, timeline, city, and project type collected so Brothers Remodeling OKC can respond with a useful next step.</p></article></div></section>; }
function StickyAuditRail() { return <aside className="stickyRail"><span>Ready for a remodel?</span><QuoteButton className="stickyQuote" source="sticky-request-quote">Request quote</QuoteButton></aside>; }

function HomePage() { return <Shell><section className="hero"><div className="glow one" /><div className="glow two" /><div className="heroGrid"><div><p className="eyebrow"><Sparkles size={18} /> Full-service remodeling • English / Español</p><h1>Remodel your OKC home without the runaround.</h1><p className="sub">Brothers Remodeling OKC LLC helps homeowners update kitchens, bathrooms, floors, walls, exterior spaces, garages, and full homes across Oklahoma City and nearby areas.</p><div className="actions"><QuoteButton className="cta" source="hero-request-quote">Request Remodeling Quote <ArrowRight size={20} /></QuoteButton><a data-jeriko-track="email_click" onClick={() => track("email_click", { location: "hero" })} className="ghost" href={`mailto:${email}`}>Email Project Photos</a></div><div className="stats"><span><b>Full</b> service</span><span><b>Bi</b> lingual</span><span><b>OKC</b> focused</span></div></div><div className="showcase"><img src="/images/current-site/hero.jpg" alt="Brothers Remodeling OKC exterior remodeling work" /><div className="glass">Kitchens • Bathrooms • Floors • Paint • Exterior • Repairs</div></div></div></section><section className="section commandWrap"><LeadOpsVisual /></section><section className="strip">{["English and Spanish communication available", "Kitchens, baths, floors, paint, exterior work, garages, and repairs", "Focused on Oklahoma City and nearby communities", "Direct remodeling communication"].map((x) => <span key={x}><CheckCircle2 size={18} />{x}</span>)}</section><section className="section"><p className="eyebrow dark"><Hammer size={18} /> Remodeling services</p><h2>One remodeling company for almost every part of the home.</h2><ServicesGrid /></section><LeadFlowLineSection /><LeadLeakAudit /><BeforeAfterComparison /><ServiceAreaSection /></Shell>; }
function ServicesPage() { return <Shell><PageHero icon={<Hammer size={18} />} eyebrow="Remodeling services" title="Kitchen, bathroom, interior, exterior, flooring, paint, and repair remodeling in OKC." text="Brothers Remodeling OKC gives homeowners one place to start for the most common remodeling needs around the home." /><section className="section"><div className="cards">{serviceDetails.map((service) => { const Icon = service.icon; return <AppLink className="card serviceLinkCard" href={`/services/${service.slug}`} key={service.slug}><Icon size={34} /><h3>{service.title}</h3><p>{service.short}</p><span>Read the {service.title.toLowerCase()} service page <ArrowRight size={16} /></span></AppLink>; })}</div></section><LeadFlowLineSection /></Shell>; }
function ServiceDetailPage({ params }: { params: { serviceSlug: string } }) {
  const [location] = useLocation();
  const fallbackSlug = location.split("/services/")[1]?.split("/")[0];
  const service = serviceBySlug(params.serviceSlug || fallbackSlug);
  if (!service) return <NotFound />;
  const Icon = service.icon;
  const sections = serviceSeoSections(service);
  return <Shell><PageHero icon={<Icon size={18} />} eyebrow="Remodeling service" title={`${service.title} in Oklahoma City`} text={service.short} /><ServiceDetailLayout service={service} sections={sections} /></Shell>;
}
function ProcessPage() { return <Shell><PageHero icon={<Shield size={18} />} eyebrow="Process" title="A clear remodeling process before work begins." text="The goal is direct communication, realistic scope conversations, and a next step homeowners understand." /><section className="split"><div><h2>How the project path works</h2><ul>{[["Send details", "Share the room, city, photos, timeline, and what needs to change."], ["Check scope", "Brothers Remodeling OKC reviews the work type, access, materials, and schedule."], ["Confirm next step", "If the job is a good match, the team follows up with the visit, quote step, or project conversation."], ["Build with updates", "Work proceeds with clear communication in English or Spanish."]].map(([title, text]) => <li key={title}><CheckCircle2 /><span><b>{title}</b><br />{text}</span></li>)}</ul></div><LeadOpsVisual /></section><LeadLeakAudit /></Shell>; }
function AboutPage() { return <Shell><PageHero icon={<Building2 size={18} />} eyebrow="About" title="Brothers Remodeling OKC is a local remodeling contractor for real home upgrades." text="The company focuses on practical, good-looking remodel work across kitchens, bathrooms, flooring, interiors, exterior improvements, garages, repairs, and whole-home updates." /><section className="section"><h2>Built for homeowners who want direct remodeling help.</h2><p className="sectionLead">Brothers Remodeling OKC presents services, service area, process, and quote options plainly, without invented credentials or exaggerated claims.</p><div className="cards"><article className="card"><Languages /><h3>Bilingual communication</h3><p>English and Spanish project conversations are welcome.</p></article><article className="card"><Wrench /><h3>Wide service range</h3><p>Multiple rooms and repair scopes can be discussed in one place.</p></article><article className="card"><MapPin /><h3>OKC area focus</h3><p>Oklahoma City and nearby communities are the primary service area.</p></article></div></section></Shell>; }
function GalleryPage() { return <Shell><PageHero icon={<Paintbrush size={18} />} eyebrow="Gallery" title="Real Brothers Remodeling OKC project photos and remodeling categories." text="These photos were carried over from the original Brothers Remodeling OKC gallery so homeowners can reference actual project images when they request a quote." /><section className="section portfolio"><p className="eyebrow dark"><Paintbrush size={18} /> Original site gallery</p><h2>Project photos from the existing Brothers Remodeling OKC portfolio.</h2><p className="sectionLead">The gallery below preserves the real photo assets from the prior Brothers Remodeling OKC website instead of using generic placeholder cards.</p><div className="photoGalleryGrid">{portfolioPhotos.map((photo, index) => <article className="photoCard" key={photo.src}><img src={photo.src} alt={photo.alt} loading={index < 3 ? "eager" : "lazy"} /><div><h3>{photo.title}</h3><p>{photo.note}</p></div></article>)}</div></section><section className="section portfolio"><p className="eyebrow dark"><Hammer size={18} /> Remodeling categories</p><div className="portfolioGrid"><article className="portfolioCard featured"><div className="portfolioNoImage exteriorProof"><Paintbrush size={46} /><span>Exterior updates, curb appeal, repairs, doors, windows, paint, and outdoor spaces</span></div><div><h3>Exterior and curb appeal work</h3><p>Exterior updates, repair scopes, paint, fencing, doors, windows, and curb-appeal improvements for homes that need a sharper first impression.</p></div></article><article className="portfolioCard featured"><div className="portfolioNoImage interiorProof"><Hammer size={46} /><span>Interior finishes, drywall, trim, flooring, paint, kitchens, and baths</span></div><div><h3>Interior remodel finish work</h3><p>Interior improvements, finish details, and room-by-room upgrades that make the home cleaner, more useful, and easier to live in.</p></div></article><article className="portfolioCard"><div className="portfolioNoImage"><Hammer size={46} /><span>Kitchen • bath • flooring • paint • exterior • garage • repairs</span></div><div><h3>Remodeling categories</h3><p>Kitchen, bath, flooring, paint, exterior, garage, and repair scopes are organized so homeowners can start a clear quote conversation.</p></div></article></div></section><BeforeAfterComparison /></Shell>; }
function ServiceAreaSection() { return <section className="section area"><p className="eyebrow dark"><MapPin size={18} /> Service area</p><h2>Remodeling help centered on Oklahoma City.</h2><p className="sectionLead">Brothers Remodeling OKC focuses on the core Oklahoma City metro first: kitchens, bathrooms, flooring, paint, exterior repairs, garages, additions, and whole-home updates. Nearby communities are reviewed by project fit, access, timing, and work type.</p><div className="areaGrid"><div><h3>Primary OKC-area communities</h3><p>Use the city links below to describe where the home is and what kind of remodeling help you need.</p><div className="chips">{cities.map((z) => <AppLink key={z.slug} href={`/service-area/${z.slug}`}>{z.name}</AppLink>)}</div></div><div className="serviceMapVisual" role="img" aria-label="Oklahoma City centered service area visual"><b>OKC</b><span>Core metro first. Nearby communities reviewed by project type, access, schedule, and fit.</span></div></div></section>; }
function ServiceAreaPage() { return <Shell><PageHero icon={<MapPin size={18} />} eyebrow="Local remodeling service area" title="Kitchen, bathroom, interior, exterior, and repair remodeling near Oklahoma City." text="Brothers Remodeling OKC serves Oklahoma City and nearby surrounding communities with bilingual remodeling communication and a practical quote path." /><ServiceAreaSection /><section className="section"><h2>What service-area fit means.</h2><div className="cards"><article className="card"><MapPin /><h3>Location</h3><p>Start with the city or nearest OKC-area community so the team can review drive time and access.</p></article><article className="card"><Hammer /><h3>Scope</h3><p>Larger remodels, kitchens, bathrooms, flooring, exterior work, and multi-room updates are easier to plan than vague repair requests.</p></article><article className="card"><ClipboardCheck /><h3>Details</h3><p>Photos, room notes, timing, and finish expectations help Brothers Remodeling OKC respond with the right next step.</p></article><article className="card"><Languages /><h3>Communication</h3><p>English and Spanish project conversations are welcome for homeowners across the OKC area.</p></article></div></section></Shell>; }
function CityPage({ params }: { params: { citySlug: string } }) {
  const city = cityBySlug(params.citySlug);
  if (!city) return <NotFound />;
  const featured = services.slice(0, 6);
  const article = /^[AEIOU]/i.test(city.name) ? "an" : "a";
  const copy = (cityContent as Record<string, { paragraphs: string[] }>)[city.slug];
  return <Shell><PageHero icon={<MapPin size={18} />} eyebrow={`${city.name} remodeling contractor`} title={`${city.name} remodeling services for practical home upgrades.`} text={`Brothers Remodeling OKC helps homeowners in and around ${city.name} start kitchen, bathroom, flooring, interior, exterior, garage, and repair projects with clear bilingual communication.`} /><section className="section citySeo"><div><h2>Home remodeling in {city.name}</h2><p>Common requests around {city.name} include {city.note}. Nearby focus areas include {city.nearby}.</p><p>Good quote requests include the room or exterior area, photos if available, the problem you want solved, timing, and whether the project involves materials, access limitations, or multiple rooms.</p><div className="cityDetailGrid"><article><b>Best fit projects</b><span>Kitchens, baths, flooring, paint, drywall, trim, doors, exterior repairs, garages, additions, and whole-home refreshes.</span></article><article><b>Helpful first details</b><span>Address area, photos, room size, desired finish level, timeline, and whether you need English or Spanish communication.</span></article></div></div><div className="seoBox"><h3>Services for {city.name}</h3><ul>{featured.map(([item]) => <li key={item}><CheckCircle2 size={18} /> {item}</li>)}</ul></div></section><section className="section cityLongCopy"><p className="eyebrow dark"><MapPin size={18} /> City remodeling guide</p><h2>{city.name} remodeling guidance for real homeowner decisions.</h2>{copy?.paragraphs.map((paragraph, index) => <p key={`${city.slug}-copy-${index}`}>{paragraph}</p>)}</section><section className="section"><h2>How Brothers reviews {article} {city.name} remodel request.</h2><div className="flowLine">{["Confirm city and project type", "Review photos and scope", "Discuss quote or visit step", "Plan schedule and work details"].map((step, index) => <div key={step} className="flowStep"><b>{index + 1}</b><span>{step}</span></div>)}</div></section><section className="contact" id="quote"><div><h2>Request a remodeling quote in {city.name}.</h2><p>Tell Brothers Remodeling OKC what you want changed, what area the home is in, and whether you have project photos. The more specific the request, the faster the team can decide the right next step.</p><p className="contactLine"><Mail /> <a href={`mailto:${email}`}>{email}</a></p></div><LeadForm city={city.name} /></section></Shell>;
}

function SitemapPage() { return <Shell><PageHero icon={<MapPin size={18} />} eyebrow="Sitemap" title="All Brothers Remodeling OKC website pages." text="Use this page to find every main route, service page, service-area page, contact option, and sitemap file." /><section className="section sitemapPage"><div><h2>Main pages</h2><AppLink href="/">Home</AppLink><AppLink href="/services">Services</AppLink><AppLink href="/process">Process</AppLink><AppLink href="/about">About</AppLink><AppLink href="/gallery">Gallery</AppLink><AppLink href="/service-area">Service Area</AppLink><AppLink href="/contact">Contact</AppLink><AppLink href="/sitemap">HTML Sitemap</AppLink><span>XML Sitemap: /sitemap.xml</span></div><div><h2>Service pages</h2>{serviceDetails.map((service) => <AppLink key={service.slug} href={`/services/${service.slug}`}>{service.title}</AppLink>)}</div><div><h2>Service-area pages</h2>{cities.map((city) => <AppLink key={city.slug} href={`/service-area/${city.slug}`}>{city.name}</AppLink>)}</div></section></Shell>; }

function ContactPage() { return <Shell><PageHero icon={<Mail size={18} />} eyebrow="Contact Brothers Remodeling OKC" title="Tell us what you want remodeled." text="Send project details in English or Spanish. Include the room, address area, timeline, and photos if you have them." /><section className="contact"><div><h2>Request a quote conversation.</h2><p>Brothers Remodeling OKC handles kitchens, bathrooms, flooring, interior renovations, exterior remodeling, garages, repairs, commercial spaces, and whole-home updates in the Oklahoma City area.</p><p className="contactLine"><Mail /> <a data-jeriko-track="email_click" href={`mailto:${email}`}>{email}</a></p><p className="contactLine"><Phone /> Use the form or email project photos to start a real quote conversation.</p></div><LeadForm /></section></Shell>; }
function PageHero({ eyebrow, title, text, icon }: { eyebrow: string; title: string; text: string; icon: React.ReactNode }) { return <section className="pageHero"><p className="eyebrow">{icon} {eyebrow}</p><h1>{title}</h1><p>{text}</p></section>; }
function NotFound() { const [, navigate] = useLocation(); return <Shell><section className="pageHero"><h1>Page not found</h1><p>The page you requested is not available.</p><button className="cta" onClick={() => navigate("/")}>Back home</button></section></Shell>; }

export default function App() { const [language, setLanguageState] = React.useState<Language>(() => { try { return localStorage.getItem(LANGUAGE_STORAGE_KEY) === "es" ? "es" : "en"; } catch { return "en"; } }); const setLanguage = React.useCallback((next: Language) => { setLanguageState(next); try { localStorage.setItem(LANGUAGE_STORAGE_KEY, next); } catch {} }, []); return <LanguageContext.Provider value={{ language, setLanguage }}><NativeTranslationLayer key={language}><Switch><Route path="/" component={HomePage} /><Route path="/services" component={ServicesPage} /><Route path="/services/kitchen-remodeling" component={ServiceDetailPage} /><Route path="/services/bathroom-remodeling" component={ServiceDetailPage} /><Route path="/services/interior-renovations" component={ServiceDetailPage} /><Route path="/services/flooring-installation" component={ServiceDetailPage} /><Route path="/services/exterior-remodeling" component={ServiceDetailPage} /><Route path="/services/additions-garages-conversions" component={ServiceDetailPage} /><Route path="/services/outdoor-living-spaces" component={ServiceDetailPage} /><Route path="/services/repair-maintenance" component={ServiceDetailPage} /><Route path="/services/:serviceSlug" component={ServiceDetailPage} /><Route path="/process" component={ProcessPage} /><Route path="/about" component={AboutPage} /><Route path="/gallery" component={GalleryPage} /><Route path="/service-area" component={ServiceAreaPage} /><Route path="/service-area/:citySlug" component={CityPage} /><Route path="/contact" component={ContactPage} /><Route path="/sitemap" component={SitemapPage} /><Route component={NotFound} /></Switch></NativeTranslationLayer></LanguageContext.Provider>; }
