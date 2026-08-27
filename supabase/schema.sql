-- Nihol database schema
-- Run this against a fresh Supabase project (SQL Editor -> New query -> paste -> Run),
-- then update src/lib/data.ts to query these tables instead of mock-data.ts.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Marketplace: farm brands
-- ---------------------------------------------------------------------------
create table if not exists farms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  location text,
  founded int,
  logo_url text,
  rating numeric(2,1) default 0,
  review_count int default 0,
  featured boolean default false,
  contact_email text,
  contact_phone text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Marketplace: products
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  farm_id uuid not null references farms(id) on delete cascade,
  name text not null,
  category text not null check (
    category in ('flowers', 'decorative-trees', 'fruit-trees', 'indoor-plants', 'supplies')
  ),
  price_som numeric(12,2) not null,
  description text,
  care_instructions text,
  in_stock boolean default true,
  rating numeric(2,1) default 0,
  review_count int default 0,
  images text[] default '{}',
  created_at timestamptz default now()
);

create index if not exists products_farm_id_idx on products(farm_id);
create index if not exists products_category_idx on products(category);

-- ---------------------------------------------------------------------------
-- Marketplace: orders (checkout is stubbed — payment_status starts "pending"
-- until a real payment gateway, e.g. Payme/Click, is wired into
-- src/app/api/checkout/route.ts)
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  delivery_address text not null,
  total_som numeric(12,2) not null,
  payment_status text not null default 'pending' check (
    payment_status in ('pending', 'paid', 'failed', 'refunded')
  ),
  payment_provider text,
  payment_reference text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  quantity int not null check (quantity > 0),
  unit_price_som numeric(12,2) not null
);

create index if not exists order_items_order_id_idx on order_items(order_id);

-- ---------------------------------------------------------------------------
-- Paulownia: investment inquiries submitted from /paulownia
-- ---------------------------------------------------------------------------
create table if not exists investment_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  tree_count int not null default 1,
  land_option text check (land_option in ('own-land', 'partner-farm')),
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'closed')),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Contact & support messages submitted from /contact
-- ---------------------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'responded', 'closed')),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Public (anon) can read catalog data, and insert orders/inquiries.
-- Only the service role (server-side) can read/update orders & inquiries.
-- ---------------------------------------------------------------------------
alter table farms enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table investment_inquiries enable row level security;
alter table contact_messages enable row level security;

create policy "Public read access to farms" on farms for select using (true);
create policy "Public read access to products" on products for select using (true);

create policy "Public can create orders" on orders for insert with check (true);
create policy "Public can create order items" on order_items for insert with check (true);
create policy "Public can submit investment inquiries" on investment_inquiries for insert with check (true);
create policy "Public can submit contact messages" on contact_messages for insert with check (true);

-- ---------------------------------------------------------------------------
-- Customer accounts
-- Every table below is owner-scoped (auth.uid() = user_id) unless noted.
-- Rows are written by the server (service-role client) in most flows —
-- checkout fulfillment, review acceptance — so most tables have no public
-- insert policy; the client only needs to *select* its own rows.
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  referral_code text unique,
  created_at timestamptz default now()
);

alter table orders
  add column if not exists user_id uuid references auth.users(id),
  add column if not exists entrance text,
  add column if not exists landmark text,
  add column if not exists delivery_slot text,
  add column if not exists note text,
  add column if not exists status text not null default 'placed' check (
    status in ('placed', 'packed', 'in_transit', 'out_for_delivery', 'delivered')
  );

create table if not exists order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status text not null,
  created_at timestamptz default now()
);

create index if not exists order_status_history_order_id_idx on order_status_history(order_id);

