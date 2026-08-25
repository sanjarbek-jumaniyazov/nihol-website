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
