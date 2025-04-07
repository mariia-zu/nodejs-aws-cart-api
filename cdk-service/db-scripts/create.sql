create TYPE order_status as ENUM ('OPEN', 'ORDERED');

create table carts(
	id uuid primary key default uuid_generate_v4(),
	user_id uuid,
	created_at date not null default current_date,
	updated_at date not null default current_date,
	status order_status
)

create table cart_items(
	product_id uuid not null,
	cart_id uuid not null,
	count integer not null check (count > 0),
	primary key (product_id, cart_id),
	foreign key (cart_id) references carts(id) on delete cascade
)

create extension if not exists "uuid-ossp";