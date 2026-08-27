-- Placeholder seed data mirroring src/lib/mock-data.ts.
-- Replace with real farm brands and products, then run after schema.sql.

insert into farms (slug, name, tagline, description, location, founded, rating, review_count, featured) values
  ('green-valley-nursery', 'Green Valley Nursery', 'Ornamental trees & shade trees grown with care since 2011', 'Green Valley Nursery specializes in decorative and shade trees, grown across 12 hectares in the Tashkent region.', 'Tashkent Region', 2011, 4.8, 214, true),
  ('tashkent-flower-co', 'Tashkent Flower Co.', 'Fresh-cut and potted flowers, delivered same week', 'A family-run flower farm supplying roses, tulips, and seasonal blooms across the city.', 'Tashkent', 2016, 4.9, 356, true),
  ('oasis-fruit-trees', 'Oasis Fruit Trees', 'Apple, apricot & pomegranate saplings for home orchards', 'Oasis Fruit Trees grows grafted, disease-resistant fruit saplings suited to local soil and climate.', 'Samarkand Region', 2008, 4.7, 189, true),
  ('greenhouse-collective', 'Greenhouse Collective', 'Indoor plants, succulents & greenery for every home', 'A cooperative of small growers focused on low-maintenance indoor plants.', 'Fergana Valley', 2019, 4.6, 132, false)
on conflict (slug) do nothing;

insert into products (slug, farm_id, name, category, price_som, description, care_instructions, in_stock, rating, review_count) values
  ('ornamental-maple', (select id from farms where slug = 'green-valley-nursery'), 'Ornamental Japanese Maple', 'decorative-trees', 320000, 'A compact, richly colored maple ideal for garden focal points.', 'Partial shade, well-drained soil, water 2–3x weekly in first season.', true, 4.8, 41),
  ('shade-plane-tree', (select id from farms where slug = 'green-valley-nursery'), 'Shade Plane Tree', 'decorative-trees', 410000, 'Fast-growing shade tree, popular for courtyards and street-side planting.', 'Full sun, deep watering weekly, prune in dormant season.', true, 4.7, 28),
  ('boxwood-hedge-set', (select id from farms where slug = 'green-valley-nursery'), 'Boxwood Hedge Set (5 plants)', 'decorative-trees', 275000, 'Five evergreen boxwood shrubs, perfect for shaping into a low garden hedge.', 'Full to partial sun, trim twice yearly.', true, 4.9, 63),
  ('garden-rose-bundle', (select id from farms where slug = 'tashkent-flower-co'), 'Garden Rose Bundle (12 stems)', 'flowers', 145000, 'A dozen freshly cut roses in mixed seasonal colors.', 'Trim stems, change vase water every 2 days.', true, 4.9, 198),
  ('potted-tulip-set', (select id from farms where slug = 'tashkent-flower-co'), 'Potted Tulip Set (6 pots)', 'flowers', 98000, 'Six potted tulips in assorted colors.', 'Bright indirect light, water when topsoil is dry.', true, 4.8, 87),
  ('sunflower-bunch', (select id from farms where slug = 'tashkent-flower-co'), 'Sunflower Bunch (8 stems)', 'flowers', 76000, 'Bright, oversized sunflowers cut fresh from the field.', 'Full sun display, trim stems on arrival.', true, 4.7, 54),
  ('apple-sapling-grafted', (select id from farms where slug = 'oasis-fruit-trees'), 'Grafted Apple Sapling', 'fruit-trees', 185000, 'A 2-year-old grafted apple sapling, disease-resistant.', 'Full sun, stake for first year.', true, 4.8, 76),
  ('apricot-sapling', (select id from farms where slug = 'oasis-fruit-trees'), 'Apricot Sapling', 'fruit-trees', 165000, 'Hardy apricot sapling, well-suited to the region.', 'Full sun, well-drained soil.', true, 4.6, 39),
  ('pomegranate-sapling', (select id from farms where slug = 'oasis-fruit-trees'), 'Pomegranate Sapling', 'fruit-trees', 172000, 'Drought-tolerant pomegranate sapling.', 'Full sun, moderate watering.', false, 4.9, 52),
  ('monstera-deliciosa', (select id from farms where slug = 'greenhouse-collective'), 'Monstera Deliciosa', 'indoor-plants', 210000, 'A mature Monstera with well-established fenestrated leaves.', 'Bright indirect light, water when top 5cm of soil is dry.', true, 4.9, 112),
  ('succulent-trio', (select id from farms where slug = 'greenhouse-collective'), 'Succulent Trio Set', 'indoor-plants', 68000, 'Three low-maintenance succulents in ceramic pots.', 'Bright light, water sparingly every 2–3 weeks.', true, 4.7, 94),
  ('ceramic-planter-set', (select id from farms where slug = 'greenhouse-collective'), 'Ceramic Planter Set (3 sizes)', 'supplies', 89000, 'A stackable set of three glazed ceramic planters.', 'Hand wash; not dishwasher safe.', true, 4.8, 47),
  ('organic-potting-soil', (select id from farms where slug = 'greenhouse-collective'), 'Organic Potting Soil (20L)', 'supplies', 42000, 'Peat-free organic potting mix.', 'Store in a cool, dry place.', true, 4.6, 61)
on conflict (slug) do nothing;

-- Paulownia packages: quantity × 499,000 SOM per tree.
insert into tree_packages (slug, name, quantity, tag, blurb, price_som, return_low_usd, return_high_usd, stock_label, sort_order) values
  ('single-tree', 'Single tree', 1, 'STARTER', 'One Paulownia seedling, geo-tagged, eight years of care.', 499000, 200, 600, '1 240 left', 1),
  ('grove-of-5', 'Grove of 5', 5, 'POPULAR', 'Five trees in one plot. Quarterly photo report per tree.', 2495000, 1000, 3000, '310 sets', 2),
  ('grove-of-20', 'Grove of 20', 20, '', 'Named plot, annual site visit, priority harvest slot.', 9980000, 4000, 12000, '48 sets', 3),
  ('gift-tree', 'Gift tree', 1, 'GIFT', 'Planted in someone else''s name with a printed certificate.', 499000, 200, 600, 'Always', 4)
on conflict (slug) do nothing;
