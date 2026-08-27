/**
 * PLACEHOLDER CONTENT
 * ---------------------------------------------------------------------------
 * Everything in this file is sample data standing in for real Nihol content.
 * Replace with real farm brands, products, testimonials, and company figures
 * (and move it into Supabase — see src/lib/data.ts) before launch.
 *
 * Translatable fields are `Localized` (one string per locale). Use
 * `localizeFarm` / `localizeProduct` / `localizeTestimonial` / `localizeFaq`
 * to resolve a raw record down to the flat, locale-specific shape the rest
 * of the app consumes.
 */
import type { Locale } from "@/i18n/config";
import type {
  Farm,
  Product,
  Testimonial,
  FaqItem,
  RawFarm,
  RawProduct,
  RawTestimonial,
  RawFaqItem,
  TreePackage,
  RawTreePackage,
  Tree,
  TreeCareLogEntry,
  Order,
  ProductReview,
} from "./types";

export function localizeFarm(f: RawFarm, locale: Locale): Farm {
  return {
    ...f,
    name: f.name[locale],
    tagline: f.tagline[locale],
    description: f.description[locale],
    location: f.location[locale],
  };
}

export function localizeProduct(p: RawProduct, locale: Locale): Product {
  return {
    ...p,
    name: p.name[locale],
    description: p.description[locale],
    careInstructions: p.careInstructions[locale],
  };
}

export function localizeTestimonial(t: RawTestimonial, locale: Locale): Testimonial {
  return { ...t, role: t.role[locale], quote: t.quote[locale] };
}

export function localizeFaq(f: RawFaqItem, locale: Locale): FaqItem {
  return { question: f.question[locale], answer: f.answer[locale] };
}

export function localizeTreePackage(p: RawTreePackage, locale: Locale): TreePackage {
  return { ...p, name: p.name[locale], tag: p.tag[locale], blurb: p.blurb[locale] };
}

export const farms: RawFarm[] = [
  {
    id: "farm-1",
    slug: "green-valley-nursery",
    name: {
      en: "Green Valley Nursery",
      ru: "Питомник «Зелёная долина»",
      uz: "«Yashil vodiy» ko'chatzori",
    },
    tagline: {
      en: "Ornamental trees & shade trees grown with care since 2011",
      ru: "Декоративные и тенистые деревья с заботой выращиваются с 2011 года",
      uz: "2011 yildan beri g'amxo'rlik bilan yetishtirilgan manzarali va soyabon daraxtlar",
    },
    description: {
      en: "Green Valley Nursery specializes in decorative and shade trees, grown across 12 hectares in the Tashkent region. Every tree is hand-selected and inspected before it reaches your door.",
      ru: "Питомник «Зелёная долина» специализируется на декоративных и тенистых деревьях, выращиваемых на 12 гектарах в Ташкентской области. Каждое дерево отбирается вручную и проверяется перед доставкой.",
      uz: "«Yashil vodiy» ko'chatzori Toshkent viloyatidagi 12 gektar maydonda yetishtiriladigan dekorativ va soyabon daraxtlarga ixtisoslashgan. Har bir daraxt qo'lda tanlanadi va yetkazib berilishdan oldin tekshiriladi.",
    },
    location: { en: "Tashkent Region", ru: "Ташкентская область", uz: "Toshkent viloyati" },
    founded: 2011,
    rating: 4.8,
    reviewCount: 214,
    featured: true,
    accentColor: "primary",
  },
  {
    id: "farm-2",
    slug: "tashkent-flower-co",
    name: {
      en: "Tashkent Flower Co.",
      ru: "«Ташкент Флауэр Ко.»",
      uz: "«Tashkent Flower Co.»",
    },
    tagline: {
      en: "Fresh-cut and potted flowers, delivered same week",
      ru: "Свежесрезанные и горшечные цветы с доставкой в течение недели",
      uz: "Kesilgan va tuvakdagi gullar, o'sha hafta ichida yetkazib beriladi",
    },
    description: {
      en: "A family-run flower farm supplying roses, tulips, and seasonal blooms to households and event planners across the city.",
      ru: "Семейная цветочная ферма, поставляющая розы, тюльпаны и сезонные цветы домохозяйствам и организаторам мероприятий по всему городу.",
      uz: "Shahar bo'ylab uy xo'jaliklari va tadbir tashkilotchilariga atirgul, lola va mavsumiy gullarni yetkazib beruvchi oilaviy gul fermasi.",
    },
    location: { en: "Tashkent", ru: "Ташкент", uz: "Toshkent" },
    founded: 2016,
    rating: 4.9,
    reviewCount: 356,
    featured: true,
    accentColor: "accent",
  },
  {
    id: "farm-3",
    slug: "oasis-fruit-trees",
    name: {
      en: "Oasis Fruit Trees",
      ru: "«Оазис» плодовые деревья",
      uz: "«Oasis» meva daraxtlari",
    },
    tagline: {
      en: "Apple, apricot & pomegranate saplings for home orchards",
      ru: "Саженцы яблони, абрикоса и граната для домашних садов",
      uz: "Uy bog'lari uchun olma, o'rik va anor ko'chatlari",
    },
    description: {
      en: "Oasis Fruit Trees grows grafted, disease-resistant fruit saplings suited to local soil and climate, with planting guidance included on every order.",
      ru: "«Оазис» выращивает привитые, устойчивые к болезням плодовые саженцы, подходящие для местной почвы и климата, с инструкциями по посадке к каждому заказу.",
      uz: "«Oasis» mahalliy tuproq va iqlimga mos, payvandlangan, kasalliklarga chidamli meva ko'chatlarini yetishtiradi; har bir buyurtmaga ekish bo'yicha ko'rsatma qo'shiladi.",
    },
    location: { en: "Samarkand Region", ru: "Самаркандская область", uz: "Samarqand viloyati" },
    founded: 2008,
    rating: 4.7,
    reviewCount: 189,
    featured: true,
    accentColor: "primary",
  },
  {
    id: "farm-4",
    slug: "greenhouse-collective",
    name: {
      en: "Greenhouse Collective",
      ru: "«Гринхаус Коллектив»",
      uz: "«Greenhouse Collective»",
    },
    tagline: {
      en: "Indoor plants, succulents & greenery for every home",
      ru: "Комнатные растения, суккуленты и зелень для любого дома",
      uz: "Har bir uy uchun xonaki o'simliklar, sukkulentlar va yashilliklar",
    },
    description: {
      en: "A cooperative of small growers focused on low-maintenance indoor plants — from monstera to succulents — with care guides for every listing.",
      ru: "Кооператив небольших производителей, специализирующихся на неприхотливых комнатных растениях — от монстеры до суккулентов — с инструкциями по уходу для каждого товара.",
      uz: "Monsteradan tortib sukkulentlargacha, parvarishi oson xonaki o'simliklarga ixtisoslashgan mayda yetishtiruvchilar kooperativi — har bir mahsulot uchun parvarish qo'llanmasi bilan.",
    },
    location: { en: "Fergana Valley", ru: "Ферганская долина", uz: "Farg'ona vodiysi" },
    founded: 2019,
    rating: 4.6,
    reviewCount: 132,
    featured: false,
    accentColor: "accent",
  },
];

