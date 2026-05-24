export type ServiceFaq = { question: string; answer: string };

export type LocalSeoService = {
  slug: string;
  name: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  iconName: string;
  serviceType: string;
  faqs: ServiceFaq[];
  content: {
    overview: string[];
    reviewItems: string[];
    riskPoints: string[];
    processSteps: string[];
    whenToCall: string[];
    advisoryNote: string;
  };
};

export const existingDefaultOgImagePath = "/og-image.svg";

export const services: LocalSeoService[] = [
  {
    slug: "kitchen-remodel-consulting",
    name: "Kitchen Remodel Consulting",
    shortDescription:
      "Independent kitchen remodel planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Kitchen Remodel Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Kitchen Remodel Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "ChefHat",
    serviceType: "Kitchen Remodel Consulting",
    faqs: [
      {
        question: "Do you build the kitchen remodel work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my kitchen remodel will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Kitchen Remodel Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Kitchen decisions affect daily routines, storage, appliance placement, traffic flow, and the way families gather.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Cabinet layout and storage priorities",
        "Countertop, backsplash, lighting, and appliance assumptions",
        "Demolition boundaries, flooring transitions, and finish levels",
        "Bid details that separate allowances from included work",
      ],
      riskPoints: [
        "Cabinet plans priced from different assumptions",
        "Electrical or lighting needs left out of bids",
        "Appliance dimensions changing layout after pricing",
        "Finish allowances too vague to compare",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "bathroom-remodel-consulting",
    name: "Bathroom Remodel Consulting",
    shortDescription:
      "Independent bathroom remodel planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Bathroom Remodel Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Bathroom Remodel Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "Bath",
    serviceType: "Bathroom Remodel Consulting",
    faqs: [
      {
        question: "Do you build the bathroom remodel work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my bathroom remodel will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Bathroom Remodel Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Bathroom work hides costly decisions in waterproofing, ventilation, tile, fixtures, and accessibility.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Shower or tub scope, waterproofing approach, and tile details",
        "Vanity, fixture, fan, flooring, and lighting assumptions",
        "Accessibility goals and practical layout constraints",
        "Bid language around demo, prep, cleanup, and allowances",
      ],
      riskPoints: [
        "Waterproofing details not stated in writing",
        "Ventilation or fixture changes missed in scope",
        "Tile patterns and niches priced inconsistently",
        "Small rooms treated as simple when sequencing is complex",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "basement-finishing-consulting",
    name: "Basement Finishing Consulting",
    shortDescription:
      "Independent basement finishing planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Basement Finishing Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Basement Finishing Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "Layers",
    serviceType: "Basement Finishing Consulting",
    faqs: [
      {
        question: "Do you build the basement finishing work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my basement finishing will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Basement Finishing Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Basements need discipline because moisture, ceiling height, utilities, egress, and future use can change the true scope.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Moisture, egress, ceiling height, and utility constraints",
        "Room layout, bedrooms, bathrooms, lighting, and storage",
        "Flooring choices and phased finish decisions",
        "Contractor assumptions for framing, insulation, and mechanical access",
      ],
      riskPoints: [
        "Finishing before moisture concerns are understood",
        "Egress and ceiling constraints discovered late",
        "Utility access boxed in without a plan",
        "Bids comparing different levels of finish",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "full-home-remodel-consulting",
    name: "Full Home Remodel Consulting",
    shortDescription:
      "Independent full home remodel planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Full Home Remodel Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Full Home Remodel Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "Home",
    serviceType: "Full Home Remodel Consulting",
    faqs: [
      {
        question: "Do you build the full home remodel work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my full home remodel will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Full Home Remodel Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Whole-home projects connect every decision to another room, schedule phase, budget line, and family disruption.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Phasing, temporary living needs, and room-by-room priorities",
        "Structural unknowns, utility coordination, and finish consistency",
        "Budget ranges by phase and decision points that affect cost",
        "Contractor fit for multi-trade sequencing",
      ],
      riskPoints: [
        "Starting too many rooms without a sequence",
        "Bids missing temporary protection or cleanup standards",
        "Finish selections drifting from room to room",
        "Family logistics underestimated before work begins",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "deck-and-fence-consulting",
    name: "Deck and Fence Consulting",
    shortDescription:
      "Independent deck and fence planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Deck and Fence Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Deck and Fence Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "Fence",
    serviceType: "Deck and Fence Consulting",
    faqs: [
      {
        question: "Do you build the deck and fence work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my deck and fence will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Deck and Fence Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Outdoor projects need clear expectations around weather exposure, grading, posts, railings, gates, and material durability.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Deck size, railings, stairs, gates, posts, and access",
        "Material durability, maintenance, and drainage concerns",
        "Property edges, grading, and practical site constraints",
        "Bid assumptions for removal, cleanup, and hardware",
      ],
      riskPoints: [
        "Post depth or footing expectations left vague",
        "Drainage and grade ignored until installation",
        "Gate, railing, and stair details priced differently",
        "Materials selected without maintenance expectations",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "siding-and-roofing-consulting",
    name: "Siding and Roofing Consulting",
    shortDescription:
      "Independent siding and roofing planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Siding and Roofing Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Siding and Roofing Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "HousePlus",
    serviceType: "Siding and Roofing Consulting",
    faqs: [
      {
        question: "Do you build the siding and roofing work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my siding and roofing will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Siding and Roofing Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Exterior work protects the home, so flashing, ventilation, trim, underlayment, tear-off assumptions, and warranties need clarity.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Roof and siding scope, trim details, flashing, and ventilation",
        "Material options, warranty language, and weather exposure",
        "Tear-off, disposal, sheathing, and repair assumptions",
        "How bids describe labor, cleanup, and warranty responsibility",
      ],
      riskPoints: [
        "Hidden decking or wall repairs not addressed",
        "Ventilation and flashing details skipped in bids",
        "Warranty language misunderstood before signing",
        "Storm exposure driving rushed contractor choices",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "addition-and-framing-consulting",
    name: "Addition and Framing Consulting",
    shortDescription:
      "Independent addition and framing planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Addition and Framing Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Addition and Framing Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "Hammer",
    serviceType: "Addition and Framing Consulting",
    faqs: [
      {
        question: "Do you build the addition and framing work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my addition and framing will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Addition and Framing Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Additions and framing require early planning because new space must tie into structure, rooflines, utilities, and local requirements.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Space goals, foundation questions, framing scope, and tie-ins",
        "Roofline, access, utility, and code-related questions to ask",
        "Budget risks created by unknown structure or site conditions",
        "Contractor readiness for larger phased work",
      ],
      riskPoints: [
        "Concept drawings priced before scope is buildable",
        "Tie-ins to the existing home underestimated",
        "Permit and inspection responsibility unclear",
        "Allowances hiding major structural uncertainty",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "drywall-and-painting-consulting",
    name: "Drywall and Painting Consulting",
    shortDescription:
      "Independent drywall and painting planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Drywall and Painting Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Drywall and Painting Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "PaintRoller",
    serviceType: "Drywall and Painting Consulting",
    faqs: [
      {
        question: "Do you build the drywall and painting work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my drywall and painting will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Drywall and Painting Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Drywall and paint are judged by finish quality, so prep, texture, sheen, touch-ups, and cleanup must be clear.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Surface preparation, patching, texture, primer, and paint systems",
        "Room sequencing, trim coordination, and protection standards",
        "Finish expectations for walls, ceilings, and touch-ups",
        "Bid assumptions for cleanup and punch-list work",
      ],
      riskPoints: [
        "Texture matching promised without inspection",
        "Prep levels not aligned with homeowner expectations",
        "Sheen and paint system choices left vague",
        "Cleanup and touch-up standards missing from bids",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "flooring-consulting",
    name: "Flooring Consulting",
    shortDescription:
      "Independent flooring planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Flooring Consulting | Oklahoma Remodel Consulting",
    metaDescription:
      "Flooring Consulting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "SquareStack",
    serviceType: "Flooring Consulting",
    faqs: [
      {
        question: "Do you build the flooring work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my flooring will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Flooring Consulting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Flooring affects every connected room, and small details like subfloors, transitions, moisture, and trim can change outcomes.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Product selection, subfloor condition, moisture, and transitions",
        "Baseboards, door clearances, room sequencing, and stairs",
        "Durability and maintenance expectations by household use",
        "Installation scope and bid comparison details",
      ],
      riskPoints: [
        "Subfloor repairs discovered after install starts",
        "Transitions and trim excluded from one bid",
        "Moisture concerns ignored for the product chosen",
        "Room sequencing disrupting the home longer than expected",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
  {
    slug: "contractor-vetting",
    name: "Contractor Vetting",
    shortDescription:
      "Independent contractor vetting planning, budget guidance, scope development, bid review, and vetted contractor matching for homeowners who want clarity before committing to construction.",
    metaTitle: "Contractor Vetting | Oklahoma Remodel Consulting",
    metaDescription:
      "Contractor Vetting for homeowners in Oklahoma City and communities within about 60 miles who want clear scope, realistic budget expectations, bid review, and vetted contractor options before signing.",
    iconName: "ShieldCheck",
    serviceType: "Contractor Vetting",
    faqs: [
      {
        question: "Do you build the contractor vetting work?",
        answer:
          "No. Oklahoma Remodel Consulting advises, plans, and helps you compare contractor options. Your construction contract is directly with the contractor you choose.",
      },
      {
        question: "Can you tell me what my contractor vetting will cost?",
        answer:
          "We provide realistic budget ranges and help define scope before bids. Firm prices come from contractors after they review the written scope and site conditions.",
      },
      {
        question: "What happens after the consultation?",
        answer:
          "If the project is a fit, we prepare the scope, introduce vetted contractors, review bids with you, and stay available as your independent advocate through completion.",
      },
    ],
    content: {
      overview: [
        "Contractor Vetting helps homeowners turn a remodel idea into a contractor-ready plan before money is committed.",
        "Contractor selection is risky when scope is vague, bids are not comparable, or communication expectations are unclear.",
        "Oklahoma Remodel Consulting stays in the advisory role, so you can ask sharper questions and compare contractor options with a clearer scope.",
      ],
      reviewItems: [
        "Scope clarity before contractors are compared",
        "Bid format, payment structure, references, and schedule risk",
        "Communication style, project fit, and homeowner boundaries",
        "Questions that reveal whether the contractor understands the work",
      ],
      riskPoints: [
        "Choosing on price without matching scope",
        "Payment terms that move too much risk to the homeowner",
        "References that do not match the project type",
        "Vague bids that cannot be enforced later",
      ],
      processSteps: [
        "Intake and callback to understand goals, property conditions, budget concerns, and timing.",
        "Home visit or project review to identify scope boundaries, unknowns, and decisions that affect price.",
        "Written scope development and contractor matching when the project is a fit.",
        "Bid review with plain-language comparison so you understand differences before choosing a contractor.",
      ],
      whenToCall: [
        "You have a project idea but do not know what to ask contractors.",
        "You already have bids and cannot tell whether they include the same work.",
        "You want realistic planning guidance before paying a deposit.",
        "You need an independent advisor on the homeowner side of the conversation.",
      ],
      advisoryNote:
        "Oklahoma Remodel Consulting is not the builder of record. Contractors perform construction, provide firm pricing, manage crews, and contract directly with the homeowner.",
    },
    ogImage: "/og-image.svg",
  },
];

export const serviceBySlug = new Map(
  services.map(service => [service.slug, service])
);

export function getServiceBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return serviceBySlug.get(slug);
}
