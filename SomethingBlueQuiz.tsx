/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

// ─── Brand ────────────────────────────────────────────────────────────────────
const B = {
  navy: "#172936",
  blue: "#1470AF",
  lightBlue: "#EAF1F6",
  white: "#FFFFFF",
  lightText: "#4A6A7A",
  border: "rgba(20,112,175,0.22)",
  gold: "#B8976A",
  cream: "#FAF8F5",
};
const OVO = "Ovo, 'Times New Roman', serif";
const PETRO = "Petrona, Georgia, serif";
const LOGO =
  "https://images.squarespace-cdn.com/content/691ab065f932843db6b82963/c59e1d21-6aee-477b-9f01-ba8bcaaa7736/Something+Blue+Header+Logo+Dark.png?content-type=image%2Fpng";
const iBase: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "8px",
  border: `1.5px solid ${B.border}`,
  fontSize: "15px",
  fontFamily: PETRO,
  color: B.navy,
  background: B.white,
  outline: "none",
  boxSizing: "border-box" as const,
};

// ─── Occasions ────────────────────────────────────────────────────────────────
const OCCASIONS = [
  {
    id: "wedding",
    label: "Destination Wedding",
    tagline: "I do, somewhere unforgettable",
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    tagline: "Your first chapter together",
  },
  {
    id: "babymoon",
    label: "Babymoon",
    tagline: "One last great escape, just the two of you",
  },
  {
    id: "anniversary",
    label: "Anniversary Escape",
    tagline: "Celebrate how far you've come",
  },
  {
    id: "bachelorette",
    label: "Bachelorette Party",
    tagline: "She said yes — now let's celebrate",
  },
  {
    id: "bachelor",
    label: "Bachelor Party",
    tagline: "His last great adventure",
  },
  {
    id: "proposal",
    label: "Surprise Proposal",
    tagline: "The moment everything changes",
  },
  {
    id: "justbecause",
    label: "Just Because",
    tagline: "No occasion needed — just a great trip",
  },
  {
    id: "solo",
    label: "Solo Travel",
    tagline: "Your journey, entirely on your terms",
  },
];

// ─── Photo styles ─────────────────────────────────────────────────────────────
const PHOTO_STYLES = [
  {
    label: "Candid & documentary",
    img: "📸",
    desc: "Natural, unposed, emotional",
  },
  { label: "Fine art / editorial", img: "🎨", desc: "Cinematic, high-fashion" },
  { label: "Dark & moody", img: "🌑", desc: "Rich tones, dramatic contrast" },
  { label: "Bright & airy", img: "☀️", desc: "Light, dreamy, ethereal" },
  { label: "Film / vintage", img: "🎞️", desc: "Grainy, nostalgic, timeless" },
  { label: "Golden hour", img: "🌅", desc: "Warm, glowing, sun-drenched" },
  { label: "Black & white", img: "◑", desc: "Timeless, classic, emotional" },
  { label: "Drone / aerial", img: "🚁", desc: "Epic landscape coverage" },
  { label: "Photojournalist", img: "📰", desc: "Story-driven, real moments" },
];

// ══════════════════════════════════════════════════════════════════════════════
// CONTEXTUAL OPTION MAPS
// Keys match the exact label strings used in style-picker steps.
// ══════════════════════════════════════════════════════════════════════════════

const DINING_BY_VIBE: Record<string, string[]> = {
  "Beach & sun": [
    "Private beach dinner",
    "Sunset cocktail cruise",
    "Seafood chef's table",
    "Breakfast in bed",
    "Beachside tasting menu",
  ],
  "Adventure & exploration": [
    "Private chef dinner at basecamp",
    "Local market dining tour",
    "Farm-to-table experience",
    "Rooftop dinner with panoramic views",
    "Wine pairing dinner",
  ],
  "Culture & cuisine": [
    "Michelin-starred reservation",
    "Chef's tasting menu",
    "Hands-on local cooking class",
    "Historic wine cellar dinner",
    "Curated food & wine district tour",
  ],
  "Spa & wellness": [
    "In-room private dining",
    "Nutritionist-curated menu experience",
    "Ayurvedic meal journey",
    "Breakfast in bed",
    "Herbal tea ceremony at sunset",
  ],
  Safari: [
    "Bush dinner under the stars",
    "Private camp chef's table",
    "Sundowner cocktails in the wild",
    "Breakfast at the waterhole",
  ],
  "City chic": [
    "Michelin-starred reservation",
    "Rooftop bar & dining experience",
    "Private chef dinner",
    "Exclusive chef's tasting menu",
    "Sommelier-led wine dinner",
  ],
  "Island hopping": [
    "Sunset sailing dinner",
    "Private beach picnic",
    "Authentic local island feast",
    "Overwater dining experience",
    "Fresh-catch tasting with local fishermen",
  ],
  Cruise: [
    "Captain's table dinner",
    "Private chef's table onboard",
    "Champagne sunset deck dinner",
    "Private shore excursion dining",
  ],
  "Slow & deeply indulgent": [
    "Private chef dinner in-villa",
    "Wine & cheese evening",
    "Sunset champagne toast",
    "Long lunch at a renowned restaurant",
    "In-room breakfast daily",
  ],
  "Return to honeymoon dest.": [
    "Recreate a special dinner",
    "Private chef at the original property",
    "Sunset cocktails at your first spot",
    "Michelin reservation",
  ],
  "City escape": [
    "Michelin-starred reservation",
    "Rooftop champagne bar",
    "Private chef dinner",
    "Exclusive tasting menu",
    "Sommelier-led wine experience",
  ],
  "Beach & sea": [
    "Private beach dinner",
    "Sunset sailing cocktails",
    "Seafood chef's table",
    "Champagne breakfast on the sand",
    "Overwater dining",
  ],
  "Food & wine": [
    "Private cooking class with a local chef",
    "Winery estate dinner",
    "Truffle hunting & tasting",
    "Michelin-starred reservation",
    "Market tour & private lunch",
  ],
  "Spiritual or wellness": [
    "Cleansing retreat meals",
    "Ayurvedic or plant-based dining",
    "Sunrise breakfast in nature",
    "Mindful dining experience",
    "Herbal infusion ceremony",
  ],
  "Pure relaxation": [
    "In-villa private dining",
    "Champagne & canapes at sunset",
    "Leisurely long lunches",
    "Breakfast in bed daily",
    "Private picnic setup",
  ],
  "Cultural immersion": [
    "Authentic local dining experience",
    "Cooking class with a local family",
    "Street food tour with a guide",
    "Traditional feast or banquet",
    "Wine or spirits tasting tied to the region",
  ],
};

const ACCOMMODATION_BY_VIBE: Record<string, string[]> = {
  "Beach & sun": [
    "Beachfront villa",
    "Overwater bungalow",
    "Adults-only beach resort",
    "Private beach house",
    "Luxury beach resort",
  ],
  "Adventure & exploration": [
    "Mountain or clifftop lodge",
    "Eco-luxury retreat",
    "Remote wilderness lodge",
    "Boutique expedition camp",
    "Adventure-ready resort",
  ],
  "Culture & cuisine": [
    "Boutique historic hotel",
    "City landmark property",
    "Heritage villa or palazzo",
    "Wine estate accommodation",
    "Design hotel in cultural quarter",
  ],
  "Spa & wellness": [
    "Dedicated wellness resort",
    "Spa retreat property",
    "Adults-only spa hotel",
    "Thermal or mineral spring retreat",
    "Private wellness villa",
  ],
  Safari: [
    "Luxury tented safari camp",
    "Private game lodge",
    "Treehouse or elevated suite",
    "Conservation estate lodge",
    "Exclusive-use bush retreat",
  ],
  "City chic": [
    "Design hotel in the city centre",
    "Boutique urban hotel",
    "Landmark luxury hotel",
    "Rooftop-view suite",
    "Penthouse accommodation",
  ],
  "Island hopping": [
    "Boutique island resort",
    "Private island villa",
    "Traditional overwater suite",
    "Yacht or sailing charter",
    "Local-style luxury guesthouse",
  ],
  Cruise: [
    "Ocean-view stateroom",
    "Ship suite or penthouse",
    "Luxury river cruise cabin",
    "Private yacht charter",
    "Expedition ship suite",
  ],
  "Slow & deeply indulgent": [
    "Private villa",
    "Boutique luxury hotel",
    "Country estate",
    "Luxury agriturismo",
    "Secluded adults-only retreat",
  ],
  "City escape": [
    "Design hotel",
    "Boutique city hotel",
    "Landmark luxury hotel",
    "Serviced luxury apartment",
    "Penthouse suite",
  ],
  "Beach & sea": [
    "Beachfront villa",
    "Adults-only beach resort",
    "Overwater suite",
    "Boutique coastal hotel",
    "Private beach house",
  ],
  "Pure relaxation": [
    "Private villa",
    "Boutique luxury resort",
    "Adults-only retreat",
    "Remote hideaway",
    "Luxury all-inclusive",
  ],
  "Cultural immersion": [
    "Boutique heritage hotel",
    "Riad or traditional property",
    "Wine estate stay",
    "City neighbourhood apartment",
    "Converted historic building",
  ],
  "Spiritual or wellness": [
    "Dedicated wellness resort",
    "Retreat centre",
    "Thermal spa hotel",
    "Private mountain sanctuary",
    "Eco-wellness lodge",
  ],
  "Food & wine": [
    "Wine estate accommodation",
    "Boutique food-focused hotel",
    "Luxury agriturismo",
    "Country house hotel",
    "Culinary destination resort",
  ],
};

const ACTIVITIES_BY_VIBE: Record<string, string[]> = {
  "Beach & sun": [
    "Private snorkel or dive charter",
    "Couples watersport session",
    "Sunset sailing",
    "Beachside yoga at sunrise",
    "Marine wildlife or dolphin tour",
  ],
  "Adventure & exploration": [
    "Private guided hike or trek",
    "Helicopter or seaplane excursion",
    "Off-road 4x4 adventure",
    "Kayak expedition",
    "Via ferrata or zip-line experience",
  ],
  "Culture & cuisine": [
    "Private museum or gallery tour",
    "Artisan workshop with a local maker",
    "Truffle or wine country immersion",
    "Historical walking tour with expert guide",
    "Cooking class or culinary school session",
  ],
  "Spa & wellness": [
    "Couples spa ritual",
    "Sound healing or gong bath",
    "Private yoga retreat",
    "Hydrotherapy journey",
    "Meditation & breathwork session",
  ],
  Safari: [
    "Private game drive at dawn",
    "Walking safari with a senior guide",
    "Sundowner in the bush",
    "Hot air balloon safari",
    "Conservation or anti-poaching experience",
  ],
  "City chic": [
    "Private city tour by luxury car",
    "Rooftop cocktail experience",
    "Private art gallery viewing",
    "Bespoke personal shopping tour",
    "Jazz club, theatre or opera evening",
  ],
  "Island hopping": [
    "Private yacht charter between islands",
    "Snorkel & swim stop at secluded coves",
    "Sea kayaking",
    "Authentic local island village visit",
    "Paddleboard at sunrise",
  ],
  Cruise: [
    "Private shore excursion at each port",
    "Water taxi to hidden coves",
    "Private cultural tour with local expert",
    "Submarine or glass-bottom boat",
    "Onboard spa sea day",
  ],
  "Slow & deeply indulgent": [
    "Couples spa day",
    "Scenic private drive",
    "Guided winery visit",
    "Gentle sunset walk",
    "Private boat or gondola experience",
  ],
  "Return to honeymoon dest.": [
    "Revisit meaningful locations",
    "Couples spa at the original property",
    "Private sunset cruise",
    "Recreation of a first-trip experience",
  ],
  "City escape": [
    "Private city tour",
    "Rooftop cocktail hour",
    "Art gallery or museum visit",
    "Bespoke shopping",
    "Theatre or jazz evening",
  ],
  "Beach & sea": [
    "Private snorkel charter",
    "Sunset sailing",
    "Couples watersport lesson",
    "Marine wildlife tour",
    "Beachside yoga",
  ],
  "Food & wine": [
    "Private winery or vineyard tour",
    "Truffle hunting & tasting",
    "Hands-on cooking class",
    "Market tour with a local chef",
    "Cellar or distillery access tour",
  ],
  "Pure relaxation": [
    "Full-day spa ritual",
    "Private pool day",
    "Scenic coastal or countryside drive",
    "Sunset boat cruise",
    "Gentle nature walk",
  ],
  "Cultural immersion": [
    "Private guided historical tour",
    "Local artisan workshop",
    "Traditional ceremony or performance",
    "Photography walk through local quarters",
    "Curated market visit",
  ],
  "Spiritual or wellness": [
    "Private yoga or meditation",
    "Sound healing",
    "Nature immersion walk",
    "Breathwork session",
    "Digital detox day",
  ],
};

