export type SeoResourceKind = "guide" | "comparison" | "checklist";

export type SeoResource = {
  kind: SeoResourceKind;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  hero: string;
  category: string;
  readTime: string;
  path: string;
  primaryServiceSlug?: string;
  sections: {
    eyebrow?: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
};

const serviceLinks = {
  kitchen: { label: "Kitchen Remodel Consulting", href: "/services/kitchen-remodel-consulting" },
  bathroom: { label: "Bathroom Remodel Consulting", href: "/services/bathroom-remodel-consulting" },
  flooring: { label: "Flooring Consulting", href: "/services/flooring-consulting" },
  vetting: { label: "Contractor Vetting", href: "/services/contractor-vetting" },
  services: { label: "All Remodel Consulting Services", href: "/services" },
  area: { label: "Service Area", href: "/serving" },
  contact: { label: "Start Your Remodel Plan", href: "/contact" },
};

export const guideResources: SeoResource[] = [
  {
    kind: "guide",
    slug: "kitchen-remodel-budget-southeast-kansas",
    path: "/guides/kitchen-remodel-budget-southeast-kansas",
    title: "Kitchen Remodel Budget Planning in Central Oklahoma | Oklahoma Remodel Consulting",
    shortTitle: "Kitchen Remodel Budget Planning",
    description: "A homeowner guide to kitchen remodel budget planning, allowances, scope, contractor bids, and realistic expectations in Central Oklahoma and nearby markets.",
    hero: "Plan the kitchen budget before cabinets, counters, and contractor bids start pulling the project in different directions.",
    category: "Cost Planning",
    readTime: "7 min read",
    primaryServiceSlug: "kitchen-remodel-consulting",
    sections: [
      {
        eyebrow: "Budget reality",
        heading: "A kitchen budget is only useful when the scope is clear.",
        paragraphs: [
          "Kitchen remodel cost planning starts with defining what kind of kitchen project is actually being considered. A cabinet refresh, layout update, surface replacement, full gut remodel, and wall-moving renovation can all be called a kitchen remodel, but they are not the same project for a contractor to price.",
          "Homeowners in Oklahoma City and communities within about 60 miles often get frustrated because early numbers do not match. That usually happens when contractors are pricing different assumptions. Oklahoma Remodel Consulting helps organize those assumptions before the homeowner treats any bid as final."
        ],
        bullets: ["Cabinet scope and layout changes", "Electrical, lighting, and appliance assumptions", "Flooring transitions, drywall repair, and finish details", "Countertop, backsplash, and allowance expectations"]
      },
      {
        eyebrow: "Allowances",
        heading: "Allowances can make a low bid look safer than it really is.",
        paragraphs: [
          "An allowance is not automatically bad. It can be useful when a homeowner has not selected a final fixture, countertop, tile, or appliance. The risk is that an allowance can make a proposal look complete while still leaving real cost uncertainty inside the project.",
          "A stronger kitchen planning process separates actual included work from allowance categories. The homeowner should understand what happens if selections exceed the allowance, whether labor is included, and which selections need to be made before the contractor can provide a reliable number."
        ]
      },
      {
        eyebrow: "Bid comparison",
        heading: "Kitchen bids should be compared by scope, not just price.",
        paragraphs: [
          "The lowest kitchen bid may be missing cabinet modifications, trim details, electrical changes, wall repair, appliance coordination, disposal, or cleanup. A higher bid may include more complete work. Without a written comparison, the homeowner may choose a number instead of choosing the contractor who best understands the project.",
          "Independent bid review helps homeowners ask better questions before paying a deposit. It does not replace contractor pricing. It gives the homeowner a clearer way to understand what each contractor is promising and what still needs to be clarified."
        ]
      }
    ],
    faqs: [
      { question: "Can you tell me exactly what my kitchen remodel will cost?", answer: "Contractors provide firm construction pricing after reviewing site conditions and scope. Oklahoma Remodel Consulting helps build realistic planning ranges and compare bids before a commitment is made." },
      { question: "Why do kitchen remodel bids vary so much?", answer: "Bids often vary because they include different assumptions about cabinets, electrical work, prep, cleanup, materials, allowances, and finish levels." }
    ],
    relatedLinks: [serviceLinks.kitchen, serviceLinks.vetting, serviceLinks.flooring, serviceLinks.contact]
  },
  {
    kind: "guide",
    slug: "bathroom-remodel-bid-review-checkpoints",
    path: "/guides/bathroom-remodel-bid-review-checkpoints",
    title: "Bathroom Remodel Bid Review Checkpoints | Oklahoma Remodel Consulting",
    shortTitle: "Bathroom Remodel Bid Review",
    description: "Learn what bathroom remodel bids should clarify before homeowners compare price, pay deposits, or choose a contractor.",
    hero: "Bathroom remodel bids need more than tile, fixtures, and a final number. They need clear assumptions about prep, waterproofing, responsibilities, and risk.",
    category: "Bid Review",
    readTime: "6 min read",
    primaryServiceSlug: "bathroom-remodel-consulting",
    sections: [
      { eyebrow: "Hidden risk", heading: "Bathroom remodels can hide expensive details behind simple wording.", paragraphs: ["A bathroom bid might say install shower, replace vanity, update plumbing, or tile floor. Those phrases sound clear until the homeowner asks what waterproofing system is included, what happens if subfloor damage is found, who supplies fixtures, and whether drywall, trim, paint, ventilation, disposal, and cleanup are included.", "Bathroom remodel consulting helps homeowners slow down before the deposit. The point is to identify missing details while the homeowner still has leverage and choices."], bullets: ["Waterproofing method", "Fixture and tile allowances", "Subfloor and hidden damage assumptions", "Ventilation, electrical, drywall, and paint scope"] },
      { eyebrow: "Contractor fit", heading: "A good bathroom contractor should explain the parts that matter.", paragraphs: ["The right contractor for a bathroom remodel is not only someone who can make finished photos look good. They should be able to explain prep work, sequence, access, daily disruption, material choices, and how surprises will be handled.", "If a proposal avoids those details, the homeowner should ask follow-up questions before comparing the price with another bid that may include more work." ] },
      { eyebrow: "Before signing", heading: "Bid review protects the homeowner before the project enters the home.", paragraphs: ["Bathrooms affect daily life. If work stalls, the inconvenience is immediate. A clearer bid review can reduce confusion around schedule, demolition boundaries, fixture delivery, change orders, cleanup, and warranty expectations.", "Oklahoma Remodel Consulting remains advisor-led. Contractors perform the construction work and contract directly with the homeowner." ] }
    ],
    faqs: [
      { question: "What should a bathroom remodel bid include?", answer: "It should clarify demolition, prep, waterproofing, fixtures, tile, ventilation, drywall, paint, cleanup, allowances, exclusions, payment schedule, and change-order handling." },
      { question: "Can you review bids I already have?", answer: "Yes. Bid review is useful before a homeowner chooses a contractor or pays a deposit." }
    ],
    relatedLinks: [serviceLinks.bathroom, serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  },
  {
    kind: "guide",
    slug: "why-remodel-bids-come-back-different",
    path: "/guides/why-remodel-bids-come-back-different",
    title: "Why Remodel Bids Come Back So Different | Oklahoma Remodel Consulting",
    shortTitle: "Why Remodel Bids Differ",
    description: "Understand why remodel contractor bids vary and how scope clarity, allowances, exclusions, and contractor fit affect the final number.",
    hero: "Different bids usually mean different assumptions, not just different prices.",
    category: "Bid Review",
    readTime: "7 min read",
    sections: [
      { eyebrow: "The real issue", heading: "The homeowner may not be comparing the same project.", paragraphs: ["When bids come back far apart, homeowners often assume one contractor is expensive and another is affordable. Sometimes that is true. More often, each contractor is pricing a different version of the project because the original request left too much open to interpretation.", "Scope development gives every contractor a clearer target. It helps the homeowner compare proposals by what they include, not only by the final number."], bullets: ["Different finish assumptions", "Different prep and repair expectations", "Different cleanup and warranty language", "Different allowance levels"] },
      { eyebrow: "Missing scope", heading: "A shorter bid may leave out work that still has to be done.", paragraphs: ["A bid can look attractive because it does not include the expensive parts. That does not mean the work disappears. It may return later as a change order, delay, dispute, or quality problem.", "Independent bid review helps identify whether a proposal is complete enough to compare or whether the homeowner needs more written clarification." ] },
      { eyebrow: "Decision framework", heading: "The best choice combines price, clarity, fit, and communication.", paragraphs: ["A strong bid should make the homeowner feel more informed, not more confused. The contractor should describe what is included, what is excluded, what is assumed, and how changes are handled.", "Oklahoma Remodel Consulting helps homeowners review those details before choosing a contractor." ] }
    ],
    faqs: [
      { question: "Should I always choose the lowest remodel bid?", answer: "No. The lowest bid may omit scope or use lighter allowances. The best choice depends on completeness, contractor fit, communication, and risk." },
      { question: "How many bids should I get?", answer: "Two or three clear bids are usually more useful than many vague bids. Scope clarity matters more than bid count." }
    ],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.area, serviceLinks.contact]
  },
  {
    kind: "guide",
    slug: "what-should-be-in-a-remodel-scope-of-work",
    path: "/guides/what-should-be-in-a-remodel-scope-of-work",
    title: "What Should Be in a Remodel Scope of Work? | Oklahoma Remodel Consulting",
    shortTitle: "Remodel Scope of Work Guide",
    description: "A practical guide to remodel scope of work basics for homeowners comparing contractor bids and planning residential projects.",
    hero: "A written scope turns a remodel idea into something contractors can price and homeowners can compare.",
    category: "Scope Planning",
    readTime: "7 min read",
    sections: [
      { eyebrow: "Scope basics", heading: "A scope should describe the work, boundaries, and assumptions.", paragraphs: ["A remodel scope of work does not need to be written in complicated language. It needs to be clear enough that contractors understand what they are pricing and homeowners understand what they are approving.", "The scope should name the project area, demolition limits, materials, finish level, responsibilities, unknowns, allowances, schedule constraints, access concerns, and cleanup expectations."], bullets: ["Project area and demolition limits", "Materials, fixtures, and finish assumptions", "Known unknowns and site verification needs", "Responsibilities, cleanup, and warranty expectations"] },
      { eyebrow: "Before bids", heading: "The scope should exist before contractors are asked for firm prices.", paragraphs: ["If the scope is vague, the bid will be vague. That creates confusion later when the homeowner discovers that the contractor did not include something the homeowner assumed was obvious.", "Scope development helps homeowners move from inspiration photos and general goals into a contractor-ready conversation." ] },
      { eyebrow: "Advisor role", heading: "A consultant helps organize the scope without becoming the contractor.", paragraphs: ["Oklahoma Remodel Consulting helps homeowners identify what should be clarified before contractor selection. Contractors still verify site conditions, provide construction pricing, manage labor, and contract directly with the homeowner.", "This boundary keeps the homeowner informed while preserving the contractor's responsibility for the actual construction work." ] }
    ],
    faqs: [
      { question: "Is a remodel scope the same as a contractor bid?", answer: "No. A scope describes the requested work and assumptions. A contractor bid prices that work after reviewing the project and site conditions." },
      { question: "Can you write the scope before I call contractors?", answer: "Yes. Scope development is one of the core advisory services." }
    ],
    relatedLinks: [serviceLinks.services, serviceLinks.vetting, serviceLinks.contact]
  },
  {
    kind: "guide",
    slug: "questions-to-ask-before-hiring-a-remodel-contractor",
    path: "/guides/questions-to-ask-before-hiring-a-remodel-contractor",
    title: "Questions to Ask Before Hiring a Remodel Contractor | Oklahoma Remodel Consulting",
    shortTitle: "Questions Before Hiring a Contractor",
    description: "Homeowner questions to ask before hiring a remodel contractor, paying a deposit, or signing construction paperwork.",
    hero: "Better contractor questions lead to clearer bids, stronger expectations, and fewer rushed decisions.",
    category: "Contractor Vetting",
    readTime: "6 min read",
    primaryServiceSlug: "contractor-vetting",
    sections: [
      { eyebrow: "Before price", heading: "Ask what is included, excluded, and assumed.", paragraphs: ["A contractor conversation should not start and end with the final price. Homeowners should ask what work is included, what is excluded, what allowances are being used, what decisions must be made before work begins, and what could change the price.", "Those questions help reveal whether the contractor is pricing a complete project or a loose idea."], bullets: ["What is not included?", "How are change orders handled?", "Who supplies materials and fixtures?", "What happens if hidden damage is found?"] },
      { eyebrow: "Fit", heading: "Ask whether the contractor is built for this type of project.", paragraphs: ["Some contractors are excellent at small detailed work. Others are better suited for larger projects. Some can communicate well with homeowners, while others may need a more defined scope to stay organized.", "Contractor vetting helps match the project type with the contractor's strengths before the homeowner commits." ] },
      { eyebrow: "Protection", heading: "The goal is clarity before money changes hands.", paragraphs: ["Questions are not about making the process adversarial. They are about making the agreement clear enough that the homeowner and contractor can start from the same expectations.", "Oklahoma Remodel Consulting helps homeowners ask those questions from a calmer, more informed position." ] }
    ],
    faqs: [
      { question: "Do you recommend specific contractors?", answer: "When a project is a fit, Oklahoma Remodel Consulting can match the homeowner with vetted local contractor options." },
      { question: "Can I use your questions if I already have a contractor?", answer: "Yes. The questions are useful before signing, paying deposits, or accepting a vague proposal." }
    ],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  },
  {
    kind: "guide",
    slug: "remodel-allowances-explained",
    path: "/guides/remodel-allowances-explained",
    title: "Remodel Allowances Explained for Homeowners | Oklahoma Remodel Consulting",
    shortTitle: "Remodel Allowances Explained",
    description: "Understand remodel allowances, why they affect bids, and how homeowners can compare contractor proposals more clearly.",
    hero: "Allowances are planning placeholders. They should not hide uncertainty from the homeowner.",
    category: "Budget Planning",
    readTime: "6 min read",
    sections: [
      { eyebrow: "Definition", heading: "An allowance is a budget placeholder for an undecided item.", paragraphs: ["Contractors often use allowances when a fixture, tile, countertop, flooring, cabinet hardware, or other selection has not been finalized. The allowance gives the bid a working number, but the final cost may change when the homeowner chooses the actual item.", "The problem is not the allowance itself. The problem is when the homeowner does not understand what the allowance covers or whether labor, delivery, tax, prep, and related work are included."], bullets: ["Fixture allowances", "Flooring allowances", "Countertop and cabinet allowances", "Tile, lighting, and hardware allowances"] },
      { eyebrow: "Comparison", heading: "Different allowances can make bids look artificially far apart.", paragraphs: ["One contractor may use a low allowance to keep the bid attractive. Another may use a more realistic allowance based on the homeowner's stated expectations. Without reviewing the allowances, the homeowner may think the first contractor is cheaper when the bid is simply less complete.", "Bid review helps separate true price differences from allowance differences." ] },
      { eyebrow: "Next step", heading: "Clarify allowances before choosing the contractor.", paragraphs: ["Homeowners should ask what happens if selections exceed the allowance, whether unused allowance money is credited back, and when selections must be finalized.", "Oklahoma Remodel Consulting helps homeowners understand those questions before signing construction paperwork." ] }
    ],
    faqs: [
      { question: "Are allowances bad?", answer: "No. Allowances can be practical, but they need to be clear and realistic." },
      { question: "Should allowances be the same across bids?", answer: "For a fair comparison, similar allowance categories should be reviewed side by side." }
    ],
    relatedLinks: [serviceLinks.kitchen, serviceLinks.bathroom, serviceLinks.flooring, serviceLinks.contact]
  }
];

export const comparisonResources: SeoResource[] = [
  {
    kind: "comparison",
    slug: "remodel-consultant-vs-general-contractor",
    path: "/compare/remodel-consultant-vs-general-contractor",
    title: "Remodel Consultant vs General Contractor | Oklahoma Remodel Consulting",
    shortTitle: "Remodel Consultant vs General Contractor",
    description: "Understand the difference between an independent remodel consultant and a general contractor before planning a residential remodel.",
    hero: "The consultant helps the homeowner prepare. The contractor prices and performs the construction work.",
    category: "Comparison",
    readTime: "6 min read",
    sections: [
      { eyebrow: "Different roles", heading: "A remodel consultant sits on the homeowner's side of the planning conversation.", paragraphs: ["A general contractor is responsible for pricing, staffing, coordinating, and delivering construction work. A remodel consultant helps the homeowner clarify the project before choosing the contractor.", "Those roles should not be blurred. Oklahoma Remodel Consulting does not become the builder of record. The homeowner's construction contract remains directly with the contractor."], bullets: ["Consultant: scope, planning, bid review, contractor fit", "Contractor: firm pricing, construction, crews, warranty, jobsite execution"] },
      { eyebrow: "When to use each", heading: "The consultant is most useful before the contractor is selected.", paragraphs: ["Homeowners often call contractors before they know what should be priced. That can create vague bids and rushed decisions. A consultant helps organize the request first.", "Once the scope is clearer, contractors can respond with better information and the homeowner can compare bids with less guesswork." ] },
      { eyebrow: "Best outcome", heading: "A prepared homeowner can have better contractor conversations.", paragraphs: ["The goal is not to replace the contractor. The goal is to help the homeowner choose a contractor with more confidence and clearer expectations.", "That structure protects both sides because the contractor receives a clearer request and the homeowner understands what is being offered." ] }
    ],
    faqs: [
      { question: "Do I still need a contractor?", answer: "Yes. Contractors perform the construction work and provide firm pricing." },
      { question: "Why hire a consultant first?", answer: "A consultant can help clarify scope, budget assumptions, bid questions, and contractor fit before money is committed." }
    ],
    relatedLinks: [serviceLinks.services, serviceLinks.vetting, serviceLinks.contact]
  },
  {
    kind: "comparison",
    slug: "contractor-vetting-vs-getting-three-bids",
    path: "/compare/contractor-vetting-vs-getting-three-bids",
    title: "Contractor Vetting vs Getting Three Bids | Oklahoma Remodel Consulting",
    shortTitle: "Contractor Vetting vs Three Bids",
    description: "Why getting three bids is not the same as contractor vetting, and how homeowners can compare remodel contractors more carefully.",
    hero: "Three bids can help, but only if the bids describe the same work and the contractors fit the project.",
    category: "Comparison",
    readTime: "6 min read",
    primaryServiceSlug: "contractor-vetting",
    sections: [
      { eyebrow: "Common advice", heading: "Getting three bids does not automatically protect the homeowner.", paragraphs: ["The advice to get three bids is common, but it can create false confidence if every contractor is pricing a different scope. The homeowner may receive three numbers and still not know which proposal is complete.", "Contractor vetting looks beyond the count of bids. It reviews fit, communication, scope understanding, availability, and whether the proposal answers the right questions."], bullets: ["Bid completeness", "Relevant project experience", "Communication and schedule expectations", "Exclusions and allowances"] },
      { eyebrow: "Better comparison", heading: "Vetting turns bid collection into decision support.", paragraphs: ["A vetted contractor process helps the homeowner focus on contractors who are more likely to fit the project type and local market. It still leaves the final decision with the homeowner.", "Oklahoma Remodel Consulting helps compare bids in plain language so the decision is not based on the lowest number alone." ] },
      { eyebrow: "Homeowner control", heading: "The homeowner stays in charge of the contractor choice.", paragraphs: ["Vetting does not mean pressure. It means the homeowner gets a clearer framework for deciding who is appropriate for the work.", "That clarity can prevent rushed deposits, weak scope, and confusion after work begins." ] }
    ],
    faqs: [
      { question: "Is three bids enough?", answer: "Three clear bids can be enough. Three vague bids may not help at all." },
      { question: "Do you choose the contractor for me?", answer: "No. Oklahoma Remodel Consulting helps you compare options, but the homeowner chooses and contracts directly with the contractor." }
    ],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.area, serviceLinks.contact]
  },
  {
    kind: "comparison",
    slug: "remodel-planning-vs-design-build",
    path: "/compare/remodel-planning-vs-design-build",
    title: "Remodel Planning vs Design-Build | Oklahoma Remodel Consulting",
    shortTitle: "Remodel Planning vs Design-Build",
    description: "Compare independent remodel planning with design-build remodeling so homeowners understand which approach fits their early-stage project decisions.",
    hero: "Independent planning helps homeowners prepare before deciding which contractor or delivery model is the right fit.",
    category: "Comparison",
    readTime: "6 min read",
    sections: [
      { eyebrow: "Planning first", heading: "Independent planning happens before the homeowner is locked into a builder.", paragraphs: ["Design-build can be a good fit for some projects, but it usually ties design, pricing, and construction to one provider. Independent remodel planning gives the homeowner a clearer scope and budget conversation before choosing that path.", "Oklahoma Remodel Consulting helps organize priorities, risks, and questions so the homeowner understands what they are asking any provider to deliver."], bullets: ["Scope development", "Budget expectations", "Bid and proposal review", "Contractor fit questions"] },
      { eyebrow: "Decision clarity", heading: "The best model depends on the homeowner's needs.", paragraphs: ["Some homeowners want one company to manage design and construction. Others want to compare contractors or keep early guidance independent. The right answer depends on project complexity, budget, timeline, and trust.", "An advisor can help the homeowner understand trade-offs before commitments are made." ] },
      { eyebrow: "Advisor boundary", heading: "Independent planning does not replace professional design or construction.", paragraphs: ["Architects, designers, engineers, and contractors each have roles when the project requires them. The consultant's job is to help the homeowner know which questions to ask and what kind of help may be needed.", "That early clarity makes later conversations more productive." ] }
    ],
    faqs: [
      { question: "Is design-build bad?", answer: "No. It can be a strong model. The key is understanding whether it fits the homeowner's goals and whether the scope is clear before committing." },
      { question: "Can planning help before design-build?", answer: "Yes. It can help homeowners clarify budget, priorities, and questions before selecting a delivery model." }
    ],
    relatedLinks: [serviceLinks.services, serviceLinks.contact]
  },
  {
    kind: "comparison",
    slug: "independent-remodel-advisor-vs-contractor-salesperson",
    path: "/compare/independent-remodel-advisor-vs-contractor-salesperson",
    title: "Independent Remodel Advisor vs Contractor Salesperson | Oklahoma Remodel Consulting",
    shortTitle: "Advisor vs Contractor Salesperson",
    description: "Learn how an independent remodel advisor differs from a contractor salesperson when homeowners are comparing project scope and bids.",
    hero: "A contractor salesperson represents the contractor's offer. An independent advisor helps the homeowner understand the decision.",
    category: "Comparison",
    readTime: "6 min read",
    sections: [
      { eyebrow: "Perspective", heading: "Both roles can be helpful, but they are not the same.", paragraphs: ["A contractor salesperson may explain the contractor's process, products, schedule, and price. That can be useful. But the salesperson is still presenting one company's offer.", "An independent remodel advisor helps the homeowner compare scope, ask questions, and understand risk before choosing a contractor."], bullets: ["Advisor: homeowner-side preparation", "Salesperson: contractor-side proposal", "Homeowner: final decision and contract"] },
      { eyebrow: "Risk review", heading: "Independent review helps slow down pressure-driven decisions.", paragraphs: ["Homeowners can feel pressured when a proposal sounds polished or when a deadline is attached to a price. An advisor can slow the process down enough to review exclusions, allowances, and assumptions.", "That does not mean the contractor is wrong. It means the homeowner deserves clarity before signing." ] },
      { eyebrow: "Better questions", heading: "The best outcome is a clearer conversation with every contractor.", paragraphs: ["When the homeowner understands what to ask, contractor conversations improve. Strong contractors usually appreciate a clear scope and informed homeowner.", "Oklahoma Remodel Consulting supports that clarity while keeping construction responsibility with the contractor." ] }
    ],
    faqs: [
      { question: "Do contractor salespeople always pressure homeowners?", answer: "No. Many are professional and helpful. The distinction is that they represent the contractor's offer, while an advisor supports the homeowner's decision process." },
      { question: "Can an advisor review a contractor's proposal?", answer: "Yes. Independent bid review is a core part of the advisory process." }
    ],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  },
  {
    kind: "comparison",
    slug: "bid-review-vs-project-management",
    path: "/compare/bid-review-vs-project-management",
    title: "Bid Review vs Project Management | Oklahoma Remodel Consulting",
    shortTitle: "Bid Review vs Project Management",
    description: "Understand the difference between independent remodel bid review and construction project management before hiring a contractor.",
    hero: "Bid review helps before the contract. Project management usually happens after construction is underway.",
    category: "Comparison",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Before vs during", heading: "Bid review happens while the homeowner can still choose.", paragraphs: ["Bid review is an early decision tool. It helps the homeowner compare what contractors are offering, what assumptions are included, and which questions should be answered before signing.", "Project management is a different role. It often involves coordinating work after a contractor is hired. Oklahoma Remodel Consulting is not the contractor and does not supervise jobsite labor."], bullets: ["Bid review: compare proposals before signing", "Project advocacy: homeowner-side support", "Contractor: jobsite execution and crew management"] },
      { eyebrow: "Avoiding confusion", heading: "The boundary protects the homeowner and the contractor relationship.", paragraphs: ["A clear advisory boundary keeps responsibility where it belongs. Contractors manage construction. The homeowner contracts directly with the contractor. The advisor helps the homeowner understand the project, bids, and questions.", "That structure avoids pretending that advisory support is the same as construction management." ] },
      { eyebrow: "Practical value", heading: "The best time to catch bid problems is before work begins.", paragraphs: ["If a bid is missing scope, the easiest time to address it is before the deposit. Once work begins, changes can become more expensive and stressful.", "Independent bid review gives homeowners a chance to clarify before the decision becomes harder to reverse." ] }
    ],
    faqs: [
      { question: "Do you manage contractors?", answer: "No. Contractors manage their own crews and construction work. Oklahoma Remodel Consulting provides homeowner-side advisory support." },
      { question: "Can bid review still help after I receive proposals?", answer: "Yes. It is especially useful before choosing a contractor or paying a deposit." }
    ],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  }
];

