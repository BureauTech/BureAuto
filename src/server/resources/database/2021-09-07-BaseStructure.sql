-- ##################### starts modules ######################## --

create extension if not exists pgcrypto;

-- ##################### ends modules ######################## --



-- ##################### starts tabels ######################## --

-- drop table "user" cascade;

create table "user" (
    use_cod bigint not null generated by default as identity,
    use_name varchar not null,
    use_is_cpf_document boolean not null,
    use_document varchar not null,
    use_username varchar not null,
    use_phone varchar not null,
    use_address varchar not null,
    use_email varchar not null,
    use_is_temp_password boolean not null default true,
	use_password varchar not null,
    constraint user_use_cod_pkey primary key (use_cod)
);


-- drop table cryptography;

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
	('Acura'), ('Alfa Romeo'), ('Aston Martin'), ('Audi'), ('BMW'),
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


-- drop table advertisement;

create table advertisement (
    adv_cod bigint not null generated by default as identity,
    adv_use_cod bigint not null,
    adv_man_cod bigint not null,
    adv_brand varchar,
    adv_model varchar,
    adv_value double precision,
    adv_favorites integer not null default 0,
    adv_views integer not null default 0,
    adv_year_model integer,
    adv_year_manufacture integer,
	adv_images bytea[],
	adv_status varchar not null default 'active',
    constraint advertisement_adv_cod_pkey primary key (adv_cod),
    constraint advertisement_adv_cod_fkey foreign key (adv_use_cod) references "user" (use_cod),
    constraint advertisement_adv_man_cod foreign key (adv_man_cod) references manufacturer (man_cod)
);


-- drop table favorite;

create table favorite (
    fav_cod bigint not null generated by default as identity,
    fav_use_cod bigint not null,
    fav_adv_cod bigint not null,
    constraint favorite_fav_cod_pkey primary key (fav_cod),
    constraint favorite_use_cod_fkey foreign key (fav_use_cod) references "user" (use_cod),
    constraint favorite_adv_cod_fkey foreign key (fav_adv_cod) references advertisement (adv_cod)
);


-- drop table chat;

create table chat (
	cha_cod bigint not null generated by default as identity,
	cha_use_cod bigint not null,
	cha_adv_cod bigint not null,
	constraint chat_cha_cod_pkey primary key (cha_cod),
    constraint chat_cha_use_cod_fkey foreign key (cha_use_cod) references "user" (use_cod),
	constraint chat_cha_adv_cod_fkey foreign key (cha_adv_cod) references advertisement (adv_cod)
);

-- drop table message;

create table message (
    mes_cod bigint not null generated by default as identity,
    mes_use_cod bigint not null,
    mes_cha_cod bigint not null,
    mes_text varchar not null,
    constraint message_mes_cod_pkey primary key (mes_cod),
    constraint message_use_cod_fkey foreign key (mes_use_cod) references "user" (use_cod),
	constraint message_cha_cod_fkey foreign key (mes_cha_cod) references chat (cha_cod)
);

-- ##################### ends tabels ######################## --



-- ##################### starts triggers ######################## --

create or replace function register_user()
returns trigger as $$
declare
	random_key varchar := crypt(gen_random_uuid()::varchar, gen_salt('bf', 10));
begin
	insert into cryptography(cry_use_cod, cry_key) values (new.use_cod, random_key);
  	new.use_name := encrypt(new.use_name::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_document := encrypt(new.use_document::bytea, random_key::bytea, 'aes')::varchar;
  	new.use_username := encrypt(new.use_username::bytea, random_key::bytea, 'aes')::varchar;
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

	if new.use_username not like '\\x%' then
  		new.use_username := encrypt(new.use_username::bytea, cry_key::bytea, 'aes')::varchar;
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
	usu_document varchar,
	use_username varchar,
	use_phone varchar,
	use_address varchar,
	use_email varchar,
	use_is_temp_password boolean,
	use_password varchar
) as $$
declare
    user_data record;
begin
    for user_data in (select * from "user" u join cryptography c ON u.use_cod = c.cry_use_cod where u.use_cod = fun_use_cod)
    loop
        use_cod := user_data.use_cod;
		use_name := decrypt_data(user_data.use_name, user_data.cry_key);
		use_is_cpf_document := user_data.use_is_cpf_document;
		usu_document := decrypt_data(user_data.use_document, user_data.cry_key);
		use_username := decrypt_data(user_data.use_username, user_data.cry_key);
		use_phone := decrypt_data(user_data.use_phone, user_data.cry_key);
		use_address := decrypt_data(user_data.use_address, user_data.cry_key);
		use_email := decrypt_data(user_data.use_email, user_data.cry_key);
		use_password := user_data.use_password;
		use_is_temp_password := user_data.use_is_temp_password;
        return next;
    end loop;
end;
$$ language 'plpgsql';


create or replace function decrypt_users()
returns table (
	use_cod bigint,
	use_name varchar,
	use_is_cpf_document boolean,
	usu_document varchar,
	use_username varchar,
	use_phone varchar,
	use_address varchar,
	use_email varchar,
	use_is_temp_password boolean,
	use_password varchar
) as $$
declare
    user_data record;
begin
    for user_data in (select * from "user" u join cryptography c ON u.use_cod = c.cry_use_cod)
    loop
        use_cod := user_data.use_cod;
		use_name := decrypt_data(user_data.use_name, user_data.cry_key);
		use_is_cpf_document := user_data.use_is_cpf_document;
		usu_document := decrypt_data(user_data.use_document, user_data.cry_key);
		use_username := decrypt_data(user_data.use_username, user_data.cry_key);
		use_phone := decrypt_data(user_data.use_phone, user_data.cry_key);
		use_address := decrypt_data(user_data.use_address, user_data.cry_key);
		use_email := decrypt_data(user_data.use_email, user_data.cry_key);
		use_password := user_data.use_password;
		use_is_temp_password := user_data.use_is_temp_password;
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

INSERT INTO "user"
	(use_name, use_is_cpf_document, use_document, use_username,
	 use_phone, use_address, use_email, use_is_temp_password, use_password)
values ('admin', true, '1234567890', 'admin', '129000000',
		'rua dos programadores', 'admin@admin.com', false, 'admin');

-- ##################### ends queries ######################## --
