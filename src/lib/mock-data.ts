/**
 * PLACEHOLDER CONTENT
 * ---------------------------------------------------------------------------
 * Everything in this file is sample data standing in for real Nihol content.
 * Replace with real farm brands, products, testimonials, and company figures
 * (and move it into Supabase — see src/lib/data.ts) before launch.
 */
import type { Farm, Product, Testimonial, FaqItem } from "./types";

export const farms: Farm[] = [
  {
    id: "farm-1",
    slug: "green-valley-nursery",
    name: "Green Valley Nursery",
    tagline: "Ornamental trees & shade trees grown with care since 2011",
    description:
      "Green Valley Nursery specializes in decorative and shade trees, grown across 12 hectares in the Tashkent region. Every tree is hand-selected and inspected before it reaches your door.",
    location: "Tashkent Region",
    founded: 2011,
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    accentColor: "primary",
  },
  {
    id: "farm-2",
    slug: "tashkent-flower-co",
    name: "Tashkent Flower Co.",
    tagline: "Fresh-cut and potted flowers, delivered same week",
    description:
      "A family-run flower farm supplying roses, tulips, and seasonal blooms to households and event planners across the city.",
    location: "Tashkent",
    founded: 2016,
    rating: 4.9,
    reviewCount: 356,
    featured: true,
    accentColor: "accent",
  },
  {
    id: "farm-3",
    slug: "oasis-fruit-trees",
    name: "Oasis Fruit Trees",
    tagline: "Apple, apricot & pomegranate saplings for home orchards",
    description:
      "Oasis Fruit Trees grows grafted, disease-resistant fruit saplings suited to local soil and climate, with planting guidance included on every order.",
    location: "Samarkand Region",
    founded: 2008,
    rating: 4.7,
    reviewCount: 189,
    featured: true,
    accentColor: "primary",
  },
  {
    id: "farm-4",
    slug: "greenhouse-collective",
    name: "Greenhouse Collective",
    tagline: "Indoor plants, succulents & greenery for every home",
    description:
      "A cooperative of small growers focused on low-maintenance indoor plants — from monstera to succulents — with care guides for every listing.",
    location: "Fergana Valley",
    founded: 2019,
    rating: 4.6,
    reviewCount: 132,
    featured: false,
    accentColor: "accent",
  },
];

