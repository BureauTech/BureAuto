drop function validar_acesso_usuario(fun_usu_email varchar, fun_usu_senha varchar);

create or replace function validar_acesso_usuario(fun_usu_email varchar, fun_usu_senha varchar)
returns bigint as $$
begin
	return (select u.usu_cod from usuario u join criptografia c on u.usu_cod = c.cri_usu_cod
	where descriptografar(usu_email, c.cri_chave) = fun_usu_email
	and usu_senha = sha256((fun_usu_senha || c.cri_chave)::bytea)::varchar limit 1);
end
$$ language 'plpgsql';


create or replace function get_user_cod_by_email(fun_usu_email varchar)
returns bigint as $$
begin
	return (select u.usu_cod from usuario u join criptografia c on u.usu_cod = c.cri_usu_cod
	where descriptografar(usu_email, c.cri_chave) = fun_usu_email limit 1);
end
$$ language 'plpgsql';


drop function descriptografar_usuario(fun_usu_cod bigint);

create or replace function descriptografar_usuario(fun_usu_cod bigint)
returns table (
	usu_cod bigint,
	usu_nome varchar,
	usu_is_cpf boolean,
	usu_documento varchar,
	usu_apelido varchar,
	usu_telefone varchar,
	usu_endereco varchar,
	usu_email varchar,
	usu_senha varchar,
	usu_is_temp boolean
) as $$
declare
    usuario record;
begin
    for usuario in (select * from usuario u join criptografia c ON u.usu_cod = c.cri_usu_cod where u.usu_cod = fun_usu_cod)
    loop
        usu_cod := usuario.usu_cod;
		usu_nome := descriptografar(usuario.usu_nome, usuario.cri_chave);
		usu_is_cpf := usuario.usu_is_cpf;
		usu_documento := descriptografar(usuario.usu_documento, usuario.cri_chave);
		usu_apelido := descriptografar(usuario.usu_apelido, usuario.cri_chave);
		usu_telefone := descriptografar(usuario.usu_telefone, usuario.cri_chave);
		usu_endereco := descriptografar(usuario.usu_endereco, usuario.cri_chave);
		usu_email := descriptografar(usuario.usu_email, usuario.cri_chave);
		usu_senha := usuario.usu_senha;
		usu_is_temp := usuario.usu_is_temp;
        return next;
    end loop;
end;
$$ language 'plpgsql';


drop function descriptografar_usuarios();

create or replace function descriptografar_usuarios()
returns table (
	usu_cod bigint,
	usu_nome varchar,
	usu_is_cpf boolean,
	usu_documento varchar,
	usu_apelido varchar,
	usu_telefone varchar,
	usu_endereco varchar,
	usu_email varchar,
	usu_senha varchar,
	usu_is_temp boolean
) as $$
declare
    usuario record;
begin
    for usuario in (select * from usuario u join criptografia c ON u.usu_cod = c.cri_usu_cod)
    loop
        usu_cod := usuario.usu_cod;
		usu_nome := descriptografar(usuario.usu_nome, usuario.cri_chave);
		usu_is_cpf := usuario.usu_is_cpf;
		usu_documento := descriptografar(usuario.usu_documento, usuario.cri_chave);
		usu_apelido := descriptografar(usuario.usu_apelido, usuario.cri_chave);
		usu_telefone := descriptografar(usuario.usu_telefone, usuario.cri_chave);
		usu_endereco := descriptografar(usuario.usu_endereco, usuario.cri_chave);
		usu_email := descriptografar(usuario.usu_email, usuario.cri_chave);
		usu_senha := usuario.usu_senha;
		usu_is_temp := usuario.usu_is_temp;
        return next;
    end loop;
end;
$$ language 'plpgsql';