-- ##################### POSTGRES DDL BUREAUTO ######################## --

drop schema if exists public cascade;
create schema if not exists public;

-- ##################### starts modules ######################## --

create extension if not exists pgcrypto;

-- ##################### ends modules ######################## --



-- ##################### starts tables ######################## --

-- drop table "user" cascade;

create table "user" (
    use_cod bigint not null generated by default as identity,
    use_name varchar not null,
	use_nickname varchar,
    use_is_cpf_document boolean not null,
    use_document varchar not null,
    use_phone varchar not null,
    use_address varchar not null,
    use_email varchar not null,
    use_is_temp_password boolean not null default true,
	use_password varchar not null,
    use_is_admin boolean not null default false,
    use_created_at timestamp with time zone default current_timestamp not null,
    constraint user_use_cod_pkey primary key (use_cod)
);


-- drop table cryptography cascade;

create table cryptography (
	cry_use_cod bigint not null,
	cry_key varchar,
	constraint cryptography_cry_use_cod_pkey primary key (cry_use_cod),
	constraint cryptography_cry_use_cod_fkey foreign key (cry_use_cod) references "user" (use_cod) initially deferred,
	constraint cryptography_cry_key_ukey unique (cry_key)
);


-- drop table manufacturer cascade;

create table manufacturer (
    man_cod bigint not null generated by default as identity,
    man_name varchar not null,
    constraint manufacturer_man_cod_pkey primary key (man_cod),
	constraint manufacturer_man_name_ukey unique (man_name)
);

insert into manufacturer (man_name) values 
	('Desconhecido'), ('Acura'), ('Alfa Romeo'), ('Aston Martin'), ('Audi'), ('BMW'),
	('Bentley'), ('Buick'), ('Cadillac'), ('Chevrolet'), ('Chrysler'),
	('Daewoo'), ('Daihatsu'), ('Dodge'), ('Eagle'), ('FIAT'), ('Ferrari'),
	('Fisker'), ('Ford'), ('Freightliner'), ('GMC'), ('Genesis'), ('Geo'),
	('HUMMER'), ('Honda'), ('Hyundai'), ('INFINITI'), ('Isuzu'), ('Jaguar'),
	('Jeep'), ('Kia'), ('Lamborghini'), ('Land Rover'), ('Lexus'), ('Lincoln'),
	('Lotus'), ('MAZDA'), ('MINI'), ('Maserati'), ('Maybach'), ('McLaren'),
	('Mercedes-Benz'), ('Mercury'), ('Mitsubishi'), ('Nissan'), ('Oldsmobile'),
	('Panoz'), ('Plymouth'), ('Polestar'), ('Pontiac'), ('Porsche'), ('Ram'),
	('Rivian'), ('Rolls-Royce'), ('SRT'), ('Saab'), ('Saturn'), ('Scion'),
	('Subaru'), ('Suzuki'), ('Tesla'), ('Toyota'), ('Volkswagen'), ('Volvo');


-- drop table status_type cascade;

create table status_type (
	sty_cod bigint not null generated by default as identity,
	sty_description varchar not null,
	constraint type_status_sty_cod_pkey primary key (sty_cod),
	constraint type_status_sty_description_ukey unique (sty_description)
);

insert into status_type (sty_description)
values ('active'), ('inactive'), ('paused'), ('sold');

-- drop table advertisement cascade;

create table advertisement (
    adv_cod bigint not null generated by default as identity,
    adv_use_cod bigint not null,
    adv_man_cod bigint not null,
    adv_sty_cod bigint not null default 1,
    adv_description varchar,
	adv_brand varchar,
    adv_model_description varchar,
    adv_value double precision,
    adv_favorites integer not null default 0,
    adv_views integer not null default 0,
    adv_year_model integer,
    adv_year_manufacture integer,
	adv_images varchar,
	adv_created_at timestamp with time zone default current_timestamp not null,
	adv_stopped_at timestamp with time zone,
	adv_total_stopped integer not null default 0,
    constraint advertisement_adv_cod_pkey primary key (adv_cod),
    constraint advertisement_adv_use_cod_fkey foreign key (adv_use_cod) references "user" (use_cod),
    constraint advertisement_adv_man_cod_fkey foreign key (adv_man_cod) references manufacturer (man_cod),
    constraint advertisement_adv_sty_cod_fkey foreign key (adv_sty_cod) references status_type (sty_cod)
);


