create or replace function validar_acesso_usuario(fun_usu_email varchar, fun_usu_senha varchar)
returns boolean as $$
begin
	return exists (select true from usuario u join criptografia c on u.usu_cod = c.cri_usu_cod
	where descriptografar(usu_email, c.cri_chave) = fun_usu_email
	and usu_senha = sha256((fun_usu_senha || c.cri_chave)::bytea)::varchar);
end
$$ language 'plpgsql';