export const products: Product[] = [
  // Green Valley Nursery — decorative trees
  {
    id: "p-1",
    slug: "ornamental-maple",
    name: "Ornamental Japanese Maple",
    farmId: "farm-1",
    category: "decorative-trees",
    price: 320000,
    description:
      "A compact, richly colored maple ideal for garden focal points. Ships as a healthy 1.5m sapling ready for transplant.",
    careInstructions: "Partial shade, well-drained soil, water 2–3x weekly in first season.",
    inStock: true,
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: "p-2",
    slug: "shade-plane-tree",
    name: "Shade Plane Tree",
    farmId: "farm-1",
    category: "decorative-trees",
    price: 410000,
    description: "Fast-growing shade tree, popular for courtyards and street-side planting.",
    careInstructions: "Full sun, deep watering weekly, prune in dormant season.",
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    id: "p-3",
    slug: "boxwood-hedge-set",
    name: "Boxwood Hedge Set (5 plants)",
    farmId: "farm-1",
    category: "decorative-trees",
    price: 275000,
    description: "Five evergreen boxwood shrubs, perfect for shaping into a low garden hedge.",
    careInstructions: "Full to partial sun, trim twice yearly to maintain shape.",
    inStock: true,
    rating: 4.9,
    reviewCount: 63,
  },

  // Tashkent Flower Co. — flowers
  {
    id: "p-4",
    slug: "garden-rose-bundle",
    name: "Garden Rose Bundle (12 stems)",
    farmId: "farm-2",
    category: "flowers",
    price: 145000,
    description: "A dozen freshly cut roses in mixed seasonal colors, harvested to order.",
    careInstructions: "Trim stems, change vase water every 2 days, keep away from direct heat.",
    inStock: true,
    rating: 4.9,
    reviewCount: 198,
  },
  {
    id: "p-5",
    slug: "potted-tulip-set",
    name: "Potted Tulip Set (6 pots)",
    farmId: "farm-2",
    category: "flowers",
    price: 98000,
    description: "Six potted tulips in assorted colors, ready to display indoors or on a patio.",
    careInstructions: "Bright indirect light, water when topsoil is dry.",
    inStock: true,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "p-6",
    slug: "sunflower-bunch",
    name: "Sunflower Bunch (8 stems)",
    farmId: "farm-2",
    category: "flowers",
    price: 76000,
    description: "Bright, oversized sunflowers cut fresh from the field.",
    careInstructions: "Full sun display, trim stems on arrival, refresh water daily.",
    inStock: true,
    rating: 4.7,
    reviewCount: 54,
  },

  // Oasis Fruit Trees — fruit trees
  {
    id: "p-7",
    slug: "apple-sapling-grafted",
    name: "Grafted Apple Sapling",
    farmId: "farm-3",
    category: "fruit-trees",
    price: 185000,
    description: "A 2-year-old grafted apple sapling, disease-resistant and bred for local climate.",
    careInstructions: "Full sun, stake for first year, water deeply once weekly.",
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
  },
  {
    id: "p-8",
    slug: "apricot-sapling",
    name: "Apricot Sapling",
    farmId: "farm-3",
    category: "fruit-trees",
    price: 165000,
    description: "Hardy apricot sapling, well-suited to the region's growing conditions.",
    careInstructions: "Full sun, well-drained soil, prune annually after fruiting.",
    inStock: true,
    rating: 4.6,
    reviewCount: 39,
  },
  {
    id: "p-9",
    slug: "pomegranate-sapling",
    name: "Pomegranate Sapling",
    farmId: "farm-3",
    category: "fruit-trees",
    price: 172000,
    description: "Drought-tolerant pomegranate sapling, bears fruit within 3–4 years.",
    careInstructions: "Full sun, moderate watering, tolerant of poor soils once established.",
    inStock: false,
    rating: 4.9,
    reviewCount: 52,
  },

  // Greenhouse Collective — indoor & supplies
  {
    id: "p-10",
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    farmId: "farm-4",
    category: "indoor-plants",
    price: 210000,
    description: "A mature Monstera with well-established fenestrated leaves, in a nursery pot.",
    careInstructions: "Bright indirect light, water when top 5cm of soil is dry.",
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: "p-11",
    slug: "succulent-trio",
    name: "Succulent Trio Set",
    farmId: "farm-4",
    category: "indoor-plants",
    price: 68000,
    description: "Three low-maintenance succulents in ceramic pots — great for desks and shelves.",
    careInstructions: "Bright light, water sparingly every 2–3 weeks.",
    inStock: true,
    rating: 4.7,
    reviewCount: 94,
  },
  {
    id: "p-12",
    slug: "ceramic-planter-set",
    name: "Ceramic Planter Set (3 sizes)",
    farmId: "farm-4",
    category: "supplies",
    price: 89000,
    description: "A stackable set of three glazed ceramic planters with drainage holes.",
    careInstructions: "Hand wash; not dishwasher safe.",
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
  },
  {
    id: "p-13",
    slug: "organic-potting-soil",
    name: "Organic Potting Soil (20L)",
    farmId: "farm-4",
    category: "supplies",
    price: 42000,
    description: "Peat-free organic potting mix suited to indoor plants and container gardening.",
    careInstructions: "Store in a cool, dry place.",
    inStock: true,
    rating: 4.6,
    reviewCount: 61,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Aziz Karimov",
    role: "Paulownia Investor since 2019",
    quote:
      "I planted 10 trees as a long-term project for my children. The quarterly updates and photos make it easy to trust the process even though harvest is still years away.",
    treesOwned: 10,
  },
  {
    id: "t-2",
    name: "Dilnoza Yusupova",
    role: "Paulownia Investor since 2021",
    quote:
      "What convinced me was the transparency — Nihol was upfront that returns aren't guaranteed. The care documentation has been consistent every quarter.",
    treesOwned: 3,
  },
  {
    id: "t-3",
    name: "Rustam Tashkentov",
    role: "Marketplace customer",
    quote:
      "Ordered fruit saplings from Oasis Fruit Trees through Nihol — arrived healthy and well-packaged, with clear planting instructions.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What exactly am I purchasing for 499,000 SOM?",
    answer:
      "One 2–3 year old, disease-free Paulownia seedling, professional planting, and 8 years of complete tree care — monitoring, irrigation setup, fertilization, pruning, disease prevention, soil management, and quarterly agronomist visits — plus harvest coordination and timber transport to the buyer in Year 8.",
  },
  {
    question: "Is the return guaranteed?",
    answer:
      "No. Expected selling prices of $200–$600 USD per tree are estimates based on current global timber markets, not guarantees. Actual returns depend on market conditions, tree health, and harvest timing. Paulownia farming carries agricultural risk, including weather, pests, and disease.",
  },
  {
    question: "Can I plant the tree on my own land?",
    answer:
      "Yes. You can choose to have your seedling planted on your own land or on Nihol's partner farm, where it will still receive the full 8 years of professional care.",
  },
  {
    question: "When can I expect to harvest?",
    answer:
      "Paulownia is typically ready for harvest between 5 and 8 years, with 8 years generally yielding premium pricing due to greater trunk diameter and timber quality.",
  },
  {
    question: "How is my tree's progress tracked?",
    answer:
      "You receive ongoing documentation — photos, health records, and growth tracking — along with quarterly oversight visits from our agronomists.",
  },
  {
    question: "What happens at harvest time?",
    answer:
      "Nihol coordinates the harvest in Year 8 (or earlier, if you choose) and includes transportation of the timber to the buyer as part of your original package.",
  },
];

export const supportFaqs: FaqItem[] = [
  {
    question: "How long does marketplace delivery take?",
    answer:
      "Delivery times vary by farm and location, typically 2–7 business days. Exact estimates are shown at checkout once a payment provider and shipping partners are integrated.",
  },
  {
    question: "Can I return a plant if it arrives damaged?",
    answer:
      "Yes — contact us within 48 hours of delivery with photos and we'll coordinate a replacement or refund with the farm brand.",
  },
  {
    question: "How do I track my Paulownia tree's progress?",
    answer:
      "Investors receive periodic photo and health-record updates. A self-serve tracking dashboard is planned for a future release.",
  },
  {
    question: "How can my farm brand join the marketplace?",
    answer:
      "Use the \"Sell Your Products Here\" form on the Marketplace page or contact us directly — our team reviews every farm before onboarding.",
  },
];

export const trustStats = {
  yearsInBusiness: 8,
  treesPlanted: 24600,
  customers: 3150,
  farmPartners: 42,
};