export const products: RawProduct[] = [
  // Green Valley Nursery — decorative trees
  {
    id: "p-1",
    slug: "ornamental-maple",
    name: {
      en: "Ornamental Japanese Maple",
      ru: "Декоративный японский клён",
      uz: "Manzarali yapon zarangi",
    },
    farmId: "farm-1",
    category: "decorative-trees",
    price: 320000,
    description: {
      en: "A compact, richly colored maple ideal for garden focal points. Ships as a healthy 1.5m sapling ready for transplant.",
      ru: "Компактный, ярко окрашенный клён, идеальный для акцентных точек сада. Поставляется как здоровый саженец высотой 1,5 м, готовый к пересадке.",
      uz: "Bog' uchun ajoyib urg'u nuqtasi bo'ladigan ixcham, yorqin rangli zarang. Ko'chirishga tayyor, 1,5 m bo'yli sog'lom ko'chat sifatida yetkaziladi.",
    },
    careInstructions: {
      en: "Partial shade, well-drained soil, water 2–3x weekly in first season.",
      ru: "Полутень, хорошо дренированная почва, полив 2–3 раза в неделю в первый сезон.",
      uz: "Yarim soya, yaxshi drenajlangan tuproq, birinchi mavsumda haftasiga 2–3 marta sug'oring.",
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 41,
  },
  {
    id: "p-2",
    slug: "shade-plane-tree",
    name: { en: "Shade Plane Tree", ru: "Тенистый платан", uz: "Soyabon chinor" },
    farmId: "farm-1",
    category: "decorative-trees",
    price: 410000,
    description: {
      en: "Fast-growing shade tree, popular for courtyards and street-side planting.",
      ru: "Быстрорастущее тенистое дерево, популярное для дворов и уличных посадок.",
      uz: "Hovlilar va ko'cha bo'ylab ekish uchun mashhur, tez o'suvchi soyabon daraxt.",
    },
    careInstructions: {
      en: "Full sun, deep watering weekly, prune in dormant season.",
      ru: "Полное солнце, глубокий полив еженедельно, обрезка в период покоя.",
      uz: "To'liq quyosh, haftasiga chuqur sug'orish, tinim davrida budang.",
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 28,
  },
  {
    id: "p-3",
    slug: "boxwood-hedge-set",
    name: { en: "Boxwood Hedge Set (5 plants)", ru: "Набор самшита для живой изгороди (5 растений)", uz: "Shumtol jonli to'siq to'plami (5 dona)" },
    farmId: "farm-1",
    category: "decorative-trees",
    price: 275000,
    description: {
      en: "Five evergreen boxwood shrubs, perfect for shaping into a low garden hedge.",
      ru: "Пять вечнозелёных кустов самшита, идеально подходящих для формирования низкой садовой изгороди.",
      uz: "Bog'da past to'siq shakllantirish uchun mos, beshta doim yashil shumtol butasi.",
    },
    careInstructions: {
      en: "Full to partial sun, trim twice yearly to maintain shape.",
      ru: "Полное или частичное солнце, стрижка дважды в год для сохранения формы.",
      uz: "To'liq yoki yarim quyosh, shaklni saqlash uchun yiliga ikki marta kesing.",
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 63,
  },

  // Tashkent Flower Co. — flowers
  {
    id: "p-4",
    slug: "garden-rose-bundle",
    name: { en: "Garden Rose Bundle (12 stems)", ru: "Букет садовых роз (12 стеблей)", uz: "Bog' atirguli dastasi (12 tup)" },
    farmId: "farm-2",
    category: "flowers",
    price: 145000,
    description: {
      en: "A dozen freshly cut roses in mixed seasonal colors, harvested to order.",
      ru: "Дюжина свежесрезанных роз смешанных сезонных оттенков, срезанных под заказ.",
      uz: "Buyurtma bo'yicha kesilgan, aralash mavsumiy ranglardagi o'nlab yangi atirgullar.",
    },
    careInstructions: {
      en: "Trim stems, change vase water every 2 days, keep away from direct heat.",
      ru: "Подрезайте стебли, меняйте воду в вазе каждые 2 дня, держите вдали от прямого тепла.",
      uz: "Poyalarni kesib turing, guldondagi suvni har 2 kunda almashtiring, to'g'ridan-to'g'ri issiqlikdan uzoqroqda tuting.",
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 198,
  },
  {
    id: "p-5",
    slug: "potted-tulip-set",
    name: { en: "Potted Tulip Set (6 pots)", ru: "Набор тюльпанов в горшках (6 горшков)", uz: "Tuvakdagi lola to'plami (6 tuvak)" },
    farmId: "farm-2",
    category: "flowers",
    price: 98000,
    description: {
      en: "Six potted tulips in assorted colors, ready to display indoors or on a patio.",
      ru: "Шесть тюльпанов в горшках разных цветов, готовы к размещению в помещении или на террасе.",
      uz: "Xonada yoki ayvonda qo'yishga tayyor, turli rangdagi oltita tuvakli lola.",
    },
    careInstructions: {
      en: "Bright indirect light, water when topsoil is dry.",
      ru: "Яркий рассеянный свет, полив при подсыхании верхнего слоя почвы.",
      uz: "Yorqin, bilvosita yorug'lik; tuproqning yuqori qatlami quriganda sug'oring.",
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: "p-6",
    slug: "sunflower-bunch",
    name: { en: "Sunflower Bunch (8 stems)", ru: "Букет подсолнухов (8 стеблей)", uz: "Kungaboqar dastasi (8 tup)" },
    farmId: "farm-2",
    category: "flowers",
    price: 76000,
    description: {
      en: "Bright, oversized sunflowers cut fresh from the field.",
      ru: "Яркие, крупные подсолнухи, свежесрезанные с поля.",
      uz: "Dalada yangi kesilgan, yorqin va yirik kungaboqarlar.",
    },
    careInstructions: {
      en: "Full sun display, trim stems on arrival, refresh water daily.",
      ru: "Размещайте на солнце, подрежьте стебли по получении, ежедневно меняйте воду.",
      uz: "To'liq quyoshda saqlang, yetib kelgach poyalarni kesing, suvni har kuni yangilang.",
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 54,
  },

  // Oasis Fruit Trees — fruit trees
  {
    id: "p-7",
    slug: "apple-sapling-grafted",
    name: { en: "Grafted Apple Sapling", ru: "Привитый саженец яблони", uz: "Payvandlangan olma ko'chati" },
    farmId: "farm-3",
    category: "fruit-trees",
    price: 185000,
    description: {
      en: "A 2-year-old grafted apple sapling, disease-resistant and bred for local climate.",
      ru: "Двухлетний привитый саженец яблони, устойчивый к болезням и выведенный для местного климата.",
      uz: "2 yoshli payvandlangan olma ko'chati, kasalliklarga chidamli va mahalliy iqlim uchun yaratilgan.",
    },
    careInstructions: {
      en: "Full sun, stake for first year, water deeply once weekly.",
      ru: "Полное солнце, опора в первый год, глубокий полив раз в неделю.",
      uz: "To'liq quyosh, birinchi yili tayanch qozig'i, haftasiga bir marta chuqur sug'orish.",
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 76,
  },
  {
    id: "p-8",
    slug: "apricot-sapling",
    name: { en: "Apricot Sapling", ru: "Саженец абрикоса", uz: "O'rik ko'chati" },
    farmId: "farm-3",
    category: "fruit-trees",
    price: 165000,
    description: {
      en: "Hardy apricot sapling, well-suited to the region's growing conditions.",
      ru: "Выносливый саженец абрикоса, хорошо подходящий для условий выращивания в регионе.",
      uz: "Mintaqaning o'sish sharoitlariga mos, chidamli o'rik ko'chati.",
    },
    careInstructions: {
      en: "Full sun, well-drained soil, prune annually after fruiting.",
      ru: "Полное солнце, хорошо дренированная почва, ежегодная обрезка после плодоношения.",
      uz: "To'liq quyosh, yaxshi drenajlangan tuproq, hosildan keyin har yili budang.",
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 39,
  },
  {
    id: "p-9",
    slug: "pomegranate-sapling",
    name: { en: "Pomegranate Sapling", ru: "Саженец граната", uz: "Anor ko'chati" },
    farmId: "farm-3",
    category: "fruit-trees",
    price: 172000,
    description: {
      en: "Drought-tolerant pomegranate sapling, bears fruit within 3–4 years.",
      ru: "Засухоустойчивый саженец граната, плодоносит через 3–4 года.",
      uz: "Qurg'oqchilikka chidamli anor ko'chati, 3–4 yil ichida hosil beradi.",
    },
    careInstructions: {
      en: "Full sun, moderate watering, tolerant of poor soils once established.",
      ru: "Полное солнце, умеренный полив, после укоренения устойчив к бедным почвам.",
      uz: "To'liq quyosh, mo''tadil sug'orish, ildiz otgach kambag'al tuproqlarga chidamli.",
    },
    inStock: false,
    rating: 4.9,
    reviewCount: 52,
  },

  // Greenhouse Collective — indoor & supplies
  {
    id: "p-10",
    slug: "monstera-deliciosa",
    name: { en: "Monstera Deliciosa", ru: "Монстера деликатесная", uz: "Monstera deliciosa" },
    farmId: "farm-4",
    category: "indoor-plants",
    price: 210000,
    description: {
      en: "A mature Monstera with well-established fenestrated leaves, in a nursery pot.",
      ru: "Взрослая монстера с хорошо сформированными резными листьями, в горшке из питомника.",
      uz: "Yaxshi shakllangan teshikli barglari bo'lgan yetuk Monstera, ko'chatzor tuvagida.",
    },
    careInstructions: {
      en: "Bright indirect light, water when top 5cm of soil is dry.",
      ru: "Яркий рассеянный свет, полив при подсыхании верхних 5 см почвы.",
      uz: "Yorqin, bilvosita yorug'lik; tuproqning yuqori 5 sm qismi quriganda sug'oring.",
    },
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: "p-11",
    slug: "succulent-trio",
    name: { en: "Succulent Trio Set", ru: "Набор из трёх суккулентов", uz: "Uchta sukkulent to'plami" },
    farmId: "farm-4",
    category: "indoor-plants",
    price: 68000,
    description: {
      en: "Three low-maintenance succulents in ceramic pots — great for desks and shelves.",
      ru: "Три неприхотливых суккулента в керамических горшках — отлично подходят для стола и полок.",
      uz: "Parvarishi oson, keramik tuvaklardagi uchta sukkulent — stol va javonlar uchun ajoyib.",
    },
    careInstructions: {
      en: "Bright light, water sparingly every 2–3 weeks.",
      ru: "Яркий свет, скудный полив каждые 2–3 недели.",
      uz: "Yorqin yorug'lik, har 2–3 haftada ozgina sug'oring.",
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 94,
  },
  {
    id: "p-12",
    slug: "ceramic-planter-set",
    name: { en: "Ceramic Planter Set (3 sizes)", ru: "Набор керамических кашпо (3 размера)", uz: "Keramik guldon to'plami (3 o'lcham)" },
    farmId: "farm-4",
    category: "supplies",
    price: 89000,
    description: {
      en: "A stackable set of three glazed ceramic planters with drainage holes.",
      ru: "Набор из трёх штабелируемых глазурованных керамических кашпо с дренажными отверстиями.",
      uz: "Drenaj teshikli, bir-birining ustiga qo'yiladigan uchta sirlangan keramik guldon to'plami.",
    },
    careInstructions: {
      en: "Hand wash; not dishwasher safe.",
      ru: "Ручная мойка; не подходит для посудомоечной машины.",
      uz: "Qo'lda yuvish kerak; idish yuvish mashinasiga solib bo'lmaydi.",
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 47,
  },
  {
    id: "p-13",
    slug: "organic-potting-soil",
    name: { en: "Organic Potting Soil (20L)", ru: "Органический грунт для посадки (20 л)", uz: "Organik ekish tuprog'i (20 l)" },
    farmId: "farm-4",
    category: "supplies",
    price: 42000,
    description: {
      en: "Peat-free organic potting mix suited to indoor plants and container gardening.",
      ru: "Органическая почвосмесь без торфа, подходящая для комнатных растений и контейнерного садоводства.",
      uz: "Xonaki o'simliklar va konteyner ekinchiligi uchun mos, torfsiz organik tuproq aralashmasi.",
    },
    careInstructions: {
      en: "Store in a cool, dry place.",
      ru: "Хранить в прохладном, сухом месте.",
      uz: "Salqin, quruq joyda saqlang.",
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 61,
  },
];

export const testimonials: RawTestimonial[] = [
  {
    id: "t-1",
    name: "Aziz Karimov",
    role: {
      en: "Paulownia Investor since 2019",
      ru: "Инвестор в павловнию с 2019 года",
      uz: "2019 yildan beri pavlovniya sarmoyadori",
    },
    quote: {
      en: "I planted 10 trees as a long-term project for my children. The quarterly updates and photos make it easy to trust the process even though harvest is still years away.",
      ru: "Я посадил 10 деревьев как долгосрочный проект для своих детей. Ежеквартальные отчёты и фото позволяют доверять процессу, даже несмотря на то, что до сбора урожая ещё годы.",
      uz: "Farzandlarim uchun uzoq muddatli loyiha sifatida 10 ta daraxt ekdim. Choraklik hisobotlar va fotosuratlar tufayli hosil yig'ishga hali yillar bo'lsa ham, jarayonga ishonish oson.",
    },
    treesOwned: 10,
  },
  {
    id: "t-2",
    name: "Dilnoza Yusupova",
    role: {
      en: "Paulownia Investor since 2021",
      ru: "Инвестор в павловнию с 2021 года",
      uz: "2021 yildan beri pavlovniya sarmoyadori",
    },
    quote: {
      en: "What convinced me was the transparency — Nihol was upfront that returns aren't guaranteed. The care documentation has been consistent every quarter.",
      ru: "Меня убедила прозрачность — Nihol честно предупредили, что доходность не гарантирована. Документация по уходу поступает стабильно каждый квартал.",
      uz: "Meni ishontirgan narsa shaffoflik edi — Nihol daromad kafolatlanmaganini ochiq aytdi. Parvarish hujjatlari har chorakda izchil kelib turadi.",
    },
    treesOwned: 3,
  },
  {
    id: "t-3",
    name: "Rustam Tashkentov",
    role: {
      en: "Marketplace customer",
      ru: "Клиент маркетплейса",
      uz: "Marketpleys mijozi",
    },
    quote: {
      en: "Ordered fruit saplings from Oasis Fruit Trees through Nihol — arrived healthy and well-packaged, with clear planting instructions.",
      ru: "Заказал плодовые саженцы у «Оазис» через Nihol — пришли здоровыми, хорошо упакованными, с понятными инструкциями по посадке.",
      uz: "Nihol orqali «Oasis»dan meva ko'chatlari buyurtma qildim — sog'lom, yaxshi qadoqlangan holda, aniq ekish ko'rsatmalari bilan yetib keldi.",
    },
  },
];

export const faqs: RawFaqItem[] = [
  {
    question: {
      en: "What exactly am I purchasing for 499,000 SOM?",
      ru: "Что именно я приобретаю за 499 000 сум?",
      uz: "499 000 so'mga aynan nimani sotib olaman?",
    },
    answer: {
      en: "One 2–3 year old, disease-free Paulownia seedling, professional planting, and 8 years of complete tree care — monitoring, irrigation setup, fertilization, pruning, disease prevention, soil management, and quarterly agronomist visits — plus harvest coordination and timber transport to the buyer in Year 8.",
      ru: "Один 2–3-летний, здоровый саженец павловнии, профессиональную посадку и 8 лет полного ухода за деревом — мониторинг, установку системы орошения, удобрение, обрезку, профилактику болезней, управление почвой и ежеквартальные визиты агронома — а также организацию сбора урожая и транспортировку древесины покупателю на 8-м году.",
      uz: "Bitta 2–3 yoshli, kasalliksiz pavlovniya ko'chati, professional ekish va 8 yillik to'liq daraxt parvarishi — monitoring, sug'orish tizimini o'rnatish, o'g'itlash, kesish, kasalliklarning oldini olish, tuproqni boshqarish va choraklik agronom tashriflari — shuningdek, 8-yilda hosil yig'ishtirish tashkiloti va yog'ochni xaridorga yetkazib berish.",
    },
  },
  {
    question: {
      en: "Is the return guaranteed?",
      ru: "Гарантирована ли доходность?",
      uz: "Daromad kafolatlanganmi?",
    },
    answer: {
      en: "No. Expected selling prices of $200–$600 USD per tree are estimates based on current global timber markets, not guarantees. Actual returns depend on market conditions, tree health, and harvest timing. Paulownia farming carries agricultural risk, including weather, pests, and disease.",
      ru: "Нет. Ожидаемые цены продажи 200–600 USD за дерево — это оценки на основе текущих мировых рынков древесины, а не гарантии. Фактическая доходность зависит от рыночной конъюнктуры, состояния дерева и сроков сбора урожая. Выращивание павловнии сопряжено с сельскохозяйственными рисками, включая погоду, вредителей и болезни.",
      uz: "Yo'q. Daraxt boshiga kutilayotgan 200–600 AQSh dollari sotish narxi hozirgi jahon yog'och bozorlariga asoslangan taxmin bo'lib, kafolat emas. Haqiqiy daromad bozor sharoiti, daraxt sog'lig'i va hosil yig'ish muddatiga bog'liq. Pavlovniya yetishtirish ob-havo, zararkunandalar va kasalliklar kabi qishloq xo'jaligi risklarini o'z ichiga oladi.",
    },
  },
  {
    question: {
      en: "Can I plant the tree on my own land?",
      ru: "Могу ли я посадить дерево на своём участке?",
      uz: "Daraxtni o'z yerimga eka olamanmi?",
    },
    answer: {
      en: "Yes. You can choose to have your seedling planted on your own land or on Nihol's partner farm, where it will still receive the full 8 years of professional care.",
      ru: "Да. Вы можете выбрать посадку саженца на своём участке или на партнёрской ферме Nihol, где он также получит полные 8 лет профессионального ухода.",
      uz: "Ha. Ko'chatingizni o'z yeringizga yoki Nihol'ning hamkor fermasiga ekishni tanlashingiz mumkin — u yerda ham to'liq 8 yillik professional parvarish olinadi.",
    },
  },
  {
    question: {
      en: "When can I expect to harvest?",
      ru: "Когда ожидать сбора урожая?",
      uz: "Hosilni qachon kutish mumkin?",
    },
    answer: {
      en: "Paulownia is typically ready for harvest between 5 and 8 years, with 8 years generally yielding premium pricing due to greater trunk diameter and timber quality.",
      ru: "Павловния обычно готова к сбору урожая через 5–8 лет, при этом 8 лет, как правило, дают премиальную цену благодаря большему диаметру ствола и качеству древесины.",
      uz: "Pavlovniya odatda 5–8 yil ichida hosil yig'ishga tayyor bo'ladi, 8 yil esa katta tanа diametri va yog'och sifati tufayli odatda yuqori narxni beradi.",
    },
  },
  {
    question: {
      en: "How is my tree's progress tracked?",
      ru: "Как отслеживается прогресс моего дерева?",
      uz: "Daraxtimning o'sishi qanday kuzatiladi?",
    },
    answer: {
      en: "You receive ongoing documentation — photos, health records, and growth tracking — along with quarterly oversight visits from our agronomists.",
      ru: "Вы получаете постоянную документацию — фото, отчёты о здоровье и отслеживание роста — а также ежеквартальные контрольные визиты наших агрономов.",
      uz: "Siz doimiy hujjatlar — fotosuratlar, sog'liq hisobotlari va o'sish kuzatuvi — hamda agronomlarimizning choraklik nazorat tashriflarini olasiz.",
    },
  },
  {
    question: {
      en: "What happens at harvest time?",
      ru: "Что происходит во время сбора урожая?",
      uz: "Hosil yig'ish vaqtida nima bo'ladi?",
    },
    answer: {
      en: "Nihol coordinates the harvest in Year 8 (or earlier, if you choose) and includes transportation of the timber to the buyer as part of your original package.",
      ru: "Nihol организует сбор урожая на 8-м году (или раньше, по вашему выбору) и включает транспортировку древесины покупателю в рамках вашего изначального пакета.",
      uz: "Nihol 8-yilda (yoki xohishingizga ko'ra, ertaroq) hosil yig'ishtirishni tashkillashtiradi va yog'ochni xaridorga yetkazib berishni dastlabki paketingizga kiritadi.",
    },
  },
];

export const supportFaqs: RawFaqItem[] = [
  {
    question: {
      en: "How long does marketplace delivery take?",
      ru: "Сколько времени занимает доставка с маркетплейса?",
      uz: "Marketpleysdan yetkazib berish qancha vaqt oladi?",
    },
    answer: {
      en: "Delivery times vary by farm and location, typically 2–7 business days. Exact estimates are shown at checkout once a payment provider and shipping partners are integrated.",
      ru: "Сроки доставки зависят от фермы и местоположения, обычно 2–7 рабочих дней. Точные сроки будут показаны при оформлении заказа после интеграции платёжного провайдера и партнёров по доставке.",
      uz: "Yetkazib berish muddati ferma va manzilga qarab har xil, odatda 2–7 ish kuni. To'lov provayderi va yetkazib berish hamkorlari ulangach, aniq muddatlar buyurtma rasmiylashtirishda ko'rsatiladi.",
    },
  },
  {
    question: {
      en: "Can I return a plant if it arrives damaged?",
      ru: "Могу ли я вернуть растение, если оно пришло повреждённым?",
      uz: "Agar o'simlik shikastlangan holda kelsa, uni qaytarishim mumkinmi?",
    },
    answer: {
      en: "Yes — contact us within 48 hours of delivery with photos and we'll coordinate a replacement or refund with the farm brand.",
      ru: "Да — свяжитесь с нами в течение 48 часов после доставки, приложив фото, и мы согласуем замену или возврат средств с фермерским брендом.",
      uz: "Ha — yetkazib berishdan keyin 48 soat ichida fotosuratlar bilan biz bilan bog'laning, biz ferma brendi bilan almashtirish yoki pulni qaytarishni kelishib olamiz.",
    },
  },
  {
    question: {
      en: "How do I track my Paulownia tree's progress?",
      ru: "Как отслеживать прогресс моего дерева павловнии?",
      uz: "Pavlovniya daraxtimning o'sishini qanday kuzataman?",
    },
    answer: {
      en: "Investors receive periodic photo and health-record updates. A self-serve tracking dashboard is planned for a future release.",
      ru: "Инвесторы получают периодические обновления с фото и отчётами о здоровье. Личный кабинет для самостоятельного отслеживания запланирован на будущий релиз.",
      uz: "Sarmoyadorlar davriy fotosuratlar va sog'liq hisobotlarini oladi. Mustaqil kuzatuv paneli kelajakdagi versiyada rejalashtirilgan.",
    },
  },
  {
    question: {
      en: "How can my farm brand join the marketplace?",
      ru: "Как мой фермерский бренд может присоединиться к маркетплейсу?",
      uz: "Fermer brendim marketpleysga qanday qo'shilishi mumkin?",
    },
    answer: {
      en: 'Use the "Sell Your Products Here" form on the Marketplace page or contact us directly — our team reviews every farm before onboarding.',
      ru: "Воспользуйтесь формой «Продавайте у нас» на странице маркетплейса или свяжитесь с нами напрямую — наша команда проверяет каждую ферму перед подключением.",
      uz: "Marketpleys sahifasidagi «Mahsulotlaringizni bu yerda soting» formasidan foydalaning yoki biz bilan to'g'ridan-to'g'ri bog'laning — jamoamiz har bir fermani qo'shishdan oldin ko'rib chiqadi.",
    },
  },
];

export const trustStats = {
  yearsInBusiness: 8,
  treesPlanted: 24600,
  customers: 3150,
  farmPartners: 42,
};

export const treePackages: RawTreePackage[] = [
  {
    id: "pkg-1",
    slug: "single-tree",
    name: { en: "Single tree", ru: "Одно дерево", uz: "Bitta daraxt" },
    quantity: 1,
    tag: { en: "STARTER", ru: "СТАРТ", uz: "BOSHLANG'ICH" },
    blurb: {
      en: "One Paulownia seedling, geo-tagged, eight years of care.",
      ru: "Один саженец павловнии с геометкой и восемью годами ухода.",
      uz: "Bitta pavlovniya ko'chati, geo-belgilangan, sakkiz yillik parvarish bilan.",
    },
    priceSom: 499000,
    returnLowUsd: 200,
    returnHighUsd: 600,
    stockLabel: "1 240 left",
  },
  {
    id: "pkg-2",
    slug: "grove-of-5",
    name: { en: "Grove of 5", ru: "Роща из 5", uz: "5 talik bog'" },
    quantity: 5,
    tag: { en: "POPULAR", ru: "ПОПУЛЯРНО", uz: "OMMABOP" },
    blurb: {
      en: "Five trees in one plot. Quarterly photo report per tree.",
      ru: "Пять деревьев на одном участке. Ежеквартальный фотоотчёт по каждому дереву.",
      uz: "Bitta uchastkada beshta daraxt. Har bir daraxt uchun choraklik foto hisobot.",
    },
    priceSom: 2495000,
    returnLowUsd: 1000,
    returnHighUsd: 3000,
    stockLabel: "310 sets",
  },
  {
    id: "pkg-3",
    slug: "grove-of-20",
    name: { en: "Grove of 20", ru: "Роща из 20", uz: "20 talik bog'" },
    quantity: 20,
    tag: { en: "", ru: "", uz: "" },
    blurb: {
      en: "Named plot, annual site visit, priority harvest slot.",
      ru: "Именной участок, ежегодный визит на место, приоритет при сборе урожая.",
      uz: "Nomli uchastka, yillik joyga tashrif, ustuvor hosil yig'ish navbati.",
    },
    priceSom: 9980000,
    returnLowUsd: 4000,
    returnHighUsd: 12000,
    stockLabel: "48 sets",
  },
  {
    id: "pkg-4",
    slug: "gift-tree",
    name: { en: "Gift tree", ru: "Дерево в подарок", uz: "Sovg'a daraxt" },
    quantity: 1,
    tag: { en: "GIFT", ru: "ПОДАРОК", uz: "SOVG'A" },
    blurb: {
      en: "Planted in someone else's name with a printed certificate.",
      ru: "Посажено на чужое имя с печатным сертификатом.",
      uz: "Boshqa birov nomiga ekiladi, bosma sertifikat bilan.",
    },
    priceSom: 499000,
    returnLowUsd: 200,
    returnHighUsd: 600,
    stockLabel: "Always",
  },
];

/**
 * Demo Grove/order/review content for local (no-Supabase) development, so the
 * account-gated pages (Grove, order history, reviews) have something to show.
 * Real deployments read this from Supabase once a customer is authenticated.
 */
export const mockTrees: Tree[] = [
  { id: "tree-1", code: "NH-1042", plot: "J-14", plantedAt: "2025-04-01", heightCm: 410, girthCm: 14, stage: "sapling", harvestEstimateDate: "2032-09-01", co2KgTarget: 500 },
  { id: "tree-2", code: "NH-1043", plot: "J-14", plantedAt: "2025-04-01", heightCm: 380, girthCm: 13, stage: "sapling", harvestEstimateDate: "2032-09-01", co2KgTarget: 500 },
  { id: "tree-3", code: "NH-1044", plot: "J-14", plantedAt: "2025-04-01", heightCm: 350, girthCm: 12, stage: "sapling", harvestEstimateDate: "2032-09-01", co2KgTarget: 500 },
  { id: "tree-4", code: "NH-1088", plot: "J-14", plantedAt: "2026-03-01", heightCm: 120, girthCm: 6, stage: "seedling", harvestEstimateDate: "2033-09-01", co2KgTarget: 500 },
];

export const mockTreeCareLog: Record<string, TreeCareLogEntry[]> = {
  "tree-1": [
    { id: "log-1", loggedAt: "2026-08-18", note: "Foliar feed applied, height measured at 4.1 m." },
    { id: "log-2", loggedAt: "2026-07-02", note: "Drip line replaced on row 6. Irrigation raised to 3×/week." },
    { id: "log-3", loggedAt: "2026-05-14", note: "Formative pruning: two lower branches removed for trunk quality." },
    { id: "log-4", loggedAt: "2026-03-21", note: "Spring soil test — nitrogen slightly low, amended with compost." },
  ],
};

export const mockOrders: Order[] = [
  {
    id: "NH-20260814-092",
    status: "in_transit",
    paymentStatus: "paid",
    totalSom: 143000,
    createdAt: "2026-08-14T11:04:00Z",
    items: [
      { itemType: "product", productId: "p-5", treePackageId: null, name: "Potted Tulip Set (6 pots)", quantity: 1, unitPriceSom: 98000 },
      { itemType: "product", productId: "p-11", treePackageId: null, name: "Succulent Trio Set", quantity: 1, unitPriceSom: 68000 },
    ],
  },
  {
    id: "NH-20260622-441",
    status: "delivered",
    paymentStatus: "paid",
    totalSom: 240000,
    createdAt: "2026-06-22T09:00:00Z",
    items: [{ itemType: "product", productId: "p-7", treePackageId: null, name: "Grafted Apple Sapling", quantity: 1, unitPriceSom: 185000 }],
  },
];

export const mockProductReviews: ProductReview[] = [
  { id: "rev-1", productId: "p-4", rating: 5, body: "Arrived in perfect shape, packed with damp moss. Already budding two weeks later.", createdAt: "2026-06-01", reviewerName: "Aziza R." },
  { id: "rev-2", productId: "p-4", rating: 4, body: "Healthy plant, delivery was a day late. Farm answered my questions in the chat quickly.", createdAt: "2026-05-20", reviewerName: "Bekzod T." },
];