-- drop table favorite cascade;

create table favorite (
    fav_use_cod bigint not null,
    fav_adv_cod bigint not null,
    fav_created_at timestamp with time zone default current_timestamp not null,
    constraint favorite_fav_cod_fav_adv_cod_pkey primary key (fav_use_cod, fav_adv_cod),
    constraint favorite_use_cod_fkey foreign key (fav_use_cod) references "user" (use_cod),
    constraint favorite_adv_cod_fkey foreign key (fav_adv_cod) references advertisement (adv_cod)
);


-- drop table chat cascade;

create table chat (
	cha_cod bigint not null generated by default as identity,
	cha_use_cod bigint not null,
	cha_adv_cod bigint not null,
	cha_created_at timestamp with time zone default current_timestamp not null,
	constraint chat_cha_cod_pkey primary key (cha_cod),
    constraint chat_cha_use_cod_fkey foreign key (cha_use_cod) references "user" (use_cod),
	constraint chat_cha_adv_cod_fkey foreign key (cha_adv_cod) references advertisement (adv_cod),
	constraint chat_cha_use_cod_cha_adv_cod_ukey unique (cha_use_cod, cha_adv_cod)
);

-- drop table message cascade;

create table message (
    mes_cod bigint not null generated by default as identity,
    mes_use_cod bigint not null,
    mes_cha_cod bigint not null,
    mes_text varchar not null,
    mes_created_at timestamp with time zone default current_timestamp not null,
    constraint message_mes_cod_pkey primary key (mes_cod),
    constraint message_use_cod_fkey foreign key (mes_use_cod) references "user" (use_cod),
	constraint message_cha_cod_fkey foreign key (mes_cha_cod) references chat (cha_cod)
);

-- ##################### ends tables ######################## --



-- ##################### starts indexes ######################## --

create index message_use_cod_fkey_cha_cod_fkey on message using btree (mes_use_cod, mes_cha_cod);


create index advertisement_adv_use_cod_fkey on advertisement using btree (adv_use_cod);
create index advertisement_adv_man_cod_fkey on advertisement using btree (adv_man_cod);
create index advertisement_adv_sty_cod_fkey on advertisement using btree (adv_sty_cod);

-- ##################### ends indexes ######################## --



-- ##################### starts triggers ######################## --

create or replace function delete_cryptography()
returns trigger as $$
begin
	update advertisement set adv_sty_cod = 2
	where adv_use_cod = old.cry_use_cod;
	return old;
end;
$$ language plpgsql;
create trigger trg_delete_cryptography
before delete on cryptography
for each row
execute procedure delete_cryptography();


create or replace function insert_favorite()
returns trigger as $$
begin
	update advertisement set adv_favorites = adv_favorites + 1
	where adv_cod = new.fav_adv_cod;
	return new;
end;
$$ language plpgsql;
create trigger trg_insert_favorite
before insert on favorite
for each row
execute procedure insert_favorite();


create or replace function delete_favorite()
returns trigger as $$
begin
	update advertisement set adv_favorites = adv_favorites - 1
	where adv_cod = old.fav_adv_cod;
	return old;
end;
$$ language plpgsql;
create trigger trg_delete_favorite
before delete on favorite
for each row
execute procedure delete_favorite();


create or replace function register_user()
returns trigger as $$
declare
	random_key varchar := crypt(gen_random_uuid()::varchar, gen_salt('bf', 10));