const ACTIVITIES_BY_BACHELOR: Record<string, string[]> = {
  "Golf getaway": [
    "Private tee times at a premier course",
    "Golf pro lesson or coaching clinic",
    "19th hole whisky or bourbon tasting",
    "Caddy-guided links experience",
    "Golf resort spa recovery day",
  ],
  "Nightlife & clubs": [
    "VIP table reservations",
    "Private car transfers between venues",
    "Exclusive nightclub or rooftop bar access",
    "Private bar or speakeasy buy-out",
    "Cocktail masterclass",
  ],
  "Sports & action": [
    "Live sporting event with premium hospitality seats",
    "Behind-the-scenes stadium or arena tour",
    "Private sports bar hire",
    "Go-kart or motorsport experience",
  ],
  "Beach & relaxation": [
    "Private cabana & beach butler service",
    "Sunset sailing charter",
    "Deep-sea fishing charter",
    "Beachside private chef dinner",
    "Jet ski or watersport session",
  ],
  "Adventure & outdoors": [
    "White-water rafting",
    "Skydiving or paragliding",
    "Off-road 4x4 expedition",
    "Private mountain guide & summit hike",
    "Zip-line or rappelling experience",
  ],
  "Food & whisky / craft beer": [
    "Distillery or brewery private tour & tasting",
    "Guided whisky or bourbon flight",
    "Chef's table dinner",
    "Private bar access",
    "Masterclass with a master distiller",
  ],
  "Casino & entertainment": [
    "Private casino arrangement",
    "VIP casino floor access",
    "Exclusive comedy or magic show",
    "Private poker table with dealer",
    "Luxury box at a show or concert",
  ],
  "Low-key & chill": [
    "Private villa with in-house chef",
    "Golf & spa day",
    "Sunset boat cruise",
    "Private film screening",
    "Cigar & whisky evening",
  ],
  "International adventure": [
    "Private guided city tour",
    "Cultural immersion experience",
    "Local chef's table dinner",
    "Adventure day excursion",
    "Foodie neighbourhood walk",
  ],
};

const ACTIVITIES_BY_BACHELORETTE: Record<string, string[]> = {
  "Glam & nightlife": [
    "VIP table or booth reservation",
    "Limousine or private car transfer",
    "Exclusive rooftop bar access",
    "Nightclub experience with concierge service",
    "Cocktail masterclass",
  ],
  "Beach & sun": [
    "Private beach cabana with butler service",
    "Sunset yacht or sailing charter",
    "Paddleboard or watersport session",
    "Private beach yoga",
    "Snorkel excursion",
  ],
  "Wine & fine dining": [
    "Private winery or vineyard tour",
    "Sommelier-led tasting experience",
    "Chef's table dinner",
    "Private cooking class with a local chef",
    "Wine blending experience",
  ],
  "Adventure & outdoors": [
    "Private hiking or nature guide",
    "Zip-line or aerial experience",
    "Kayak or paddleboard excursion",
    "Hot air balloon ride",
    "Sunrise hike",
  ],
  "Spa & wellness": [
    "Group spa day with private treatment room",
    "Sound bath or meditation session",
    "Private yoga or pilates session",
    "Beauty & facial treatments",
    "Wellness brunch",
  ],
  "Cultural & chic": [
    "Private museum or gallery visit",
    "Art class or creative workshop",
    "Curated personal shopping experience",
    "Architectural or heritage private tour",
    "Floral design class",
  ],
  "Wild & spontaneous": [
    "Curated surprise itinerary by Something Blue Travel",
    "Multi-venue evening experience",
    "Adrenaline adventure activity",
    "Mystery excursion",
  ],
  "Low-key & intimate": [
    "Private villa with in-house chef",
    "Curated wine & cheese evening",
    "Sunset boat cruise",
    "Rooftop dinner",
    "Private film or screening night",
  ],
};

const ACCOMMODATION_BY_BACHELOR: Record<string, string[]> = {
  "Golf getaway": [
    "Golf resort with course access",
    "Boutique country house hotel",
    "Private cottage or lodge",
  ],
  "Nightlife & clubs": [
    "Luxury city hotel in the entertainment district",
    "Penthouse or suite in central location",
    "Design hotel with rooftop bar",
  ],
  "Sports & action": [
    "Hotel near the stadium or arena",
    "Sports resort or lodge",
    "City centre luxury hotel",
  ],
  "Beach & relaxation": [
    "Private beachfront villa",
    "Adults-only beach resort",
    "Luxury all-inclusive resort",
    "Private beach house",
  ],
  "Adventure & outdoors": [
    "Mountain lodge",
    "Eco-luxury wilderness retreat",
    "Adventure-focused resort",
    "Remote private cabin",
  ],
  "Food & whisky / craft beer": [
    "Boutique hotel near dining district",
    "Wine estate or distillery accommodation",
    "Country house hotel",
  ],
  "Casino & entertainment": [
    "Casino hotel suite",
    "Luxury hotel in entertainment district",
    "Penthouse",
  ],
  "Low-key & chill": [
    "Private villa with pool",
    "Boutique luxury hotel",
    "Country house retreat",
  ],
  "International adventure": [
    "Boutique city hotel",
    "Design hotel",
    "Heritage property",
    "Local luxury guesthouse",
  ],
};

