/**
 * Real photography sourced from Wikimedia Commons (all CC-BY / CC-BY-SA /
 * GFDL / public domain, verified individually). Each entry carries the
 * attribution its license requires — see PlaceholderImage, which renders the
 * credit as a small caption, and /credits for the full list.
 */

function wm(filename: string): string {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
}

export interface PhotoCredit {
  author: string;
  license: string;
  sourceFile: string;
}

export interface PhotoSource {
  src: string;
  alt: string;
  credit: PhotoCredit;
}

function photo(filename: string, alt: string, author: string, license: string): PhotoSource {
  return { src: wm(filename), alt, credit: { author, license, sourceFile: filename } };
}

export const IMAGES = {
  paulowniaFlowers: photo(
    "Paulownia-tomentosa.JPG",
    "Paulownia tomentosa tree in bloom with purple flowers",
    "Mosepors",
    "CC BY-SA"
  ),
  paulowniaSeedling: photo(
    "Paulownia_tomentosa_seedling.jpg",
    "A young Paulownia tomentosa seedling",
    "Meneerke bloem",
    "CC BY-SA 3.0"
  ),
  japaneseMaple: photo(
    "Japanese Maple Acer palmatum Backlit 2700px.jpg",
    "Backlit red Japanese maple leaves",
    "Derek Ramsey (Ram-Man)",
    "GFDL 1.2"
  ),
  planeTree: photo(
    "Platanus orientalis tree.JPG",
    "Mature plane tree with a broad shade canopy",
    "Vinayaraj",
    "CC BY-SA 3.0"
  ),
  boxwood: photo(
    "Common Boxwood Buxus sempervirens 'Vardar Valley' Leaves Closeup 3008px.JPG",
    "Close-up of common boxwood leaves",
    "Derek Ramsey (Ram-Man)",
    "CC BY-SA 2.5"
  ),
  roses: photo(
    "Bouquet de roses roses.jpg",
    "A bunch of pink roses at a flower market",
    "Jebulon",
    "CC BY-SA"
  ),
  tulips: photo("Red Tulips.jpg", "Red tulips in bloom", "texas_mustang", "CC BY 2.0"),
  sunflower: photo(
    "Sonnenblume Helianthus 1.JPG",
    "A bright yellow sunflower in bloom",
    "Böhringer Friedrich",
    "CC BY-SA 2.5"
  ),
  appleTree: photo(
    "Apple tree blossom.JPG",
    "An apple tree in blossom",
    "Roger Griffith",
    "Public Domain"
  ),
  apricotTree: photo("Apricot tree05.jpg", "An apricot tree", "apple2000", "CC BY-SA 3.0"),
  pomegranate: photo(
    "Punica granatum 004.JPG",
    "Pomegranate branch with developing fruit",
    "H. Zell",
    "CC BY-SA 3.0"
  ),
  monstera: photo(
    "Monstera deliciosa DSC02600.jpg",
    "A potted Monstera deliciosa plant",
    "Smatu",
    "CC BY-SA 4.0"
  ),
  succulents: photo(
    "Plantas suculentas florecidas.jpg",
    "Blooming succulent plants",
    "Nananayo",
    "CC BY-SA 4.0"
  ),
  ceramicPlanters: photo(
    "Container garden on front porch.jpg",
    "Ceramic pots with ornamental plants on a porch",
    "Esther",
    "CC BY-SA 3.0"
  ),
  pottingSoil: photo(
    "Soil.jpg",
    "Close-up of rich potting soil",
    "Mesaytsegaye",
    "Public Domain"
  ),
  nursery: photo(
    "New Row Farm Nurseries - geograph.org.uk - 425973.jpg",
    "Rows of trees at a plant nursery",
    "Roger Smith",
    "CC BY-SA 2.0"
  ),
  orchard: photo(
    "Plum orchard - geograph.org.uk - 259674.jpg",
    "Rows of fruit trees in an orchard",
    "Jennifer Luther Thomas",
    "CC BY-SA 2.0"
  ),
  greenhouse: photo(
    "Sera Gradina Botanica.jpg",
    "Botanical garden greenhouse interior",
    "Andrea Polereczky",
    "CC BY-SA 3.0"
  ),
} as const;

export const PRODUCT_IMAGES: Record<string, PhotoSource> = {
  "ornamental-maple": IMAGES.japaneseMaple,
  "shade-plane-tree": IMAGES.planeTree,
  "boxwood-hedge-set": IMAGES.boxwood,
  "garden-rose-bundle": IMAGES.roses,
  "potted-tulip-set": IMAGES.tulips,
  "sunflower-bunch": IMAGES.sunflower,
  "apple-sapling-grafted": IMAGES.appleTree,
  "apricot-sapling": IMAGES.apricotTree,
  "pomegranate-sapling": IMAGES.pomegranate,
  "monstera-deliciosa": IMAGES.monstera,
  "succulent-trio": IMAGES.succulents,
  "ceramic-planter-set": IMAGES.ceramicPlanters,
  "organic-potting-soil": IMAGES.pottingSoil,
};

export const FARM_IMAGES: Record<string, PhotoSource> = {
  "green-valley-nursery": IMAGES.nursery,
  "tashkent-flower-co": IMAGES.roses,
  "oasis-fruit-trees": IMAGES.orchard,
  "greenhouse-collective": IMAGES.greenhouse,
};

export const ALL_CREDITS: PhotoCredit[] = Object.values(IMAGES).map((p) => p.credit);