begin
	insert into cryptography(cry_use_cod, cry_key) values (new.use_cod, random_key);
  	new.use_name := encrypt(new.use_name::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_document := encrypt(new.use_document::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_nickname := encrypt(new.use_nickname::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_phone := encrypt(new.use_phone::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_address := encrypt(new.use_address::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_email := encrypt(new.use_email::bytea, random_key::bytea, 'aes')::varchar;
	new.use_password := sha256((new.use_password || random_key)::bytea)::varchar;
	return new;
end;
$$ language plpgsql;
create trigger trg_register_user
before insert on "user"
for each row
execute procedure register_user();


create or replace function update_user()
returns trigger as $$
declare
	cry_key varchar := (select cry_key from cryptography where cry_use_cod = new.use_cod);
begin
	if new.use_name not like '\\x%' then
		new.use_name := encrypt(new.use_name::bytea, cry_key::bytea, 'aes')::varchar;
	end if;

	if new.use_document not like '\\x%' then
  		new.use_document := encrypt(new.use_document::bytea, cry_key::bytea, 'aes')::varchar;
  	end if;

	if new.use_nickname not like '\\x%' then
  		new.use_nickname := encrypt(new.use_nickname::bytea, cry_key::bytea, 'aes')::varchar;
  	end if;
  
  	if new.use_phone not like '\\x%' then
  		new.use_phone := encrypt(new.use_phone::bytea, cry_key::bytea, 'aes')::varchar;
  	end if;

  	if new.use_address not like '\\x%' then
  		new.use_address := encrypt(new.use_address::bytea, cry_key::bytea, 'aes')::varchar;
  	end if;
  
  	if new.use_email not like '\\x%' then
  		new.use_email := encrypt(new.use_email::bytea, cry_key::bytea, 'aes')::varchar;
  	end if;
  
  	if new.use_password not like '\\x%' then
		new.use_password := sha256((new.use_password || cry_key)::bytea)::varchar;
	end if;

	return new;
end;
$$ language plpgsql;
create trigger trg_update_user
before update on "user"
for each row
execute procedure update_user();

-- ##################### ends triggers ######################## --



-- ##################### starts functions ######################## --

create or replace function decrypt_data(encrypted_data varchar, aes_key varchar)
returns varchar as $$
begin
	if aes_key is null then
		return 'unknown';
	else
		return convert_from(decrypt(encrypted_data::bytea, aes_key::bytea, 'aes'), 'utf-8');
	end if;
exception
	when character_not_in_repertoire then
		return 'unknown';
end;
$$ language 'plpgsql';


create or replace function validate_user_access(fun_use_email varchar, fun_use_password varchar)
returns bigint as $$
begin
	return (select u.use_cod from "user" u join cryptography c on u.use_cod = c.cry_use_cod
	where decrypt_data(use_email, c.cry_key) = fun_use_email
	and use_password = sha256((fun_use_password || c.cry_key)::bytea)::varchar limit 1);
end
$$ language 'plpgsql';


create or replace function get_user_cod_by_email(fun_use_email varchar)
returns bigint as $$
begin
	return (select u.use_cod from "user" u join cryptography c on u.use_cod = c.cry_use_cod
	where decrypt_data(use_email, c.cry_key) = fun_use_email limit 1);
end
$$ language 'plpgsql';


create or replace function decrypt_user(fun_use_cod bigint)
returns table (
	use_cod bigint,
	use_name varchar,
	use_is_cpf_document boolean,
	use_document varchar,
	use_nickname varchar,
	use_phone varchar,
	use_address varchar,
	use_email varchar,
	use_is_temp_password boolean,
	use_password varchar,
	use_is_admin boolean,
	use_created_at timestamp with time zone
) as $$
declare
    user_data record;
begin
    for user_data in (select * from "user" u join cryptography c ON u.use_cod = c.cry_use_cod where u.use_cod = fun_use_cod)
    loop
        use_cod := user_data.use_cod;
		use_name := decrypt_data(user_data.use_name, user_data.cry_key);
		use_is_cpf_document := user_data.use_is_cpf_document;
		use_document := decrypt_data(user_data.use_document, user_data.cry_key);
		use_nickname := decrypt_data(user_data.use_nickname, user_data.cry_key);
		use_phone := decrypt_data(user_data.use_phone, user_data.cry_key);
		use_address := decrypt_data(user_data.use_address, user_data.cry_key);
		use_email := decrypt_data(user_data.use_email, user_data.cry_key);
		use_password := user_data.use_password;
		use_is_temp_password := user_data.use_is_temp_password;
		use_is_admin := user_data.use_is_admin;
		use_created_at := user_data.use_created_at;
        return next;
    end loop;
end;
$$ language 'plpgsql';


create or replace function decrypt_users()
returns table (
	use_cod bigint,
	use_name varchar,
	use_is_cpf_document boolean,
	use_document varchar,
	use_nickname varchar,
	use_phone varchar,
	use_address varchar,
	use_email varchar,
	use_is_temp_password boolean,
	use_password varchar,
	use_is_admin boolean,
	use_created_at timestamp with time zone
) as $$
declare
    user_data record;
begin
    for user_data in (select * from "user" u join cryptography c ON u.use_cod = c.cry_use_cod)
    loop
        use_cod := user_data.use_cod;
		use_name := decrypt_data(user_data.use_name, user_data.cry_key);
		use_is_cpf_document := user_data.use_is_cpf_document;
		use_document := decrypt_data(user_data.use_document, user_data.cry_key);
		use_nickname := decrypt_data(user_data.use_nickname, user_data.cry_key);
		use_phone := decrypt_data(user_data.use_phone, user_data.cry_key);
		use_address := decrypt_data(user_data.use_address, user_data.cry_key);
		use_email := decrypt_data(user_data.use_email, user_data.cry_key);
		use_password := user_data.use_password;
		use_is_temp_password := user_data.use_is_temp_password;
		use_is_admin := user_data.use_is_admin;
		use_created_at := user_data.use_created_at;
        return next;
    end loop;
end;
$$ language 'plpgsql';


create or replace function user_email_exists(fun_use_email varchar)
returns boolean as $$
begin
    return exists (select u.use_cod from "user" u join cryptography c on u.use_cod = c.cry_use_cod
	where decrypt_data(use_email, c.cry_key) = fun_use_email limit 1);
end;
$$ language 'plpgsql';


create or replace function user_document_exists(fun_use_document varchar)
returns boolean as $$
begin
    return exists (select u.use_cod from "user" u join cryptography c on u.use_cod = c.cry_use_cod
	where decrypt_data(use_document, c.cry_key) = fun_use_document limit 1);
end;
$$ language 'plpgsql';

-- ##################### ends functions ######################## --



-- ##################### starts queries ######################## --

insert into "user"
	(use_name, use_is_cpf_document, use_document, use_nickname, 
		use_phone, use_address, use_email, use_is_temp_password, use_password, use_is_admin)
values 
	('admin', true, '93194008064', 'admin', '129000000', 
		'Rua 1, Avenida 2, São José dos Campos-SP', 'admin@admin.com', false, 'admin', true),
	('user', false, '38086451000166', 'user', '129000000', 
		'Rua 1, Avenida 2, São José dos Campos-SP', 'user@user.com', false, 'user', false);

insert into advertisement
    (adv_use_cod, adv_man_cod, adv_sty_cod, adv_description, adv_brand, adv_model_description, adv_value,
    adv_favorites, adv_views, adv_year_model, adv_year_manufacture, adv_images)
values
 (1, 5, 1, null, null, 'Q3', 135900.0, 0, 0, 2017, 2016, '/q3.jpg'),
 (1, 44, 1, null, null, 'Outlander', 100900.0, 0, 0, 2016, 2015, '/outlander.jpg'),
 (1, 63, 1, null, null, 'Jetta', 68900.0, 0, 0, 2014, 1014, '/Jetta.jpg'),
 (1, 30, 2, null, null, 'Renegade', 82900.0, 0, 0, 2016, 2016, '/renegade.jpg'),
 (1, 25, 3, null, null, 'HR-V', 99900.0, 0, 0, 2017, 2016, '/hrv.jpg'),
 (1, 26, 3, null, null, 'HB20', 61900.0, 0, 0, 2019, 2019, '/hb20.jpg'),
 (1, 14, 4, null, null, 'Journey', 67900.0, 0, 0, 2013, 2012, '/journey.jpeg'),
 (1, 31, 1, null, null, 'Sportage', 89900.0, 0, 0, 2015, 2014, '/sportage.jpg'),
 (1, 45, 4, null, null, 'Kicks', 114900.0, 0, 0, 2020, 2019, '/kicks.jpg'),
 (1, 33, 1, null, null, 'Range Rover Evoque', 174900.0, 0, 0, 2015, 2014, '/evoque.jpg'),
 (1, 42, 2, null, null, 'Gle-400', 503900.0, 0, 0, 2019, 2018, '/gle-400.jpg'),
 (1, 51, 1, null, null, '911', 1250000.0, 0, 0, 2021, 2021, '/911.jpg');


-- ##################### ends queries ######################## --
