create extension if not exists pgcrypto;

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null,
  donor_email text not null,
  pan_number text,
  amount_minor integer not null check (amount_minor > 0),
  currency text not null,
  country_code text not null,
  provider text check (provider in ('razorpay')),
  provider_order_id text,
  provider_payment_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('razorpay')),
  provider_event_id text not null,
  provider_payment_id text not null,
  donation_id uuid not null references donations(id) on delete cascade,
  payload jsonb not null,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create table if not exists processing_jobs (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references donations(id) on delete cascade,
  job_type text not null,
  status text not null default 'queued' check (status in ('queued', 'processing', 'completed', 'failed')),
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (donation_id, job_type)
);

create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null unique references donations(id) on delete cascade,
  receipt_number text not null unique,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists email_deliveries (
  id uuid primary key default gen_random_uuid(),
  donation_id uuid not null references donations(id) on delete cascade,
  provider text not null,
  provider_message_id text,
  status text not null check (status in ('sent', 'failed')),
  last_error text,
  created_at timestamptz not null default now()
);

create index if not exists donations_status_created_idx on donations(status, created_at);
create index if not exists donations_email_idx on donations(donor_email);
create index if not exists payment_events_donation_idx on payment_events(donation_id);
create index if not exists processing_jobs_status_idx on processing_jobs(status, created_at);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists donations_set_updated_at on donations;
create trigger donations_set_updated_at
before update on donations
for each row
execute function set_updated_at();

drop trigger if exists processing_jobs_set_updated_at on processing_jobs;
create trigger processing_jobs_set_updated_at
before update on processing_jobs
for each row
execute function set_updated_at();