export const checklistResources: SeoResource[] = [
  {
    kind: "checklist",
    slug: "kitchen-remodel-planning-checklist",
    path: "/checklists/kitchen-remodel-planning-checklist",
    title: "Kitchen Remodel Planning Checklist | Oklahoma Remodel Consulting",
    shortTitle: "Kitchen Remodel Planning Checklist",
    description: "A homeowner checklist for kitchen remodel planning, contractor conversations, budget assumptions, and bid review.",
    hero: "Use this checklist before asking contractors to price a kitchen remodel.",
    category: "Checklist",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Checklist", heading: "Kitchen decisions to clarify before bids.", paragraphs: ["A kitchen remodel touches storage, daily routines, cooking, traffic flow, appliances, lighting, flooring, and finishes. The more decisions that are clarified before bids, the easier it is to compare contractors."], bullets: ["Cabinet layout and storage priorities", "Appliance locations and electrical needs", "Countertop, backsplash, and sink expectations", "Flooring transitions and wall repair", "Allowance levels and selection deadlines"] },
      { eyebrow: "Bid review", heading: "Questions to ask before choosing a kitchen contractor.", paragraphs: ["Ask what is included, what is excluded, what assumptions affect the price, and what must be verified on site. A contractor should explain how changes, delays, cleanup, and warranties are handled." ] },
      { eyebrow: "Next step", heading: "Get help turning the checklist into a contractor-ready scope.", paragraphs: ["Oklahoma Remodel Consulting helps homeowners move from checklist items into a clearer written scope and bid comparison process." ] }
    ],
    faqs: [{ question: "Is this a substitute for a contractor quote?", answer: "No. It helps prepare for contractor pricing; contractors provide firm quotes." }],
    relatedLinks: [serviceLinks.kitchen, serviceLinks.vetting, serviceLinks.contact]
  },
  {
    kind: "checklist",
    slug: "bathroom-remodel-bid-checklist",
    path: "/checklists/bathroom-remodel-bid-checklist",
    title: "Bathroom Remodel Bid Checklist | Oklahoma Remodel Consulting",
    shortTitle: "Bathroom Remodel Bid Checklist",
    description: "A bathroom remodel bid checklist for waterproofing, fixtures, tile, allowances, cleanup, and contractor comparison.",
    hero: "Use this checklist to spot vague bathroom bid language before work begins.",
    category: "Checklist",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Checklist", heading: "Bathroom bid items that deserve written clarity.", paragraphs: ["Bathrooms are small spaces with major risk. Prep, waterproofing, ventilation, plumbing, electrical, and hidden damage assumptions should be discussed before deposits are paid."], bullets: ["Demolition and disposal", "Waterproofing system and tile prep", "Fixture allowances and who supplies them", "Ventilation, electrical, drywall, and paint", "Subfloor or hidden damage procedure"] },
      { eyebrow: "Comparison", heading: "Compare the same bathroom project across bids.", paragraphs: ["One bid may include more prep and finish work than another. Review the written details before assuming the lower bid is the better value." ] },
      { eyebrow: "Help", heading: "Independent review can make the bid conversation calmer.", paragraphs: ["Oklahoma Remodel Consulting helps homeowners compare bathroom proposals from the homeowner side of the table." ] }
    ],
    faqs: [{ question: "Can I use this after I already have bids?", answer: "Yes. It is useful for reviewing existing proposals before choosing a contractor." }],
    relatedLinks: [serviceLinks.bathroom, serviceLinks.vetting, serviceLinks.contact]
  },
  {
    kind: "checklist",
    slug: "contractor-comparison-worksheet",
    path: "/checklists/contractor-comparison-worksheet",
    title: "Contractor Comparison Worksheet | Oklahoma Remodel Consulting",
    shortTitle: "Contractor Comparison Worksheet",
    description: "A contractor comparison worksheet for homeowners reviewing remodel bids, communication, scope, allowances, schedule, and fit.",
    hero: "Compare contractors by more than the final number.",
    category: "Worksheet",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Worksheet", heading: "Compare contractor fit side by side.", paragraphs: ["A contractor comparison should include scope, communication, experience, schedule, assumptions, and clarity. Price matters, but it should not be the only category."], bullets: ["Relevant project experience", "Completeness of proposal", "Allowance detail", "Schedule and start expectations", "Communication and follow-through", "Warranty and cleanup language"] },
      { eyebrow: "Decision", heading: "A strong contractor match should reduce confusion.", paragraphs: ["The right contractor should help the homeowner understand what will happen, what could change, and what decisions need to be made before work starts." ] },
      { eyebrow: "Advisor support", heading: "Use the worksheet with independent bid review.", paragraphs: ["Oklahoma Remodel Consulting can help homeowners review contractor options with plain-language comparison before signing." ] }
    ],
    faqs: [{ question: "Do you choose the contractor?", answer: "No. The homeowner chooses. We help compare options and clarify questions." }],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  },
  {
    kind: "checklist",
    slug: "remodel-scope-template",
    path: "/checklists/remodel-scope-template",
    title: "Remodel Scope Template for Homeowners | Oklahoma Remodel Consulting",
    shortTitle: "Remodel Scope Template",
    description: "A remodel scope template to help homeowners organize project areas, assumptions, materials, responsibilities, and contractor questions.",
    hero: "A simple scope template can make contractor conversations more useful.",
    category: "Template",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Template", heading: "Start with project area, goal, and boundaries.", paragraphs: ["A remodel scope template should name the rooms or exterior areas involved, what the homeowner wants to change, and what should not be included. Boundaries prevent assumptions from becoming disputes later."], bullets: ["Project area", "Desired outcome", "Demolition limits", "Materials and selections", "Unknowns to verify", "Exclusions and responsibilities"] },
      { eyebrow: "Contractor-ready", heading: "The template should become a contractor conversation, not a guess list.", paragraphs: ["A written template gives contractors a better starting point, but contractors still need to verify site conditions and provide construction pricing." ] },
      { eyebrow: "Consulting", heading: "Scope development turns the template into a clearer plan.", paragraphs: ["Oklahoma Remodel Consulting helps homeowners organize the template into scope language contractors can respond to." ] }
    ],
    faqs: [{ question: "Is a scope template legally binding?", answer: "No. It is a planning tool. Contracts and legal obligations belong in contractor agreements reviewed by appropriate professionals." }],
    relatedLinks: [serviceLinks.services, serviceLinks.vetting, serviceLinks.contact]
  },
  {
    kind: "checklist",
    slug: "questions-before-paying-contractor-deposit",
    path: "/checklists/questions-before-paying-contractor-deposit",
    title: "Questions Before Paying a Contractor Deposit | Oklahoma Remodel Consulting",
    shortTitle: "Questions Before Paying a Deposit",
    description: "Questions homeowners should ask before paying a contractor deposit for a remodel project.",
    hero: "Before a deposit is paid, the homeowner should understand scope, schedule, payment expectations, and what could change.",
    category: "Checklist",
    readTime: "5 min read",
    sections: [
      { eyebrow: "Deposit readiness", heading: "A deposit should follow clarity, not create it.", paragraphs: ["A contractor deposit may be normal, but it should not be paid while major questions remain unanswered. The homeowner should know what work is included, how changes are handled, when work is expected to start, and what happens if materials or hidden conditions affect the project."], bullets: ["What is included and excluded?", "What is the payment schedule?", "What are the change-order rules?", "What selections are still needed?", "What happens if the schedule changes?"] },
      { eyebrow: "Review", heading: "Bid review before a deposit can prevent stress later.", paragraphs: ["Once money changes hands, the homeowner has fewer easy options. Independent review helps identify unclear language before the decision becomes harder to unwind." ] },
      { eyebrow: "Boundary", heading: "The contractor contract stays between homeowner and contractor.", paragraphs: ["Oklahoma Remodel Consulting does not provide legal advice or become the contractor. The advisory role is to help the homeowner understand the practical project questions before committing." ] }
    ],
    faqs: [{ question: "Do you tell me whether to sign?", answer: "We help you understand scope and bid questions. Legal contract decisions should be reviewed with the appropriate professional." }],
    relatedLinks: [serviceLinks.vetting, serviceLinks.services, serviceLinks.contact]
  }
];

export const seoResources = [...guideResources, ...comparisonResources, ...checklistResources];

export function getSeoResource(kind: SeoResourceKind, slug: string | undefined) {
  return seoResources.find((resource) => resource.kind === kind && resource.slug === slug);
}

export function resourcesByKind(kind: SeoResourceKind) {
  return seoResources.filter((resource) => resource.kind === kind);
}

export function resourceKindLabel(kind: SeoResourceKind) {
  if (kind === "guide") return "Remodel Planning Guides";
  if (kind === "comparison") return "Remodel Comparison Guides";
  return "Remodel Checklists";
}

export function resourceIndexPath(kind: SeoResourceKind) {
  if (kind === "guide") return "/guides";
  if (kind === "comparison") return "/compare";
  return "/checklists";
}