-- ---------------------------------------------------------------------------
-- Paulownia: tree packages (replaces the old lead-inquiry flow — packages are
-- browsed and purchased directly, like marketplace products)
-- ---------------------------------------------------------------------------
create table if not exists tree_packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  quantity int not null check (quantity > 0),
  tag text,
  blurb text,
  price_som numeric(12,2) not null,
  return_low_usd numeric(10,2) not null,
  return_high_usd numeric(10,2) not null,
  stock_label text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table order_items
  alter column product_id drop not null,
  add column if not exists item_type text not null default 'product' check (
    item_type in ('product', 'tree_package')
  ),
  add column if not exists tree_package_id uuid references tree_packages(id);

-- ---------------------------------------------------------------------------
-- Grove: individually owned trees, created by the checkout fulfillment step
-- for every tree_package line item on a paid, authenticated order.
-- ---------------------------------------------------------------------------
create table if not exists trees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  order_id uuid references orders(id),
  package_id uuid references tree_packages(id),
  code text unique not null,
  plot text not null default 'J-14',
  planted_at date not null default current_date,
  height_cm numeric(6,1) not null default 0,
  girth_cm numeric(5,1) not null default 0,
  stage text not null default 'seedling' check (
    stage in ('seedling', 'sapling', 'maturing', 'harvest_ready')
  ),
  harvest_estimate_date date,
  co2_kg_target numeric(8,1) not null default 500,
  created_at timestamptz default now()
);

create index if not exists trees_user_id_idx on trees(user_id);

create table if not exists tree_care_log (
  id uuid primary key default gen_random_uuid(),
  tree_id uuid not null references trees(id) on delete cascade,
  logged_at timestamptz not null default now(),
  note text not null
);

create index if not exists tree_care_log_tree_id_idx on tree_care_log(tree_id);

-- ---------------------------------------------------------------------------
-- Marketplace: saved/wishlist products and reviews
-- ---------------------------------------------------------------------------
create table if not exists saved_products (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);

create table if not exists product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  order_id uuid not null references orders(id),
  user_id uuid not null references auth.users(id),
  rating int not null check (rating between 1 and 5),
  body text not null,
  created_at timestamptz default now(),
  unique (order_id, product_id)
);

create index if not exists product_reviews_product_id_idx on product_reviews(product_id);

-- ---------------------------------------------------------------------------
-- Account settings: addresses, payment-method labels, notification prefs,
-- referrals. Payment methods store display labels only (Payme/Click are
-- redirect-based gateways in Uzbekistan) — never real card data.
-- ---------------------------------------------------------------------------
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  line text not null,
  city text not null,
  is_default boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists payment_method_labels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null check (provider in ('payme', 'click', 'card')),
  label text not null,
  meta text,
  is_default boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists notification_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  growth boolean not null default true,
  milestones boolean not null default true,
  payments boolean not null default true,
  delivery boolean not null default true,
  promos boolean not null default false
);

create table if not exists referrals (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code text unique not null
);

create table if not exists referral_redemptions (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references auth.users(id),
  invitee_user_id uuid not null references auth.users(id) unique,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table order_status_history enable row level security;
alter table tree_packages enable row level security;
alter table trees enable row level security;
alter table tree_care_log enable row level security;
alter table saved_products enable row level security;
alter table product_reviews enable row level security;
alter table addresses enable row level security;
alter table payment_method_labels enable row level security;
alter table notification_preferences enable row level security;
alter table referrals enable row level security;
alter table referral_redemptions enable row level security;

create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Users can read own order status history" on order_status_history for select using (
  order_id in (select id from orders where user_id = auth.uid())
);

create policy "Public read access to tree packages" on tree_packages for select using (true);

create policy "Users can read own trees" on trees for select using (auth.uid() = user_id);
create policy "Users can read own tree care log" on tree_care_log for select using (
  tree_id in (select id from trees where user_id = auth.uid())
);

create policy "Users can manage own saved products" on saved_products for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Public read access to product reviews" on product_reviews for select using (true);
create policy "Users can create own reviews" on product_reviews for insert with check (auth.uid() = user_id);

create policy "Users can manage own addresses" on addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own payment method labels" on payment_method_labels for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own notification preferences" on notification_preferences for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read own referral code" on referrals for select using (auth.uid() = user_id);