const ACCOMMODATION_BY_BACHELORETTE: Record<string, string[]> = {
  "Glam & nightlife": [
    "Luxury hotel in the entertainment district",
    "Penthouse or rooftop suite",
    "Design hotel with bar access",
  ],
  "Beach & sun": [
    "Private beachfront villa",
    "Adults-only beach resort",
    "Luxury all-inclusive",
  ],
  "Wine & fine dining": [
    "Wine estate accommodation",
    "Boutique hotel near dining district",
    "Country house or château",
  ],
  "Adventure & outdoors": [
    "Mountain lodge",
    "Eco-luxury retreat",
    "Adventure resort",
  ],
  "Spa & wellness": [
    "Dedicated spa resort",
    "Wellness retreat property",
    "Adults-only spa hotel",
  ],
  "Cultural & chic": [
    "Boutique heritage hotel",
    "Design hotel in cultural quarter",
    "Historic city property",
  ],
  "Wild & spontaneous": [
    "Curated by Something Blue Travel based on destination",
    "Boutique or design hotel",
    "Private villa",
  ],
  "Low-key & intimate": [
    "Private villa with pool",
    "Boutique luxury hotel",
    "Secluded adults-only retreat",
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// HELPER — preferred travel date field (added to every basics step)
// ══════════════════════════════════════════════════════════════════════════════
const TRAVEL_DATE_FIELD = {
  id: "travelDate",
  label: "Preferred travel date(s)",
  type: "text",
  placeholder: "e.g. March 2026, summer 2026, flexible — advise me…",
};

// ══════════════════════════════════════════════════════════════════════════════
// FLOWS
// ══════════════════════════════════════════════════════════════════════════════

// ─── DESTINATION WEDDING ──────────────────────────────────────────────────────
// Something Blue Travel handles: travel logistics, accommodation, group events.
// Everything ceremony-related (venue, photographer, catering, décor, florals,
// officiant, entertainment) belongs to the wedding planner.
// The wedding planner step branches and, if needed, collects what planner
// services the client still needs to source.

const WEDDING_FLOW = [
  {
    id: "basics",
    title: "Your destination wedding begins here",
    subtitle: "Every extraordinary wedding starts with a single conversation.",
    fields: [
      {
        id: "coupleName",
        label: "Your names",
        type: "text",
        placeholder: "e.g. Sofia & James",
      },
      {
        id: "destination",
        label: "Dream destination",
        type: "text",
        placeholder: "Italy, Greece, Mexico, Bali, Santorini…",
      },
      {
        id: "weddingDate",
        label: "Target wedding date",
        type: "text",
        placeholder: "Month / year or season",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "guestCount",
        label: "Approximate guest count",
        type: "select",
        options: [
          "Micro-wedding (under 20)",
          "Intimate (20–50)",
          "Medium (50–100)",
          "Large (100–200)",
          "Grand (200+)",
        ],
      },
      {
        id: "travelLength",
        label: "Total trip length for guests",
        type: "select",
        options: ["3–4 days", "5–7 days", "8–10 days", "2+ weeks"],
      },
      {
        id: "weddingBudget",
        label: "Overall travel & accommodation budget",
        type: "select",
        options: [
          "Under $30,000",
          "$30,000–$60,000",
          "$60,000–$100,000",
          "$100,000–$200,000",
          "$200,000+",
          "Prefer to discuss",
        ],
      },
      {
        id: "guestBudget",
        label: "Travel & stay budget per guest",
        type: "select",
        options: [
          "Under $2,000",
          "$2,000–$4,000",
          "$4,000–$7,000",
          "$7,000–$12,000",
          "$12,000+",
          "Varies by guest",
        ],
      },
    ],
  },
  {
    id: "accommodations",
    title: "Accommodation for everyone",
    subtitle:
      "Where your guests rest shapes their entire experience of your celebration.",
    fields: [
      {
        id: "coupleStay",
        label: "The couple's accommodation",
        type: "multiselect",
        options: [
          "Private villa",
          "Presidential / penthouse suite",
          "Overwater bungalow",
          "Honeymoon suite",
          "Boutique property",
        ],
      },
      {
        id: "guestStay",
        label: "Guest accommodation style",
        type: "multiselect",
        options: [
          "Same property as the couple",
          "Nearby boutique hotels",
          "Villa rentals for guest groups",
          "Range of options across budgets",
          "All-inclusive resort block",
        ],
      },
      {
        id: "groupActivities",
        label: "Pre / post wedding group events",
        type: "multiselect",
        options: [
          "Welcome dinner on arrival",
          "Farewell brunch",
          "Curated group excursion",
          "Cocktail welcome hour",
          "Cultural or historical private tour",
          "No group events needed",
        ],
      },
    ],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    subtitle:
      "The details that make every arrival seamless and every departure stress-free.",
    fields: [
      {
        id: "guestFlights",
        label: "Coordinate group flights for guests?",
        type: "yesno",
      },
      {
        id: "flightClass",
        label: "Preferred cabin class for the couple",
        type: "select",
        options: [
          "Economy",
          "Premium Economy",
          "Business Class",
          "First Class",
          "Advise us",
        ],
      },
      {
        id: "privateTransfers",
        label: "Private transfers for couple and / or guests?",
        type: "yesno",
      },
      {
        id: "legalHelp",
        label: "Guidance on legal marriage requirements abroad?",
        type: "yesno",
      },
      {
        id: "honeymoonAfter",
        label: "Honeymoon immediately following the wedding?",
        type: "yesno",
      },
      {
        id: "travelInsurance",
        label: "Travel protection for the group?",
        type: "yesno",
      },
    ],
  },
  {
    id: "wedding_planner",
    title: "Wedding planner",
    subtitle:
      "Something Blue Travel handles all travel. Everything on the wedding day itself — venue, photography, catering, décor, florals, officiant — is coordinated by your wedding planner. Tell us where you stand.",
    fields: [],
  }, // handled by WeddingPlannerStep
  {
    id: "wedding_extras",
    title: "Finding your wedding vendors",
    subtitle:
      "Tell us what you still need to source. We'll connect you with the right people.",
    _conditional: true,
    fields: [
      {
        id: "vendorsNeeded",
        label: "Which wedding-day vendors are you still sourcing?",
        type: "multiselect",
        options: [
          "Wedding planner / coordinator",
          "Photographer",
          "Videographer",
          "Floral designer & décor",
          "Officiant",
          "Catering & bar",
          "Entertainment (band, DJ, musicians)",
          "Hair & makeup artist",
          "Wedding cake designer",
          "Transportation on the day",
        ],
      },
      {
        id: "plannerStyle",
        label: "Planning aesthetic you're drawn to",
        type: "multiselect",
        options: [
          "Classic & timeless",
          "Modern & editorial",
          "Boho & free-spirited",
          "Garden & botanical",
          "Opulent & maximalist",
          "Minimalist & architectural",
          "Cultural & traditional",
        ],
      },
      {
        id: "vendorNotes",
        label: "Anything else about what you're looking for?",
        type: "textarea",
        placeholder:
          "Vision, non-negotiables, budget for vendors, destination-specific requirements…",
      },
    ],
  },
  {
    id: "contact",
    title: "Let's bring your vision to life",
    subtitle: "Tell us your dream in your own words.",
    fields: [
      {
        id: "name",
        label: "Your names",
        type: "text",
        placeholder: "Full names of both partners",
      },
      {
        id: "email",
        label: "Email address",
        type: "text",
        placeholder: "you@email.com",
      },
      {
        id: "phone",
        label: "Phone number",
        type: "text",
        placeholder: "(optional)",
      },
      {
        id: "instagram",
        label: "Instagram (optional)",
        type: "text",
        placeholder: "@yourhandle",
      },
      {
        id: "notes",
        label: "Your vision in your own words",
        type: "textarea",
        placeholder: "The feeling, the aesthetic, the people. Don't hold back…",
      },
    ],
  },
];

// ─── HONEYMOON ────────────────────────────────────────────────────────────────
const HONEYMOON_FLOW = [
  {
    id: "basics",
    title: "Let's set the scene",
    subtitle:
      "Tell us about your vision so we can begin designing your perfect escape.",
    fields: [
      {
        id: "destination",
        label: "Dream destination(s)",
        type: "text",
        placeholder: "Maldives, Amalfi Coast, Bora Bora…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "How long is your honeymoon?",
        type: "select",
        options: [
          "3–5 nights",
          "6–8 nights",
          "9–12 nights",
          "2+ weeks",
          "Not sure yet",
        ],
      },
      {
        id: "budget",
        label: "Overall budget",
        type: "select",
        options: [
          "$5,000–$10,000",
          "$10,000–$20,000",
          "$20,000–$35,000",
          "$35,000+",
          "Flexible / sky's the limit",
        ],
      },
      {
        id: "weddingDate",
        label: "Wedding date (approximate)",
        type: "text",
        placeholder: "e.g. June 2026",
      },
      {
        id: "travelStyle",
        label: "Honeymoon style",
        type: "multiselect",
        options: [
          "Beach & sun",
          "Adventure & exploration",
          "Culture & cuisine",
          "Spa & wellness",
          "Safari",
          "City chic",
          "Island hopping",
          "Cruise",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where will you stay?",
    subtitle:
      "Your accommodation is the backdrop to some of the most intimate moments of your life.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Curating your days",
    subtitle:
      "The experiences between destinations are often what you'll remember most.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "extras",
    title: "The private touches",
    subtitle: "The details that transform a trip into a memory.",
    fields: [
      {
        id: "surprises",
        label: "Romantic enhancements",
        type: "multiselect",
        options: [
          "In-room rose petal turndown",
          "Champagne & strawberries on arrival",
          "Couples spa treatment",
          "Private stargazing experience",
          "Bespoke keepsake book",
          "Sunset cocktail setup",
        ],
      },
      {
        id: "photography",
        label: "Couples photography session?",
        type: "yesno",
      },
      {
        id: "photoStyle",
        label: "Photography aesthetic",
        type: "photoselect",
        options: PHOTO_STYLES,
      },
    ],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    subtitle: "Seamless details — your only job is to be present.",
    fields: [
      { id: "flights", label: "Include flights?", type: "yesno" },
      {
        id: "flightClass",
        label: "Preferred cabin class",
        type: "select",
        options: [
          "Economy",
          "Premium Economy",
          "Business Class",
          "First Class",
          "Advise me on best value",
        ],
      },
      { id: "transfers", label: "Private airport transfers?", type: "yesno" },
      { id: "travelInsurance", label: "Travel protection?", type: "yesno" },
    ],
  },
  {
    id: "contact",
    title: "Almost done — let's connect",
    subtitle: "Your details are private. We'll be in touch within 72 hours.",
    fields: [
      {
        id: "name",
        label: "Your name",
        type: "text",
        placeholder: "Full name",
      },
      {
        id: "email",
        label: "Email address",
        type: "text",
        placeholder: "you@email.com",
      },
      {
        id: "phone",
        label: "Phone number",
        type: "text",
        placeholder: "(optional)",
      },
      {
        id: "instagram",
        label: "Instagram (optional)",
        type: "text",
        placeholder: "@yourhandle",
      },
      {
        id: "notes",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder:
          "Special requests, dietary considerations, accessibility needs…",
      },
    ],
  },
];

function buildHoneymoonAccommodation(vibes: string[]): any[] {
  const stayPool = new Set<string>();
  const prefPool = new Set<string>();
  vibes.forEach((v) => {
    (ACCOMMODATION_BY_VIBE[v] || []).forEach((s: string) => stayPool.add(s));
  });
  if (stayPool.size === 0)
    [
      "Boutique luxury hotel",
      "Private villa rental",
      "Adults-only resort",
    ].forEach((s) => stayPool.add(s));
  const hasBeach = vibes.some((v) =>
    ["Beach & sun", "Island hopping"].includes(v)
  );
  const hasCity = vibes.includes("City chic");
  const hasSpa = vibes.includes("Spa & wellness");
  const hasSafari = vibes.includes("Safari");
  if (hasBeach)
    ["Ocean or sea view", "Direct beach access", "Outdoor shower"].forEach(
      (p) => prefPool.add(p)
    );
  if (hasCity)
    ["City panorama view", "High-floor suite"].forEach((p) => prefPool.add(p));
  if (hasSpa)
    [
      "In-room soaking tub",
      "Spa access included",
      "Wellness programme",
    ].forEach((p) => prefPool.add(p));
  if (hasSafari)
    [
      "Wildlife viewing from suite",
      "Open-air design",
      "Bush or game reserve setting",
    ].forEach((p) => prefPool.add(p));
  [
    "Private pool or plunge pool",
    "Butler service",
    "Breakfast included",
    "All-inclusive",
    "Complete privacy & seclusion",
  ].forEach((p) => prefPool.add(p));
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...stayPool],
    },
    {
      id: "roomPrefs",
      label: "Room essentials",
      type: "multiselect",
      options: [...prefPool],
    },
  ];
}

function buildHoneymoonExperiences(vibes: string[]): any[] {
  const diningPool = new Set<string>();
  const activityPool = new Set<string>();
  vibes.forEach((v) => {
    (DINING_BY_VIBE[v] || []).forEach((d: string) => diningPool.add(d));
    (ACTIVITIES_BY_VIBE[v] || []).forEach((a: string) => activityPool.add(a));
  });
  if (diningPool.size === 0)
    [
      "Private chef dinner",
      "Sunset cocktail cruise",
      "Chef's tasting menu",
    ].forEach((d) => diningPool.add(d));
  if (activityPool.size === 0)
    ["Couples spa day", "Sunset sailing", "Guided cultural tour"].forEach((a) =>
      activityPool.add(a)
    );
  return [
    {
      id: "dining",
      label: "Dining experiences",
      type: "multiselect",
      options: [...diningPool],
    },
    {
      id: "activities",
      label: "Experiences & excursions",
      type: "multiselect",
      options: [...activityPool],
    },
  ];
}

// ─── BABYMOON ─────────────────────────────────────────────────────────────────
const BABYMOON_FLOW = [
  {
    id: "basics",
    title: "Your last great escape before baby",
    subtitle:
      "Rest, reconnect, and savour every moment before your world beautifully changes.",
    fields: [
      {
        id: "destination",
        label: "Destination preference",
        type: "text",
        placeholder:
          "Somewhere restorative — beach, mountains, city spa retreat…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: ["3–4 nights", "5–7 nights", "1 week", "Not sure yet"],
      },
      {
        id: "dueDate",
        label: "Approximate due date",
        type: "text",
        placeholder: "e.g. October 2026 — so we can plan timing safely",
      },
      {
        id: "budget",
        label: "Overall budget",
        type: "select",
        options: [
          "$3,000–$6,000",
          "$6,000–$12,000",
          "$12,000–$20,000",
          "$20,000+",
          "Flexible",
        ],
      },
      {
        id: "travelStyle",
        label: "Babymoon priority",
        type: "multiselect",
        options: [
          "Total relaxation",
          "Spa & wellness focus",
          "Beach & pool",
          "Fine dining",
          "Gentle sightseeing",
          "Nature & scenery",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where will you stay?",
    subtitle:
      "Comfort and ease are paramount — every detail will be chosen with that in mind.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Your ideal days",
    subtitle:
      "Nourishing, unhurried, and entirely curated for this season of life.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    subtitle: "We'll factor in every detail that matters during this stage.",
    fields: [
      { id: "flights", label: "Include flights?", type: "yesno" },
      {
        id: "flightClass",
        label: "Preferred cabin class",
        type: "select",
        options: [
          "Economy",
          "Premium Economy",
          "Business Class",
          "First Class",
          "Advise me on best value",
        ],
      },
      {
        id: "transfers",
        label: "Private, comfortable transfers?",
        type: "yesno",
      },
      {
        id: "travelInsurance",
        label: "Travel protection (strongly recommended)?",
        type: "yesno",
      },
      {
        id: "medicalNotes",
        label: "Any medical considerations we should know?",
        type: "textarea",
        placeholder:
          "High-risk pregnancy, airline restrictions, destination safety, dietary requirements…",
      },
    ],
  },
  {
    id: "contact",
    title: "Let's start planning",
    subtitle:
      "We'll be in touch within 72 hours with ideas tailored to this moment.",
    fields: [
      {
        id: "name",
        label: "Your names",
        type: "text",
        placeholder: "Full names",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder:
          "Any preferences, sensitivities, or wishes — nothing is too small to mention…",
      },
    ],
  },
];

const BABYMOON_ACCOMMODATION: Record<string, string[]> = {
  "Total relaxation": [
    "Private villa",
    "Luxury resort",
    "Adults-only retreat",
    "Secluded boutique hotel",
  ],
  "Spa & wellness focus": [
    "Dedicated spa resort",
    "Wellness retreat",
    "Thermal or mineral spring hotel",
    "Adults-only spa hotel",
  ],
  "Beach & pool": [
    "Beachfront villa",
    "Adults-only beach resort",
    "Luxury all-inclusive",
    "Overwater suite",
  ],
  "Fine dining": [
    "Boutique hotel near dining district",
    "Luxury resort with renowned restaurant",
    "Wine estate accommodation",
  ],
  "Gentle sightseeing": [
    "Boutique city hotel",
    "Heritage property",
    "Design hotel in cultural quarter",
  ],
  "Nature & scenery": [
    "Mountain or lake lodge",
    "Eco-luxury property",
    "Countryside estate",
    "Scenic private villa",
  ],
};
const BABYMOON_ACTIVITIES: Record<string, string[]> = {
  "Total relaxation": [
    "In-villa private dining",
    "Champagne & canapes at sunset",
    "Leisurely long lunches",
    "Gentle guided walk",
  ],
  "Spa & wellness focus": [
    "Prenatal massage",
    "Couples spa ritual",
    "Private yoga or meditation",
    "Hydrotherapy experience",
    "Wellness consultation",
  ],
  "Beach & pool": [
    "Private beach yoga",
    "Gentle snorkel in calm waters",
    "Sunset boat cruise",
    "Beach picnic setup",
    "Poolside cabana service",
  ],
  "Fine dining": [
    "Chef's tasting menu",
    "Private cooking class",
    "Sommelier-led pairing",
    "Sunset dinner with a view",
  ],
  "Gentle sightseeing": [
    "Private guided cultural tour",
    "Scenic drive by luxury car",
    "Museum or gallery visit",
    "Photography walk",
  ],
  "Nature & scenery": [
    "Gentle scenic hike with guide",
    "Wildlife viewing",
    "Botanical garden visit",
    "Sunset from a scenic viewpoint",
    "Hot air balloon (weather permitting)",
  ],
};

function buildBabymoonAccommodation(styles: string[]): any[] {
  const pool = new Set<string>();
  styles.forEach((s) =>
    (BABYMOON_ACCOMMODATION[s] || []).forEach((a: string) => pool.add(a))
  );
  if (pool.size === 0)
    ["Luxury resort", "Private villa", "Boutique hotel"].forEach((a) =>
      pool.add(a)
    );
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "roomPrefs",
      label: "Essential room features",
      type: "multiselect",
      options: [
        "Ground floor or lift access",
        "King bed",
        "Deep soaking tub",
        "Private terrace",
        "24-hour room service",
        "Pregnancy-safe spa on property",
        "Private pool",
        "Quiet location away from crowds",
      ],
    },
  ];
}

function buildBabymoonExperiences(styles: string[]): any[] {
  const pool = new Set<string>();
  const dPool = new Set<string>();
  styles.forEach((s) => {
    (BABYMOON_ACTIVITIES[s] || []).forEach((a: string) => pool.add(a));
    (DINING_BY_VIBE["Spa & wellness"] || []).forEach((d: string) =>
      dPool.add(d)
    );
    if (styles.includes("Fine dining"))
      (DINING_BY_VIBE["Culture & cuisine"] || []).forEach((d: string) =>
        dPool.add(d)
      );
  });
  if (pool.size === 0)
    ["Prenatal massage", "Sunset boat cruise", "Private yoga"].forEach((a) =>
      pool.add(a)
    );
  if (dPool.size === 0)
    [
      "In-room private dining",
      "Breakfast in bed",
      "Nutritionist-curated menu",
    ].forEach((d) => dPool.add(d));
  return [
    {
      id: "activities",
      label: "Wellness & experiences",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "dining",
      label: "Dining preferences",
      type: "multiselect",
      options: [...dPool],
    },
  ];
}

// ─── ANNIVERSARY ──────────────────────────────────────────────────────────────
const ANNIVERSARY_FLOW = [
  {
    id: "basics",
    title: "Celebrating your love story",
    subtitle:
      "Tell us about this milestone so we can honour it with the depth it deserves.",
    fields: [
      {
        id: "anniversary",
        label: "Which anniversary?",
        type: "select",
        options: [
          "1st",
          "5th",
          "10th",
          "15th",
          "20th",
          "25th",
          "30th",
          "40th",
          "50th",
          "Another milestone",
        ],
      },
      {
        id: "destination",
        label: "Where in the world?",
        type: "text",
        placeholder: "Return to where it began, or somewhere entirely new…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: [
          "Weekend escape (2–3 nights)",
          "4–6 nights",
          "1 week",
          "10+ nights",
        ],
      },
      {
        id: "budget",
        label: "Budget",
        type: "select",
        options: [
          "$3,000–$7,000",
          "$7,000–$15,000",
          "$15,000–$30,000",
          "$30,000+",
        ],
      },
      {
        id: "travelStyle",
        label: "Anniversary experience",
        type: "multiselect",
        options: [
          "Slow & deeply indulgent",
          "Adventure & exploration",
          "Culture & cuisine",
          "Beach & sea",
          "City escape",
          "Spa & wellness",
          "Food & wine",
          "Return to honeymoon dest.",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where will you stay?",
    subtitle: "The right setting elevates every moment.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Making it unforgettable",
    subtitle: "Anniversary travel is about depth, not just distance.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "extras",
    title: "The personal touches",
    subtitle: "The gestures that make it unmistakably yours.",
    fields: [
      {
        id: "romance",
        label: "Special moments",
        type: "multiselect",
        options: [
          "Rose petal turndown on arrival",
          "Champagne & private toast setup",
          "Renewal of vows ceremony",
          "Surprise anniversary dessert or cake",
          "Bespoke couples portrait session",
          "Custom keepsake or photo album",
        ],
      },
      {
        id: "photography",
        label: "Couples photography session?",
        type: "yesno",
      },
    ],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    subtitle: "Your only job is to enjoy — we handle everything else.",
    fields: [
      { id: "flights", label: "Include flights?", type: "yesno" },
      {
        id: "flightClass",
        label: "Cabin class",
        type: "select",
        options: ["Economy", "Premium Economy", "Business", "First Class"],
      },
      { id: "transfers", label: "Private transfers?", type: "yesno" },
      { id: "travelInsurance", label: "Travel protection?", type: "yesno" },
    ],
  },
  {
    id: "contact",
    title: "Let's start planning",
    subtitle: "We'll have curated ideas ready for you within 72 hours.",
    fields: [
      {
        id: "name",
        label: "Your name",
        type: "text",
        placeholder: "Full name",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "What would make this perfect?",
        type: "textarea",
        placeholder:
          "Surprises planned, moments from your story, specific requests…",
      },
    ],
  },
];

function buildAnniversaryAccommodation(vibes: string[]): any[] {
  const pool = new Set<string>();
  vibes.forEach((v) =>
    (ACCOMMODATION_BY_VIBE[v] || []).forEach((s: string) => pool.add(s))
  );
  if (pool.size === 0)
    ["Boutique luxury hotel", "Private villa", "Adults-only resort"].forEach(
      (s) => pool.add(s)
    );
  const prefPool = new Set<string>();
  const hasBeach = vibes.some((v) =>
    ["Beach & sea", "Island hopping"].includes(v)
  );
  const hasCity = vibes.some((v) => ["City escape", "City chic"].includes(v));
  const hasSpa = vibes.some((v) => ["Spa & wellness"].includes(v));
  if (hasBeach)
    ["Sea or ocean view", "Direct beach access", "Outdoor shower"].forEach(
      (p) => prefPool.add(p)
    );
  if (hasCity)
    ["City panorama view", "Central location", "High-floor suite"].forEach(
      (p) => prefPool.add(p)
    );
  if (hasSpa)
    ["In-room soaking tub", "Spa access", "Wellness programme"].forEach((p) =>
      prefPool.add(p)
    );
  [
    "Private pool",
    "Butler service",
    "Breakfast included",
    "Complete seclusion & privacy",
  ].forEach((p) => prefPool.add(p));
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "roomPrefs",
      label: "Room essentials",
      type: "multiselect",
      options: [...prefPool],
    },
  ];
}

function buildAnniversaryExperiences(vibes: string[]): any[] {
  const diningPool = new Set<string>();
  const actPool = new Set<string>();
  vibes.forEach((v) => {
    (DINING_BY_VIBE[v] || []).forEach((d: string) => diningPool.add(d));
    (ACTIVITIES_BY_VIBE[v] || []).forEach((a: string) => actPool.add(a));
  });
  if (diningPool.size === 0)
    [
      "Private chef dinner",
      "Sunset cruise dinner",
      "Michelin-starred reservation",
    ].forEach((d) => diningPool.add(d));
  if (actPool.size === 0)
    [
      "Couples spa treatment",
      "Sunset sailing",
      "Private cultural tour",
    ].forEach((a) => actPool.add(a));
  return [
    {
      id: "dining",
      label: "Dining experiences",
      type: "multiselect",
      options: [...diningPool],
    },
    {
      id: "activities",
      label: "Experiences together",
      type: "multiselect",
      options: [...actPool],
    },
  ];
}

// ─── BACHELORETTE ─────────────────────────────────────────────────────────────
const BACHELORETTE_FLOW = [
  {
    id: "basics",
    title: "Who are we celebrating?",
    subtitle:
      "Let's craft an experience the guest of honour will never stop talking about.",
    fields: [
      {
        id: "honoree",
        label: "Bride's name",
        type: "text",
        placeholder: "The guest of honour",
      },
      {
        id: "plannerName",
        label: "Your name",
        type: "text",
        placeholder: "Maid of honour, organiser, closest friend…",
      },
      {
        id: "groupSize",
        label: "Group size",
        type: "select",
        options: [
          "Just the two of us",
          "3–5 guests",
          "6–9 guests",
          "10–15 guests",
          "16+ guests",
        ],
      },
      {
        id: "destination",
        label: "Destination in mind?",
        type: "text",
        placeholder: "Cabo, Tuscany, Ibiza, Nashville, New York, Tokyo…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: ["One night", "2–3 nights", "4–5 nights", "A full week"],
      },
      {
        id: "budgetPP",
        label: "Approximate budget per person",
        type: "select",
        options: [
          "Under $500",
          "$500–$1,000",
          "$1,000–$2,000",
          "$2,000–$3,500",
          "$3,500+",
        ],
      },
    ],
  },
  {
    id: "style",
    title: "The experience",
    subtitle:
      "Every exceptional trip begins with a clear sense of what it should feel like.",
    fields: [
      {
        id: "partyStyle",
        label: "What kind of experience is this?",
        type: "multiselect",
        options: [
          "Glam & nightlife",
          "Beach & sun",
          "Wine & fine dining",
          "Adventure & outdoors",
          "Spa & wellness",
          "Cultural & chic",
          "Wild & spontaneous",
          "Low-key & intimate",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where are you staying?",
    subtitle:
      "Home base should feel as considered as the rest of the itinerary.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Activities & dining",
    subtitle: "Curated entirely around her.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "logistics",
    title: "The details",
    subtitle: "Everything you need to make the logistics invisible.",
    fields: [
      { id: "flights", label: "Coordinate flights?", type: "yesno" },
      { id: "transfers", label: "Private group transfers?", type: "yesno" },
      {
        id: "photography",
        label: "Group photographer / content creator?",
        type: "yesno",
      },
      {
        id: "weddingDate",
        label: "Wedding date",
        type: "text",
        placeholder: "So we can time the celebration perfectly",
      },
    ],
  },
  {
    id: "contact",
    title: "Let's make it legendary",
    subtitle: "We'll be in touch within 72 hours with curated ideas.",
    fields: [
      {
        id: "email",
        label: "Your email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "Tell us about the bride",
        type: "textarea",
        placeholder:
          "Her personality, what she'd love, what she'd hate, her travel style, anything that matters…",
      },
    ],
  },
];

function buildBacheloretteAccommodation(styles: string[]): any[] {
  const pool = new Set<string>();
  styles.forEach((s) =>
    (ACCOMMODATION_BY_BACHELORETTE[s] || []).forEach((a: string) => pool.add(a))
  );
  if (pool.size === 0)
    ["Luxury villa rental", "Boutique hotel", "Adults-only resort"].forEach(
      (a) => pool.add(a)
    );
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "roomNeeds",
      label: "On-arrival requests",
      type: "multiselect",
      options: [
        "Bride's suite prepared on arrival",
        "Champagne & welcome drinks in rooms",
        "Shared living space for the group",
        "Pool access",
        "Rooms on the same floor or wing",
      ],
    },
  ];
}

function buildBacheloretteExperiences(styles: string[]): any[] {
  const actPool = new Set<string>();
  const dinPool = new Set<string>();
  styles.forEach((s) => {
    (ACTIVITIES_BY_BACHELORETTE[s] || []).forEach((a: string) =>
      actPool.add(a)
    );
    const key =
      s === "Glam & nightlife"
        ? "City chic"
        : s === "Wine & fine dining"
        ? "Culture & cuisine"
        : s === "Beach & sun"
        ? "Beach & sun"
        : s === "Spa & wellness"
        ? "Spa & wellness"
        : "City chic";
    (DINING_BY_VIBE[key] || []).forEach((d: string) => dinPool.add(d));
  });
  if (actPool.size === 0)
    [
      "Private wine tasting",
      "Sunset sailing",
      "Spa day",
      "Private chef dinner",
    ].forEach((a) => actPool.add(a));
  if (dinPool.size === 0)
    [
      "Private chef dinner",
      "Rooftop dining",
      "Sommelier-led wine dinner",
    ].forEach((d) => dinPool.add(d));
  return [
    {
      id: "activities",
      label: "Curated activities",
      type: "multiselect",
      options: [...actPool],
    },
    {
      id: "dining",
      label: "Dining experiences",
      type: "multiselect",
      options: [...dinPool],
    },
  ];
}

// ─── BACHELOR ─────────────────────────────────────────────────────────────────
const BACHELOR_FLOW = [
  {
    id: "basics",
    title: "Who are we celebrating?",
    subtitle: "Let's give the groom the sendoff he's earned.",
    fields: [
      {
        id: "honoree",
        label: "Groom's name",
        type: "text",
        placeholder: "The guest of honour",
      },
      {
        id: "plannerName",
        label: "Your name",
        type: "text",
        placeholder: "Best man, organiser, closest friend…",
      },
      {
        id: "groupSize",
        label: "Group size",
        type: "select",
        options: ["Just the two of you", "3–5", "6–9", "10–15", "16+"],
      },
      {
        id: "destination",
        label: "Destination in mind?",
        type: "text",
        placeholder: "Vegas, Miami, Portugal, Tokyo, Scotland, Scottsdale…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: ["One night", "2–3 nights", "4–5 nights", "A full week"],
      },
      {
        id: "budgetPP",
        label: "Approximate budget per person",
        type: "select",
        options: [
          "Under $500",
          "$500–$1,000",
          "$1,000–$2,000",
          "$2,000–$3,500",
          "$3,500+",
        ],
      },
    ],
  },
  {
    id: "style",
    title: "The kind of trip",
    subtitle: "Every great bachelor trip has a story — what's his?",
    fields: [
      {
        id: "tripStyle",
        label: "What kind of experience is this?",
        type: "multiselect",
        options: [
          "Golf getaway",
          "Nightlife & clubs",
          "Sports & action",
          "Beach & relaxation",
          "Adventure & outdoors",
          "Food & whisky / craft beer",
          "Casino & entertainment",
          "Low-key & chill",
          "International adventure",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where are you staying?",
    subtitle: "The right base makes everything better.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Activities & dining",
    subtitle: "Curated entirely around him.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "logistics",
    title: "The details",
    fields: [
      { id: "flights", label: "Coordinate flights?", type: "yesno" },
      { id: "transfers", label: "Private group transfers?", type: "yesno" },
      {
        id: "weddingDate",
        label: "Wedding date",
        type: "text",
        placeholder: "So we can time the trip right",
      },
    ],
  },
  {
    id: "contact",
    title: "Let's build something epic",
    subtitle: "We'll be in touch within 72 hours.",
    fields: [
      {
        id: "email",
        label: "Your email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "Tell us about the groom",
        type: "textarea",
        placeholder:
          "His interests, what he'd love, the group's vibe, anything that matters…",
      },
    ],
  },
];

function buildBachelorAccommodation(styles: string[]): any[] {
  const pool = new Set<string>();
  styles.forEach((s) =>
    (ACCOMMODATION_BY_BACHELOR[s] || []).forEach((a: string) => pool.add(a))
  );
  if (pool.size === 0)
    ["Luxury villa", "Boutique hotel", "Hotel suite block"].forEach((a) =>
      pool.add(a)
    );
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "roomNeeds",
      label: "On-arrival requests",
      type: "multiselect",
      options: [
        "Groom's room arranged on arrival",
        "Welcome drinks in rooms",
        "Private pool or outdoor area",
        "Shared common space",
        "Rooms on the same floor",
      ],
    },
  ];
}

function buildBachelorExperiences(styles: string[]): any[] {
  const actPool = new Set<string>();
  styles.forEach((s) =>
    (ACTIVITIES_BY_BACHELOR[s] || []).forEach((a: string) => actPool.add(a))
  );
  if (actPool.size === 0)
    [
      "Private group dinner",
      "Sunset boat cruise",
      "VIP access",
      "Adventure excursion",
    ].forEach((a) => actPool.add(a));
  return [
    {
      id: "activities",
      label: "Must-have experiences",
      type: "multiselect",
      options: [...actPool],
    },
    {
      id: "dining",
      label: "Dining preferences",
      type: "multiselect",
      options: [
        "Private group chef's dinner",
        "High-end steakhouse reservation",
        "Rooftop dinner",
        "Distillery or winery dinner",
        "Sports bar private hire",
        "Local fine dining experience",
      ],
    },
  ];
}

// ─── PROPOSAL ─────────────────────────────────────────────────────────────────
const PROPOSAL_FLOW = [
  {
    id: "basics",
    title: "Tell us about the moment",
    subtitle: "Every detail matters. Let's make this absolutely unforgettable.",
    fields: [
      {
        id: "proposerName",
        label: "Your name",
        type: "text",
        placeholder: "The one doing the proposing",
      },
      {
        id: "partnerName",
        label: "Partner's name",
        type: "text",
        placeholder: "The very lucky one",
      },
      {
        id: "destination",
        label: "Destination in mind?",
        type: "text",
        placeholder: "Or let us suggest the perfect backdrop…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "budget",
        label: "Overall budget",
        type: "select",
        options: [
          "Under $5,000",
          "$5,000–$10,000",
          "$10,000–$20,000",
          "$20,000+",
          "Tell us what's possible",
        ],
      },
    ],
  },
  {
    id: "proposal",
    title: "Designing the perfect moment",
    subtitle: "Your proposal setting says everything about your love story.",
    fields: [
      {
        id: "proposalStyle",
        label: "Proposal setting",
        type: "multiselect",
        options: [
          "Intimate & entirely private",
          "Dramatic scenic overlook",
          "On the water",
          "At a private dinner",
          "Sunset beach",
          "Rooftop terrace",
          "Garden or vineyard",
          "Cliffside / mountain",
        ],
      },
      {
        id: "photographer",
        label: "Hidden proposal photographer?",
        type: "yesno",
      },
      {
        id: "photoStyle",
        label: "Photography aesthetic",
        type: "photoselect",
        options: PHOTO_STYLES,
      },
      {
        id: "extras",
        label: "Proposal enhancements",
        type: "multiselect",
        options: [
          "Curated floral arrangement",
          "Champagne on ice",
          "Live musician",
          "Fireworks display",
          "Custom video message",
          "Private boat or yacht setup",
          "Personalised signage",
        ],
      },
    ],
  },
  {
    id: "celebration",
    title: "After the yes",
    subtitle: "The proposal is just the beginning of the evening.",
    fields: [
      {
        id: "celebrationDinner",
        label: "Private celebration dinner?",
        type: "yesno",
      },
      { id: "extendedStay", label: "Extend into a mini-moon?", type: "yesno" },
      {
        id: "miniMoonNights",
        label: "If yes, how many nights?",
        type: "select",
        options: ["1–2 nights", "3–5 nights", "A full week", "Not sure yet"],
      },
      {
        id: "stayType",
        label: "Accommodation style",
        type: "multiselect",
        options: [
          "Luxury hotel suite",
          "Boutique romantic hotel",
          "Overwater villa",
          "Private rental",
          "Cliffside retreat",
        ],
      },
    ],
  },
  {
    id: "contact",
    title: "Let's make it happen",
    subtitle: "Everything stays completely confidential.",
    fields: [
      {
        id: "email",
        label: "Your email",
        type: "text",
        placeholder: "For your eyes only…",
      },
      {
        id: "phone",
        label: "Phone number",
        type: "text",
        placeholder: "(optional)",
      },
      {
        id: "secrecy",
        label: "How secret does this need to be?",
        type: "select",
        options: [
          "Completely secret — partner must not know",
          "Partner knows a trip is planned, not the proposal",
          "Partner knows the destination only",
          "We're planning this together",
        ],
      },
      {
        id: "notes",
        label: "Details that will make it perfect",
        type: "textarea",
        placeholder:
          "Favourite flowers, meaningful songs, how you met, what they'd love most…",
      },
    ],
  },
];

// ─── JUST BECAUSE ─────────────────────────────────────────────────────────────
const JUSTBECAUSE_FLOW = [
  {
    id: "basics",
    title: "Simply a great trip",
    subtitle:
      "No occasion necessary. Sometimes the best reason to travel is that you want to.",
    fields: [
      {
        id: "who",
        label: "Who is travelling?",
        type: "select",
        options: ["Just me", "A couple", "A small group of friends", "Family"],
      },
      {
        id: "destination",
        label: "Where are you dreaming of?",
        type: "text",
        placeholder: "Anywhere specific, or let us inspire you…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: [
          "A long weekend",
          "Under 1 week",
          "1–2 weeks",
          "2+ weeks",
          "Open / flexible",
        ],
      },
      {
        id: "budget",
        label: "Overall budget",
        type: "select",
        options: [
          "Under $3,000",
          "$3,000–$7,000",
          "$7,000–$15,000",
          "$15,000–$30,000",
          "$30,000+",
          "Flexible",
        ],
      },
      {
        id: "travelStyle",
        label: "What does this trip feel like?",
        type: "multiselect",
        options: [
          "Pure relaxation",
          "Cultural immersion",
          "Adventure & outdoor",
          "Food & wine",
          "Spa & wellness",
          "City exploration",
          "Beach & sun",
          "Safari",
          "Cruise",
          "Off the beaten path",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where will you stay?",
    subtitle: "Your accommodation sets the tone for everything.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Your days",
    subtitle:
      "This trip is entirely yours — let's fill it with the right things.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    fields: [
      { id: "flights", label: "Include flights?", type: "yesno" },
      {
        id: "flightClass",
        label: "Cabin class",
        type: "select",
        options: [
          "Economy",
          "Premium Economy",
          "Business",
          "First Class",
          "Advise me on best value",
        ],
      },
      { id: "transfers", label: "Private airport transfers?", type: "yesno" },
      { id: "travelInsurance", label: "Travel protection?", type: "yesno" },
    ],
  },
  {
    id: "contact",
    title: "Let's start planning",
    subtitle: "We'll be in touch within 72 hours.",
    fields: [
      {
        id: "name",
        label: "Your name",
        type: "text",
        placeholder: "Full name",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder: "What matters to you on this trip — don't overthink it…",
      },
    ],
  },
];

function buildJustBecauseAccommodation(vibes: string[]): any[] {
  const pool = new Set<string>();
  vibes.forEach((v) =>
    (ACCOMMODATION_BY_VIBE[v] || []).forEach((s: string) => pool.add(s))
  );
  if (pool.size === 0)
    ["Boutique luxury hotel", "Private villa", "Luxury resort"].forEach((s) =>
      pool.add(s)
    );
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "roomPrefs",
      label: "Important to you",
      type: "multiselect",
      options: [
        "Private pool",
        "Ocean or panoramic view",
        "Butler service",
        "Breakfast included",
        "Complete privacy",
        "Central location",
        "All-inclusive",
        "Spa on property",
      ],
    },
  ];
}

function buildJustBecauseExperiences(vibes: string[]): any[] {
  const dPool = new Set<string>();
  const aPool = new Set<string>();
  vibes.forEach((v) => {
    (DINING_BY_VIBE[v] || []).forEach((d: string) => dPool.add(d));
    (ACTIVITIES_BY_VIBE[v] || []).forEach((a: string) => aPool.add(a));
  });
  if (dPool.size === 0)
    ["Private chef dinner", "Sunset cocktails", "Chef's tasting menu"].forEach(
      (d) => dPool.add(d)
    );
  if (aPool.size === 0)
    ["Private guided tour", "Couples spa", "Sunset sailing"].forEach((a) =>
      aPool.add(a)
    );
  return [
    {
      id: "dining",
      label: "Dining experiences",
      type: "multiselect",
      options: [...dPool],
    },
    {
      id: "activities",
      label: "Experiences",
      type: "multiselect",
      options: [...aPool],
    },
  ];
}

// ─── SOLO ─────────────────────────────────────────────────────────────────────
const SOLO_FLOW = [
  {
    id: "basics",
    title: "Your journey, your rules",
    subtitle:
      "Solo travel is one of the most powerful things you can do for yourself. Let's design it with intention.",
    fields: [
      {
        id: "destination",
        label: "Where are you dreaming of?",
        type: "text",
        placeholder: "Europe, Southeast Asia, South America, Africa, Japan…",
      },
      TRAVEL_DATE_FIELD,
      {
        id: "duration",
        label: "Trip length",
        type: "select",
        options: [
          "Under 1 week",
          "1–2 weeks",
          "2–3 weeks",
          "1 month or more",
          "Open / flexible",
        ],
      },
      {
        id: "budget",
        label: "Overall budget",
        type: "select",
        options: [
          "Under $3,000",
          "$3,000–$6,000",
          "$6,000–$12,000",
          "$12,000–$20,000",
          "$20,000+",
          "Flexible",
        ],
      },
      {
        id: "travelStyle",
        label: "Your travel style",
        type: "multiselect",
        options: [
          "Pure relaxation",
          "Cultural immersion",
          "Adventure & outdoor",
          "Food & wine",
          "Spiritual or wellness",
          "City exploration",
          "Beach & sun",
          "Photography & creative",
          "Off the beaten path",
        ],
      },
      {
        id: "pacePrefs",
        label: "Travel pace",
        type: "select",
        options: [
          "Slow — one or two places, deeply",
          "Moderate — a few destinations",
          "Active — I want to see as much as possible",
          "Undecided",
        ],
      },
    ],
  },
  {
    id: "accommodation",
    title: "Where will you stay?",
    subtitle: "Your accommodation sets the entire tone for a solo trip.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "experiences",
    title: "Your days",
    subtitle:
      "The magic of solo travel is that every decision is entirely yours.",
    _dynamic: true,
    fields: [],
  },
  {
    id: "social",
    title: "How do you want to travel?",
    subtitle: "Solo doesn't have to mean isolated — unless you want it to.",
    fields: [
      {
        id: "connection",
        label: "Social preference",
        type: "multiselect",
        options: [
          "Completely independent — no group elements",
          "Open to small curated group experiences occasionally",
          "Interested in locally-hosted dinners or cultural events",
          "Would welcome a local guide or host for certain days",
        ],
      },
    ],
  },
  {
    id: "logistics",
    title: "Travel logistics",
    subtitle: "Practical details that keep your adventure seamless.",
    fields: [
      { id: "flights", label: "Include flights?", type: "yesno" },
      {
        id: "flightClass",
        label: "Cabin class",
        type: "select",
        options: [
          "Economy",
          "Premium Economy",
          "Business",
          "First Class",
          "Advise me on best value",
        ],
      },
      { id: "transfers", label: "Private airport transfers?", type: "yesno" },
      { id: "travelInsurance", label: "Travel protection?", type: "yesno" },
    ],
  },
  {
    id: "contact",
    title: "Let's plan your adventure",
    subtitle: "We'll have curated ideas ready for you within 72 hours.",
    fields: [
      {
        id: "name",
        label: "Your name",
        type: "text",
        placeholder: "Full name",
      },
      {
        id: "email",
        label: "Email",
        type: "text",
        placeholder: "you@email.com",
      },
      { id: "phone", label: "Phone", type: "text", placeholder: "(optional)" },
      {
        id: "notes",
        label: "Anything else we should know?",
        type: "textarea",
        placeholder:
          "Specific interests, solo travel questions, things you've always wanted to do…",
      },
    ],
  },
];

const SOLO_ACCOMMODATION: Record<string, string[]> = {
  "Pure relaxation": [
    "Luxury boutique hotel",
    "Adults-only resort",
    "Private villa",
    "Secluded retreat",
  ],
  "Cultural immersion": [
    "Boutique heritage hotel",
    "Design hotel in cultural quarter",
    "Riad or traditional property",
    "Neighbourhood boutique hotel",
  ],
  "Adventure & outdoor": [
    "Adventure resort",
    "Mountain or jungle lodge",
    "Eco-luxury property",
    "Remote wilderness retreat",
  ],
  "Food & wine": [
    "Wine estate accommodation",
    "Boutique hotel near dining district",
    "Luxury agriturismo",
    "Culinary destination hotel",
  ],
  "Spiritual or wellness": [
    "Wellness retreat",
    "Meditation or yoga centre",
    "Thermal spa hotel",
    "Mountain sanctuary",
  ],
  "City exploration": [
    "Design hotel in city centre",
    "Boutique urban hotel",
    "Luxury landmark hotel",
    "Well-located boutique property",
  ],
  "Beach & sun": [
    "Boutique beachfront hotel",
    "Adults-only beach resort",
    "Luxury all-inclusive",
    "Private beach villa",
  ],
  "Photography & creative": [
    "Scenic boutique property",
    "Creative district hotel",
    "Design hotel",
    "Remote lodge with views",
  ],
  "Off the beaten path": [
    "Remote eco-lodge",
    "Expedition camp",
    "Private wilderness property",
    "Local luxury guesthouse",
  ],
};

function buildSoloAccommodation(vibes: string[]): any[] {
  const pool = new Set<string>();
  vibes.forEach((v) =>
    (SOLO_ACCOMMODATION[v] || []).forEach((s: string) => pool.add(s))
  );
  if (pool.size === 0)
    ["Luxury boutique hotel", "Design hotel", "Adults-only resort"].forEach(
      (s) => pool.add(s)
    );
  return [
    {
      id: "stayType",
      label: "Accommodation style",
      type: "multiselect",
      options: [...pool],
    },
    {
      id: "safetyPrefs",
      label: "Property priorities",
      type: "multiselect",
      options: [
        "Established, well-reviewed properties only",
        "24-hour concierge or front desk",
        "Secure, well-located neighbourhood",
        "Solo-traveller-friendly",
        "Easy access to transport",
      ],
    },
  ];
}

function buildSoloExperiences(vibes: string[]): any[] {
  const dPool = new Set<string>();
  const aPool = new Set<string>();
  vibes.forEach((v) => {
    (DINING_BY_VIBE[v] || []).forEach((d: string) => dPool.add(d));
    (ACTIVITIES_BY_VIBE[v] || []).forEach((a: string) => aPool.add(a));
  });
  if (dPool.size === 0)
    ["Solo fine dining", "Cooking class", "Wine tasting"].forEach((d) =>
      dPool.add(d)
    );
  if (aPool.size === 0)
    [
      "Private guided cultural tour",
      "Wellness & spa",
      "Photography tour",
    ].forEach((a) => aPool.add(a));
  return [
    {
      id: "dining",
      label: "Dining style",
      type: "multiselect",
      options: [
        "Solo fine dining — no awkwardness, just great food",
        "Private chef experience",
        "Local market or street food tour",
        "Cooking class",
        "Wine or spirits tasting",
        "Chef's counter or tasting menu",
        ...dPool,
      ].filter((v, i, a) => a.indexOf(v) === i),
    },
    {
      id: "activities",
      label: "Experiences",
      type: "multiselect",
      options: [...aPool],
    },
  ];
}

// ─── Flow map ─────────────────────────────────────────────────────────────────
const FLOW_MAP: Record<string, any[]> = {
  wedding: WEDDING_FLOW,
  honeymoon: HONEYMOON_FLOW,
  babymoon: BABYMOON_FLOW,
  anniversary: ANNIVERSARY_FLOW,
  bachelorette: BACHELORETTE_FLOW,
  bachelor: BACHELOR_FLOW,
  proposal: PROPOSAL_FLOW,
  justbecause: JUSTBECAUSE_FLOW,
  solo: SOLO_FLOW,
};

// ══════════════════════════════════════════════════════════════════════════════
// DYNAMIC STEP RESOLVER
// Reads earlier answers and injects contextual fields into _dynamic steps
// ══════════════════════════════════════════════════════════════════════════════
function resolveFlow(id: string, answers: any): any[] {
  return (FLOW_MAP[id] || []).map((step: any) => {
    if (!step._dynamic) return step;
    let fields: any[] = [];
    switch (id) {
      case "honeymoon": {
        const vibes: string[] = answers.basics?.travelStyle || [];
        if (step.id === "accommodation")
          fields = buildHoneymoonAccommodation(vibes);
        if (step.id === "experiences")
          fields = buildHoneymoonExperiences(vibes);
        break;
      }
      case "babymoon": {
        const vibes: string[] = answers.basics?.travelStyle || [];
        if (step.id === "accommodation")
          fields = buildBabymoonAccommodation(vibes);
        if (step.id === "experiences") fields = buildBabymoonExperiences(vibes);
        break;
      }
      case "anniversary": {
        const vibes: string[] = answers.basics?.travelStyle || [];
        if (step.id === "accommodation")
          fields = buildAnniversaryAccommodation(vibes);
        if (step.id === "experiences")
          fields = buildAnniversaryExperiences(vibes);
        break;
      }
      case "bachelorette": {
        const styles: string[] = answers.style?.partyStyle || [];
        if (step.id === "accommodation")
          fields = buildBacheloretteAccommodation(styles);
        if (step.id === "experiences")
          fields = buildBacheloretteExperiences(styles);
        break;
      }
      case "bachelor": {
        const styles: string[] = answers.style?.tripStyle || [];
        if (step.id === "accommodation")
          fields = buildBachelorAccommodation(styles);
        if (step.id === "experiences")
          fields = buildBachelorExperiences(styles);
        break;
      }
      case "justbecause": {
        const vibes: string[] = answers.basics?.travelStyle || [];
        if (step.id === "accommodation")
          fields = buildJustBecauseAccommodation(vibes);
        if (step.id === "experiences")
          fields = buildJustBecauseExperiences(vibes);
        break;
      }
      case "solo": {
        const vibes: string[] = answers.basics?.travelStyle || [];
        if (step.id === "accommodation") fields = buildSoloAccommodation(vibes);
        if (step.id === "experiences") fields = buildSoloExperiences(vibes);
        break;
      }
    }
    return { ...step, fields };
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// WEDDING PLANNER BRANCH
// ══════════════════════════════════════════════════════════════════════════════
const WP_OPTIONS = [
  {
    id: "have",
    label: "I already have a wedding planner",
    desc: "My planner and I will coordinate directly with you on all travel and accommodation.",
  },
  {
    id: "am",
    label: "I am the wedding planner",
    desc: "I'm sourcing travel and accommodation on behalf of my client's destination wedding.",
  },
  {
    id: "find",
    label: "Help me find a wedding planner",
    desc: "I'd love Something Blue Travel's guidance connecting with the right planner for my vision and destination.",
  },
  {
    id: "later",
    label: "I'll find a planner on my own",
    desc: "I'll handle the planning side independently — I need the travel and accommodation expertise.",
  },
];
interface WPAnswers {
  situation?: string;
  details?: Record<string, any>;
}

function WeddingPlannerStep({
  value = {},
  onChange,
}: {
  value?: WPAnswers;
  onChange: (v: WPAnswers) => void;
}) {
  const situation = value.situation || "";
  const details = value.details || {};
  const set = (k: string, v: any) =>
    onChange({ ...value, details: { ...details, [k]: v } });
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        {WP_OPTIONS.map((opt) => {
          const sel = situation === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChange({ situation: opt.id, details: {} })}
              style={{
                border: `1.5px solid ${sel ? B.gold : B.border}`,
                borderRadius: "12px",
                padding: "20px 18px",
                textAlign: "left",
                background: sel ? B.navy : B.white,
                cursor: "pointer",
                transition: "all .22s",
                fontFamily: "inherit",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  color: sel ? B.white : B.navy,
                  fontFamily: OVO,
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {opt.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: sel ? "rgba(234,241,246,.75)" : B.lightText,
                  fontFamily: PETRO,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                {opt.desc}
              </div>
            </button>
          );
        })}
      </div>
      {situation === "have" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <FW
            label="Your planner's name & contact"
            note="We'll coordinate directly with them on all travel logistics."
          >
            <input
              type="text"
              value={details.planner_contact || ""}
              onChange={(e) => set("planner_contact", e.target.value)}
              placeholder="Name, email, or website"
              style={iBase}
            />
          </FW>
          <FW
            label="Anything your planner has asked you to confirm on the travel side?"
            note=""
          >
            <textarea
              value={details.planner_notes || ""}
              onChange={(e) => set("planner_notes", e.target.value)}
              placeholder="Guest arrival windows, preferred hotel block, specific transfer requirements…"
              rows={3}
              style={{ ...iBase, resize: "vertical" as const }}
            />
          </FW>
        </div>
      )}
      {situation === "am" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <FW
            label="Tell us about your client's wedding and what you need from Something Blue Travel"
            note="We work closely with planners as a dedicated travel partner."
          >
            <textarea
              value={details.planner_brief || ""}
              onChange={(e) => set("planner_brief", e.target.value)}
              placeholder="Client vision, guest profile, travel expectations, preferred properties, timeline…"
              rows={6}
              style={{ ...iBase, resize: "vertical" as const }}
            />
          </FW>
          <FW label="Your business name & website" note="">
            <input
              type="text"
              value={details.planner_business || ""}
              onChange={(e) => set("planner_business", e.target.value)}
              placeholder="e.g. Simply Elegant Events — simplyelegant.com"
              style={iBase}
            />
          </FW>
        </div>
      )}
      {situation === "find" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <FW
            label="What level of planning support are you looking for?"
            note="This helps us connect you with the right professional — not just any planner, but yours."
          >
            <MultiSelectWithOther
              field={{
                options: [
                  "Full-service (handles everything)",
                  "Partial planning",
                  "Day-of coordination only",
                  "Destination specialist in our chosen country",
                  "Bilingual planner",
                  "Elopement specialist",
                  "Luxury / high-end specialist",
                ],
              }}
              value={details.planner_type || []}
              onChange={(v: any) => set("planner_type", v)}
            />
          </FW>
          <FW label="Planning aesthetic" note="">
            <MultiSelectWithOther
              field={{
                options: [
                  "Classic & timeless",
                  "Modern & editorial",
                  "Boho & free-spirited",
                  "Garden & botanical",
                  "Opulent & maximalist",
                  "Minimalist & architectural",
                  "Cultural & traditional",
                ],
              }}
              value={details.planner_aesthetic || []}
              onChange={(v: any) => set("planner_aesthetic", v)}
            />
          </FW>
          <FW label="Budget for wedding planning services" note="">
            <select
              value={details.planner_budget || ""}
              onChange={(e) => set("planner_budget", e.target.value)}
              style={{ ...iBase, cursor: "pointer" }}
            >
              <option value="">Select…</option>
              {[
                "Under $3,000",
                "$3,000–$6,000",
                "$6,000–$10,000",
                "$10,000–$20,000",
                "$20,000+",
                "Open to guidance",
              ].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </FW>
          <FW label="Anything else important?" note="">
            <textarea
              value={details.planner_notes || ""}
              onChange={(e) => set("planner_notes", e.target.value)}
              placeholder="Languages, destination experience, personality traits, referrals…"
              rows={3}
              style={{ ...iBase, resize: "vertical" as const }}
            />
          </FW>
        </div>
      )}
      {situation === "later" && (
        <FW
          label="Anything you'd like us to keep in mind?"
          note="Something Blue Travel is always happy to share Virtuoso-vetted planner recommendations if you change your mind."
        >
          <textarea
            value={details.planner_notes || ""}
            onChange={(e) => set("planner_notes", e.target.value)}
            placeholder="Any context about your planning timeline or approach…"
            rows={3}
            style={{ ...iBase, resize: "vertical" as const }}
          />
        </FW>
      )}
    </div>
  );
}

function FW({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: PETRO,
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: ".1em",
          textTransform: "uppercase" as const,
          color: B.navy,
          marginBottom: "6px",
        }}
      >
        {label}
      </div>
      {note && (
        <div
          style={{
            fontFamily: PETRO,
            fontSize: "13px",
            color: B.lightText,
            marginBottom: "8px",
            lineHeight: 1.6,
            fontStyle: "italic",
          }}
        >
          {note}
        </div>
      )}
      {children}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// UI PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════

// MultiSelect with "Other" free-text option
function MultiSelectWithOther({
  field,
  value = [],
  onChange,
}: {
  field: any;
  value?: any[];
  onChange: (v: any[]) => void;
}) {
  const coreVals = value.filter((v: string) => field.options.includes(v));
  const otherVal =
    value.find(
      (v: string) => !field.options.includes(v) && v !== "__other__"
    ) || "";
  const otherSel = value.some((v: string) => !field.options.includes(v));

  const toggleCore = (o: string) => {
    const next = coreVals.includes(o)
      ? coreVals.filter((v: string) => v !== o)
      : [...coreVals, o];
    onChange(otherSel && otherVal ? [...next, otherVal] : next);
  };
  const toggleOther = () => {
    if (otherSel) onChange(coreVals);
    else onChange([...coreVals, "__other__"]);
  };
  const setOtherText = (text: string) => {
    onChange([...coreVals, text]);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: otherSel ? "12px" : "0",
        }}
      >
        {field.options.map((opt: string) => {
          const sel = coreVals.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggleCore(opt)}
              style={{
                border: `1.5px solid ${sel ? B.gold : B.border}`,
                borderRadius: "999px",
                padding: "9px 20px",
                background: sel ? B.navy : B.white,
                color: sel ? B.white : B.navy,
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: PETRO,
                transition: "all .18s",
              }}
            >
              {opt}
            </button>
          );
        })}
        <button
          onClick={toggleOther}
          style={{
            border: `1.5px solid ${otherSel ? B.gold : B.border}`,
            borderRadius: "999px",
            padding: "9px 20px",
            background: otherSel ? B.navy : B.white,
            color: otherSel ? B.white : B.navy,
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: PETRO,
            transition: "all .18s",
            fontStyle: "italic",
          }}
        >
          + Other
        </button>
      </div>
      {otherSel && (
        <input
          type="text"
          value={otherVal === "__other__" ? "" : otherVal}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder="Please describe…"
          autoFocus
          style={{ ...iBase, marginTop: "8px", fontStyle: "italic" }}
        />
      )}
    </div>
  );
}

function PhotoSelect({
  field,
  value = [],
  onChange,
}: {
  field: any;
  value?: any[];
  onChange: (v: any[]) => void;
}) {
  const toggle = (l: string) =>
    onChange(
      value.includes(l) ? value.filter((v: any) => v !== l) : [...value, l]
    );
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
        gap: "10px",
      }}
    >
      {field.options.map((opt: any) => {
        const sel = value.includes(opt.label);
        return (
          <button
            key={opt.label}
            onClick={() => toggle(opt.label)}
            style={{
              border: `1.5px solid ${sel ? B.gold : B.border}`,
              borderRadius: "10px",
              padding: "14px 10px",
              background: sel ? `${B.gold}18` : B.white,
              cursor: "pointer",
              textAlign: "center",
              transition: "all .2s",
              fontFamily: "inherit",
            }}
          >
            <div style={{ fontSize: "22px", marginBottom: "6px" }}>
              {opt.img}
            </div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: B.navy,
                letterSpacing: ".04em",
                textTransform: "uppercase" as const,
                fontFamily: PETRO,
              }}
            >
              {opt.label}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: B.lightText,
                marginTop: "3px",
                fontFamily: PETRO,
              }}
            >
              {opt.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function YesNo({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {["Yes", "No", "Not sure"].map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            border: `1.5px solid ${value === opt ? B.gold : B.border}`,
            borderRadius: "8px",
            padding: "11px 26px",
            background: value === opt ? B.navy : B.white,
            color: value === opt ? B.white : B.navy,
            cursor: "pointer",
            fontSize: "14px",
            fontFamily: PETRO,
            transition: "all .18s",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: any;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === "photoselect")
    return <PhotoSelect field={field} value={value} onChange={onChange} />;
  if (field.type === "multiselect")
    return (
      <MultiSelectWithOther field={field} value={value} onChange={onChange} />
    );
  if (field.type === "yesno")
    return <YesNo value={value} onChange={onChange} />;
  if (field.type === "select")
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...iBase, cursor: "pointer" }}
      >
        <option value="">Select…</option>
        {field.options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  if (field.type === "textarea")
    return (
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={4}
        style={{ ...iBase, resize: "vertical" as const }}
      />
    );
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      style={iBase}
    />
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// EMAIL
// ══════════════════════════════════════════════════════════════════════════════
function buildEmailHTML(
  occasion: string,
  answers: any,
  visibleFlow: any[],
  wpAnswers: WPAnswers
) {
  const occ = OCCASIONS.find((o) => o.id === occasion);
  const ca = answers["contact"] || {};
  const client =
    ca.name || ca.proposerName || ca.plannerName || ca.honoree || "Client";
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const title = `${occ?.label} Package Request — ${client} — ${date}`;
  const row = (label: string, val: any) =>
    `<div style="margin-bottom:12px"><div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#4A6A7A;margin-bottom:2px">${label}</div><div style="font-size:15px;color:#172936">${
      Array.isArray(val) ? val.join(", ") : val
    }</div></div>`;
  let body = "";
  visibleFlow.forEach((step: any) => {
    if (step.id === "wedding_planner") {
      if (!wpAnswers?.situation) return;
      const wp = WP_OPTIONS.find((w) => w.id === wpAnswers.situation);
      body += `<div style="padding:20px 32px;border-bottom:1px solid #EAF1F6"><h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#1470AF;margin:0 0 14px">Wedding Planner</h2>`;
      body += row("Situation", wp?.label || "");
      if (wpAnswers.details)
        (Object.entries(wpAnswers.details) as [string, any][]).forEach(
          ([k, v]) => {
            if (v && !(Array.isArray(v) && !v.length))
              body += row(k.replace(/_/g, " "), v);
          }
        );
      body += `</div>`;
      return;
    }
    const sa = answers[step.id];
    if (!sa) return;
    const has = step.fields.some((f: any) => {
      const v = sa[f.id];
      return v && !(Array.isArray(v) && !v.length);
    });
    if (!has) return;
    body += `<div style="padding:20px 32px;border-bottom:1px solid #EAF1F6"><h2 style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#1470AF;margin:0 0 14px">${step.title}</h2>`;
    step.fields.forEach((f: any) => {
      const v = sa[f.id];
      if (!v || (Array.isArray(v) && !v.length)) return;
      body += row(f.label, v);
    });
    body += `</div>`;
  });
  const html = `<div style="font-family:Georgia,serif;max-width:700px;margin:0 auto;color:#172936;background:#fff"><div style="background:#172936;padding:28px 32px;text-align:center"><img src="${LOGO}" style="height:52px;filter:brightness(0) invert(1)" alt="Something Blue Travel Design"/></div><div style="background:#EAF1F6;padding:20px 32px;border-left:4px solid #1470AF"><h1 style="margin:0 0 4px;font-size:20px;color:#172936">${title}</h1><p style="margin:0;color:#4A6A7A;font-size:13px">Submitted via Something Blue Travel Design Package Builder</p></div>${body}<div style="background:#172936;padding:20px 32px;text-align:center"><p style="color:#EAF1F6;font-size:12px;margin:0">Something Blue Travel Design · alyssa@scottandthomas.com · somethingbluetravel.com</p></div></div>`;
  return { html, title, client };
}

const LOGO_URL =
  "https://images.squarespace-cdn.com/content/691ab065f932843db6b82963/c59e1d21-6aee-477b-9f01-ba8bcaaa7736/Something+Blue+Header+Logo+Dark.png?content-type=image%2Fpng";

// Build the client confirmation email HTML — a polished summary they receive
function buildClientConfirmationHTML(
  occasion: string,
  answers: any,
  visibleFlow: any[],
  wpAnswers: WPAnswers,
  client: string,
  title: string
) {
  const occ = OCCASIONS.find((o) => o.id === occasion);
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const row = (label: string, val: any) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #EAF1F6;vertical-align:top;width:38%">
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#4A6A7A;font-family:Georgia,serif">${label}</span>
      </td>
      <td style="padding:10px 0 10px 16px;border-bottom:1px solid #EAF1F6;vertical-align:top">
        <span style="font-size:14px;color:#172936;font-family:Georgia,serif">${
          Array.isArray(val)
            ? val.filter((v: string) => v && v !== "__other__").join(", ")
            : val
        }</span>
      </td>
    </tr>`;

  let sections = "";
  visibleFlow.forEach((step: any) => {
    if (step.id === "wedding_planner") {
      if (!wpAnswers?.situation) return;
      const wp = WP_OPTIONS.find((w) => w.id === wpAnswers.situation);
      sections += `<div style="margin-bottom:24px"><h3 style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#1470AF;margin:0 0 12px;font-family:Georgia,serif">Wedding Planner</h3><table style="width:100%;border-collapse:collapse">${row(
        "Your situation",
        wp?.label || ""
      )}`;
      if (wpAnswers.details)
        (Object.entries(wpAnswers.details) as [string, any][]).forEach(
          ([k, v]) => {
            if (v && !(Array.isArray(v) && !v.length))
              sections += row(k.replace(/_/g, " "), v);
          }
        );
      sections += `</table></div>`;
      return;
    }
    const sa = answers[step.id];
    if (!sa) return;
    const rows = step.fields
      .map((f: any) => {
        const v = sa[f.id];
        if (!v || (Array.isArray(v) && !v.length)) return "";
        return row(f.label, v);
      })
      .join("");
    if (!rows) return;
    sections += `<div style="margin-bottom:24px"><h3 style="font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#1470AF;margin:0 0 12px;font-family:Georgia,serif">${step.title}</h3><table style="width:100%;border-collapse:collapse">${rows}</table></div>`;
  });

  return `
  <div style="font-family:Georgia,serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #EAF1F6">

    <!-- Header -->
    <div style="background:#172936;padding:32px;text-align:center">
      <img src="${LOGO_URL}" alt="Something Blue Travel Design" style="height:56px"/>
    </div>

    <!-- Greeting -->
    <div style="padding:36px 40px 0">
      <p style="font-size:22px;color:#172936;margin:0 0 12px;font-family:Georgia,serif;font-weight:400">
        Thank you, ${client}.
      </p>
      <p style="font-size:15px;color:#4A6A7A;line-height:1.8;margin:0 0 8px;font-style:italic">
        We've received your <strong style="color:#172936;font-style:normal">${occ?.label}</strong> package request and are so excited to start planning your experience.
      </p>
      <p style="font-size:15px;color:#4A6A7A;line-height:1.8;margin:0">
        Something Blue Travel will be in touch within <strong style="color:#172936">72 hours</strong> with curated recommendations tailored to everything you've shared.
      </p>
    </div>

    <!-- Divider -->
    <div style="padding:28px 40px 0">
      <div style="width:40px;height:1px;background:#B8976A"></div>
    </div>

    <!-- Submission summary -->
    <div style="padding:24px 40px 0">
      <h2 style="font-size:13px;text-transform:uppercase;letter-spacing:.12em;color:#172936;margin:0 0 20px;font-family:Georgia,serif">
        Your submission — ${date}
      </h2>
      ${sections}
    </div>

    <!-- What happens next -->
    <div style="margin:28px 40px;background:#EAF1F6;border-left:3px solid #1470AF;padding:20px 24px;border-radius:4px">
      <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#172936;margin:0 0 10px;font-family:Georgia,serif">What happens next</p>
      <p style="font-size:14px;color:#4A6A7A;line-height:1.8;margin:0;font-family:Georgia,serif">
        A member of the Something Blue Travel team will review your request in full and reach out within <strong style="color:#172936">72 hours</strong>
        with a personalised response, initial recommendations, and any questions. In the meantime, feel free to explore
        <a href="https://www.somethingbluetravel.com" style="color:#1470AF">somethingbluetravel.com</a> or follow us on Instagram.
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#172936;padding:24px 40px;text-align:center">
      <p style="color:#EAF1F6;font-size:12px;margin:0 0 6px;font-family:Georgia,serif;letter-spacing:.04em">
        Something Blue Travel Design &nbsp;·&nbsp; Virtuoso Member
      </p>
      <p style="color:rgba(234,241,246,.6);font-size:11px;margin:0;font-family:Georgia,serif">
        <a href="https://www.somethingbluetravel.com" style="color:rgba(234,241,246,.6)">somethingbluetravel.com</a>
        &nbsp;·&nbsp; alyssa@scottandthomas.com
      </p>
    </div>

  </div>`;
}

async function sendEmail(
  occasion: string,
  answers: any,
  visibleFlow: any[],
  wpAnswers: WPAnswers
) {
  const { html, title, client } = buildEmailHTML(
    occasion,
    answers,
    visibleFlow,
    wpAnswers
  );
  const clientEmail = (answers["contact"] || {}).email || "";
  const occLabel = OCCASIONS.find((o) => o.id === occasion)?.label || occasion;

  // ── Email 1: Full submission to the advisor ──────────────────────────────
  const advisorRes = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_fiuvq29",
        template_id: "template_complete_pkg",
        user_id: "GVFXgJuduEBYKB50f",
        template_params: {
          to_email: "alyssa@scottandthomas.com",
          reply_to: clientEmail,
          subject: title,
          message_html: html,
          client_name: client,
          occasion_type: occLabel,
        },
      }),
    }
  );
  if (!advisorRes.ok) {
    const t = await advisorRes.text();
    throw new Error(`Advisor email failed: ${t}`);
  }

  // ── Email 2: Confirmation summary to the client ──────────────────────────
  if (clientEmail) {
    const confirmHTML = buildClientConfirmationHTML(
      occasion,
      answers,
      visibleFlow,
      wpAnswers,
      client,
      title
    );
    const clientRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_fiuvq29",
          template_id: "template_package",
          user_id: "GVFXgJuduEBYKB50f",
          template_params: {
            to_email: clientEmail,
            reply_to: "alyssa@scottandthomas.com",
            subject: `Your ${occLabel} Request — Something Blue Travel 🩵`,
            message_html: confirmHTML,
            client_name: client,
            occasion_type: occLabel,
          },
        }),
      }
    );
    // Don't throw if client email fails — advisor email already succeeded
    if (!clientRes.ok)
      console.warn("Client confirmation email failed:", await clientRes.text());
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// SUMMARY
// ══════════════════════════════════════════════════════════════════════════════
function SummaryView({
  occasion,
  answers,
  wpAnswers,
  visibleFlow,
  onRestart,
  onBack,
}: {
  occasion: string;
  answers: any;
  wpAnswers: WPAnswers;
  visibleFlow: any[];
  onRestart: () => void;
  onBack: () => void;
}) {
  const [status, setStatus] = useState("idle");
  const submit = async () => {
    setStatus("sending");
    try {
      await sendEmail(occasion, answers, visibleFlow, wpAnswers);
      setStatus("sent");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  };
  return (
    <div
      style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 24px 60px" }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <a
          href="https://www.somethingbluetravel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={LOGO}
            alt="Something Blue Travel Design"
            style={{ height: "56px", marginBottom: "22px" }}
          />
        </a>
        <div
          style={{
            width: "32px",
            height: "1px",
            background: B.gold,
            margin: "0 auto 18px",
          }}
        />
        <h2
          style={{
            fontFamily: OVO,
            fontSize: "28px",
            color: B.navy,
            margin: "0 0 8px",
            fontWeight: "400",
          }}
        >
          Review Your Request
        </h2>
        <p
          style={{
            color: B.lightText,
            fontFamily: PETRO,
            fontSize: "15px",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Everything looks right? Submit below. Need to edit something? Use the
          back button.
        </p>
      </div>
      {visibleFlow.map((step: any) => {
        if (step.id === "wedding_planner") {
          if (!wpAnswers?.situation) return null;
          const wp = WP_OPTIONS.find((w) => w.id === wpAnswers.situation);
          return (
            <div
              key="wp"
              style={{
                background: B.white,
                borderRadius: "14px",
                padding: "24px",
                marginBottom: "14px",
                border: `1px solid ${B.border}`,
              }}
            >
              <h3
                style={{
                  fontFamily: OVO,
                  fontSize: "17px",
                  color: B.navy,
                  margin: "0 0 14px",
                  fontWeight: "400",
                }}
              >
                Wedding Planner
              </h3>
              <div style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: ".07em",
                    color: B.blue,
                    marginBottom: "2px",
                    fontFamily: PETRO,
                  }}
                >
                  Situation
                </div>
                <div
                  style={{ fontSize: "15px", color: B.navy, fontFamily: PETRO }}
                >
                  {wp?.label}
                </div>
              </div>
              {wpAnswers.details &&
                (Object.entries(wpAnswers.details) as [string, any][]).map(
                  ([k, v]) => {
                    if (!v || (Array.isArray(v) && !v.length)) return null;
                    return (
                      <div key={k} style={{ marginBottom: "10px" }}>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: ".07em",
                            color: B.blue,
                            marginBottom: "2px",
                            fontFamily: PETRO,
                          }}
                        >
                          {k.replace(/_/g, " ")}
                        </div>
                        <div
                          style={{
                            fontSize: "15px",
                            color: B.navy,
                            fontFamily: PETRO,
                          }}
                        >
                          {Array.isArray(v) ? v.join(", ") : v}
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          );
        }
        const sa = answers[step.id];
        if (!sa) return null;
        return (
          <div
            key={step.id}
            style={{
              background: B.white,
              borderRadius: "14px",
              padding: "24px",
              marginBottom: "14px",
              border: `1px solid ${B.border}`,
            }}
          >
            <h3
              style={{
                fontFamily: OVO,
                fontSize: "17px",
                color: B.navy,
                margin: "0 0 14px",
                fontWeight: "400",
              }}
            >
              {step.title}
            </h3>
            {step.fields.map((f: any) => {
              const v = sa[f.id];
              if (!v || (Array.isArray(v) && !v.length)) return null;
              return (
                <div key={f.id} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: ".07em",
                      color: B.blue,
                      marginBottom: "2px",
                      fontFamily: PETRO,
                    }}
                  >
                    {f.label}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: B.navy,
                      fontFamily: PETRO,
                    }}
                  >
                    {Array.isArray(v) ? v.join(", ") : v}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div
        style={{
          background: B.navy,
          borderRadius: "16px",
          padding: "36px",
          textAlign: "center",
          marginTop: "28px",
        }}
      >
        {status === "sent" ? (
          <>
            <div style={{ fontSize: "28px", marginBottom: "10px" }}>✓</div>
            <p
              style={{
                color: B.lightBlue,
                fontFamily: OVO,
                fontSize: "22px",
                margin: "0 0 8px",
                fontWeight: "400",
              }}
            >
              Request Sent
            </p>
            <p
              style={{
                color: "rgba(234,241,246,.7)",
                fontFamily: PETRO,
                fontSize: "15px",
                margin: "0 0 6px",
              }}
            >
              Something Blue Travel will be in touch within 72 hours.
            </p>
            <p
              style={{
                color: "rgba(234,241,246,.55)",
                fontFamily: PETRO,
                fontSize: "14px",
                margin: "0 0 24px",
                fontStyle: "italic",
              }}
            >
              A confirmation summary has been sent to your email address.
            </p>
            <a
              href="https://www.somethingbluetravel.com/contact"
              style={{
                display: "inline-block",
                background: B.gold,
                color: B.white,
                padding: "14px 32px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "13px",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontFamily: PETRO,
              }}
            >
              Book a Consultation →
            </a>
          </>
        ) : status === "error" ? (
          <>
            <p
              style={{
                color: "#ffaaaa",
                fontFamily: PETRO,
                fontSize: "15px",
                margin: "0 0 16px",
              }}
            >
              Something went wrong. Please reach out directly at
              alyssa@scottandthomas.com.
            </p>
            <button
              onClick={submit}
              style={{
                background: B.blue,
                border: "none",
                borderRadius: "999px",
                padding: "13px 28px",
                cursor: "pointer",
                color: B.white,
                fontFamily: PETRO,
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                color: B.lightBlue,
                fontFamily: OVO,
                fontSize: "21px",
                margin: "0 0 8px",
                fontWeight: "400",
              }}
            >
              Ready to send your request?
            </p>
            <p
              style={{
                color: "rgba(234,241,246,.6)",
                fontFamily: PETRO,
                fontSize: "14px",
                margin: "0 0 24px",
                fontStyle: "italic",
              }}
            >
              You will receive a confirmation summary by email. Something Blue
              Travel will follow up within 72 hours.
            </p>
            <button
              onClick={submit}
              disabled={status === "sending"}
              style={{
                background: status === "sending" ? "#444" : B.gold,
                border: "none",
                padding: "14px 36px",
                borderRadius: "999px",
                cursor: status === "sending" ? "default" : "pointer",
                color: B.white,
                fontWeight: "600",
                fontSize: "13px",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                fontFamily: PETRO,
              }}
            >
              {status === "sending" ? "Sending…" : "Send My Package Request"}
            </button>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: `1px solid ${B.border}`,
            borderRadius: "999px",
            padding: "11px 28px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: PETRO,
            color: B.navy,
            letterSpacing: ".04em",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onRestart}
          style={{
            background: "none",
            border: "none",
            color: B.lightText,
            cursor: "pointer",
            fontSize: "13px",
            textDecoration: "underline",
            fontFamily: PETRO,
          }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function SomethingBlueQuiz() {
  const [screen, setScreen] = useState("landing");
  const [occasion, setOccasion] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [wpAnswers, setWpAnswers] = useState<WPAnswers>({});

  const resolvedFlow = occasion ? resolveFlow(occasion, answers) : [];
  const showWeddingExtras =
    occasion === "wedding" &&
    (wpAnswers.situation === "find" || wpAnswers.situation === "later");
  const visibleFlow = resolvedFlow.filter(
    (s: any) =>
      !s._conditional || (s.id === "wedding_extras" && showWeddingExtras)
  );

  const step = visibleFlow[stepIndex];
  const occ = OCCASIONS.find((o) => o.id === occasion);
  const prog = visibleFlow.length
    ? ((stepIndex + 1) / visibleFlow.length) * 100
    : 0;
  const isWP = step?.id === "wedding_planner";

  const setAns = (sid: string, fid: string, v: any) =>
    setAnswers((p: any) => ({ ...p, [sid]: { ...(p[sid] || {}), [fid]: v } }));
  const next = () =>
    stepIndex < visibleFlow.length - 1
      ? setStepIndex((s) => s + 1)
      : setScreen("summary");
  const back = () => {
    if (stepIndex > 0) {
      setStepIndex((s) => s - 1);
    } else {
      setScreen("landing");
      setOccasion(null);
      setStepIndex(0);
      setAnswers({});
      setWpAnswers({});
    }
  };
  const restart = () => {
    setScreen("landing");
    setOccasion(null);
    setStepIndex(0);
    setAnswers({});
    setWpAnswers({});
  };

  useEffect(() => {
    window.parent.postMessage({ height: document.body.scrollHeight + 40 }, "*");
  }, [stepIndex, screen]);

  const FONTS = (
    <link
      href="https://fonts.googleapis.com/css2?family=Ovo&family=Petrona:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
      rel="stylesheet"
    />
  );

  // LANDING
  if (screen === "landing")
    return (
      <div style={{ minHeight: "100vh", background: B.cream, fontFamily: OVO }}>
        {FONTS}
        <div style={{ padding: "52px 28px 0", textAlign: "center" }}>
          <a
            href="https://www.somethingbluetravel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LOGO}
              alt="Something Blue Travel Design"
              style={{ height: "68px", marginBottom: "30px" }}
            />
          </a>
          <div
            style={{
              width: "36px",
              height: "1px",
              background: B.gold,
              margin: "0 auto 22px",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(26px,4vw,42px)",
              color: B.navy,
              margin: "0 0 16px",
              fontWeight: "400",
              lineHeight: 1.3,
              fontFamily: OVO,
            }}
          >
            Design Your <em>Bespoke</em> Travel Experience
          </h1>
          <p
            style={{
              color: B.lightText,
              fontFamily: PETRO,
              fontSize: "16px",
              maxWidth: "440px",
              margin: "0 auto 12px",
              lineHeight: 1.85,
              fontStyle: "italic",
            }}
          >
            Select your occasion below. We'll guide you through a curated set of
            questions to craft an experience worthy of your milestone.
          </p>
          <div
            style={{
              fontSize: "11px",
              fontFamily: PETRO,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: B.gold,
              marginBottom: "48px",
            }}
          >
            Virtuoso Travel Advisor
          </div>
        </div>
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            padding: "0 24px 64px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: "18px",
          }}
        >
          {OCCASIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => {
                setOccasion(o.id);
                setScreen("quiz");
                setStepIndex(0);
                setAnswers({});
                setWpAnswers({});
              }}
              style={{
                border: `1px solid ${B.border}`,
                borderRadius: "16px",
                padding: "34px 26px",
                background: B.white,
                cursor: "pointer",
                textAlign: "center",
                transition: "all .28s",
                fontFamily: "inherit",
                boxShadow: "0 2px 16px rgba(20,112,175,.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 40px rgba(20,112,175,.13)";
                e.currentTarget.style.borderColor = B.gold;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 2px 16px rgba(20,112,175,.05)";
                e.currentTarget.style.borderColor = B.border;
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: B.gold,
                  margin: "0 auto 18px",
                }}
              />
              <div
                style={{
                  fontSize: "21px",
                  fontWeight: "400",
                  color: B.navy,
                  marginBottom: "10px",
                  fontFamily: OVO,
                  lineHeight: 1.25,
                }}
              >
                {o.label}
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontFamily: PETRO,
                  color: B.lightText,
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                {o.tagline}
              </div>
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", paddingBottom: "52px" }}>
          <div
            style={{
              width: "28px",
              height: "1px",
              background: B.border,
              margin: "0 auto 18px",
            }}
          />
          <p
            style={{
              fontFamily: PETRO,
              fontSize: "13px",
              color: B.lightText,
              margin: "0 auto",
              lineHeight: 1.85,
              maxWidth: "380px",
              fontStyle: "italic",
            }}
          >
            As a <strong>Virtuoso</strong> member, Something Blue Travel secures
            exclusive rates, VIP amenities, and preferred status that no public
            booking platform can match.
          </p>
        </div>
      </div>
    );

  // SUMMARY
  if (screen === "summary")
    return (
      <div style={{ minHeight: "100vh", background: B.cream, fontFamily: OVO }}>
        {FONTS}
        <SummaryView
          occasion={occasion!}
          answers={answers}
          wpAnswers={wpAnswers}
          visibleFlow={visibleFlow}
          onRestart={restart}
          onBack={() => {
            setScreen("quiz");
            setStepIndex(visibleFlow.length - 1);
          }}
        />
      </div>
    );

  // QUIZ
  if (!step || !occ) return null;
  const sa = answers[step.id] || {};

  return (
    <div style={{ minHeight: "100vh", background: B.cream, fontFamily: OVO }}>
      {FONTS}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 36px",
          borderBottom: `1px solid ${B.border}`,
          background: B.cream,
        }}
      >
        <a
          href="https://www.somethingbluetravel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={LOGO}
            alt="Something Blue Travel Design"
            style={{ height: "40px" }}
          />
        </a>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "11px",
              fontFamily: PETRO,
              letterSpacing: ".14em",
              color: B.blue,
              textTransform: "uppercase",
              marginBottom: "3px",
            }}
          >
            {occ.label}
          </div>
          <div
            style={{ fontSize: "11px", fontFamily: PETRO, color: B.lightText }}
          >
            Step {stepIndex + 1} of {visibleFlow.length}
          </div>
        </div>
      </div>
      <div style={{ height: "2px", background: `${B.gold}20` }}>
        <div
          style={{
            height: "100%",
            width: `${prog}%`,
            background: B.gold,
            transition: "width .4s ease",
          }}
        />
      </div>
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "48px 28px 150px",
        }}
      >
        <div style={{ marginBottom: "36px" }}>
          <div
            style={{
              width: "26px",
              height: "1px",
              background: B.gold,
              marginBottom: "18px",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(22px,3.5vw,32px)",
              color: B.navy,
              fontWeight: "400",
              margin: "0 0 10px",
              fontFamily: OVO,
              lineHeight: 1.3,
            }}
          >
            {step.title}
          </h2>
          {step.subtitle && (
            <p
              style={{
                color: B.lightText,
                fontFamily: PETRO,
                fontSize: "15px",
                margin: 0,
                lineHeight: 1.85,
                fontStyle: "italic",
              }}
            >
              {step.subtitle}
            </p>
          )}
        </div>
        {isWP ? (
          <WeddingPlannerStep value={wpAnswers} onChange={setWpAnswers} />
        ) : (
          step.fields.map((field: any) => (
            <div key={field.id} style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: PETRO,
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: ".1em",
                  textTransform: "uppercase" as const,
                  color: B.navy,
                  marginBottom: "12px",
                }}
              >
                {field.label}
              </label>
              <Field
                field={field}
                value={sa[field.id]}
                onChange={(v: any) => setAns(step.id, field.id, v)}
              />
            </div>
          ))
        )}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: B.white,
          borderTop: `1px solid ${B.border}`,
          padding: "18px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 -4px 24px rgba(23,41,54,.07)",
        }}
      >
        <button
          onClick={back}
          style={{
            background: "none",
            border: `1px solid ${B.border}`,
            borderRadius: "999px",
            padding: "11px 28px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: PETRO,
            color: B.navy,
            letterSpacing: ".04em",
          }}
        >
          ← Back
        </button>
        <div
          style={{
            fontFamily: PETRO,
            fontSize: "12px",
            color: B.lightText,
            letterSpacing: ".06em",
          }}
        >
          {stepIndex + 1} / {visibleFlow.length}
        </div>
        <button
          onClick={next}
          style={{
            background: B.navy,
            border: "none",
            borderRadius: "999px",
            padding: "12px 32px",
            cursor: "pointer",
            fontSize: "13px",
            fontFamily: PETRO,
            color: B.white,
            fontWeight: "600",
            letterSpacing: ".08em",
            textTransform: "uppercase" as const,
          }}
        >
          {stepIndex === visibleFlow.length - 1
            ? "Review & Submit"
            : "Continue"}
        </button>
      </div>
    </div>
  );
}
