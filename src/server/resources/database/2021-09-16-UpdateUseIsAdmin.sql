drop function decrypt_user(fun_use_cod bigint);

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
    use_is_admin boolean
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
        return next;
    end loop;
end;
$$ language 'plpgsql';


drop function decrypt_users();

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
    use_is_admin boolean
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
        return next;
    end loop;
end;
$$ language 'plpgsql';