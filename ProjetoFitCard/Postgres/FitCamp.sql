--	-------------
--	POSTGRES
--	-------------

--	---------------------------------
--	TABELAS AUXILIARES
--	---------------------------------

CREATE TABLE status
(
  seq serial NOT NULL,
  descricao character varying(60) NOT NULL DEFAULT ''::character varying,
  CONSTRAINT pk_status PRIMARY KEY (seq)
);

INSERT INTO status (descricao) VALUES 
('Ativo'),
('Inativo');

CREATE TABLE categorias
(
  seq serial NOT NULL,
  descricao character varying(60) NOT NULL DEFAULT ''::character varying,
  CONSTRAINT pk_categorias PRIMARY KEY (seq)
);

INSERT INTO categorias (descricao) VALUES 
('Supermercado'),
('Restaurante'),
('Borracharia'),
('Posto'),
('Oficina');

--	---------------------------------
--	TABELA DO PROCESSO
--	---------------------------------

CREATE TABLE estabelecimentos
(
  seq serial NOT NULL,
  razao_social character varying(60) NOT NULL DEFAULT ''::character varying,
  nome_fantasia character varying(60) DEFAULT ''::character varying,
  cnpj character varying(14) NOT NULL DEFAULT ''::character varying,
  email character varying(120) DEFAULT ''::character varying,
  endereco character varying(150) DEFAULT ''::character varying,
  cidade character varying(60) DEFAULT ''::character varying,
  estado character varying(2) DEFAULT ''::character varying,
  telefone character varying(20) DEFAULT ''::character varying,
  id_categoria smallint DEFAULT 0,
  id_status smallint DEFAULT 0,
  data_inclusao date DEFAULT ('now'::text)::date,
  agencia character varying(10) DEFAULT ''::character varying,
  conta character varying(10) DEFAULT ''::character varying,
  CONSTRAINT pk_estabelecimentos PRIMARY KEY (seq),
  CONSTRAINT fk_categorias FOREIGN KEY (id_categoria)
      REFERENCES categorias (seq) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_status FOREIGN KEY (id_status)
      REFERENCES status (seq) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

--	---------------------------------
--	LOG DO PROCESSO
--	---------------------------------

CREATE TABLE auditoria_estabelecimentos
(
  seq_aud serial NOT NULL,
  schema_name text NOT NULL,
  table_name text NOT NULL,
  user_name text,
  maqaud character varying(40),
  acao_tstamp timestamp with time zone NOT NULL DEFAULT now(),
  "action" text NOT NULL,
  dado_original text,
  dado_novo text,
  query text,
  seq smallint NOT NULL DEFAULT 0,  
  razao_social character varying(60) NOT NULL DEFAULT ''::character varying,
  nome_fantasia character varying(60) DEFAULT ''::character varying,
  cnpj character varying(14) NOT NULL DEFAULT ''::character varying,
  email character varying(120) DEFAULT ''::character varying,
  endereco character varying(150) DEFAULT ''::character varying,
  cidade character varying(60) DEFAULT ''::character varying,
  estado character varying(2) DEFAULT ''::character varying,
  telefone character varying(20) DEFAULT ''::character varying,
  id_categoria smallint DEFAULT 0,
  id_status smallint DEFAULT 0,
  data_inclusao date DEFAULT ('now'::text)::date,
  agencia character varying(10) DEFAULT ''::character varying,
  conta character varying(10) DEFAULT ''::character varying,
  CONSTRAINT auditoria_auditoria_estabelecimentos PRIMARY KEY (seq_aud),
  CONSTRAINT auditoria_estabelecimentos_action_check CHECK (action = ANY (ARRAY['I'::text, 'D'::text, 'U'::text]))
);

CREATE OR REPLACE FUNCTION prc_auditoria_estabelecimentos()
  RETURNS trigger AS
$BODY$
DECLARE
	_DTHAUD     timestamp;     -- data hora da ação
	_USUAUD     name;          -- usuario da ação
	_MAQAUD     TEXT;          -- ip da máquina que fez a ação
	_CURRSQL    TEXT;
	v_old_data TEXT;
	v_new_data TEXT;
BEGIN
    --// INICIALIZA VARIÁVEIS
	_DTHAUD := current_timestamp;  -- pega a data/hora atual
	_MAQAUD := inet_client_addr()::text; -- pega o ip da máquina que praticou a ação
	_USUAUD := current_user::text;       -- pega o usuário que praticou a ação
	_CURRSQL := (select current_query from pg_stat_activity WHERE procpid = pg_backend_pid());
	
--// Se por acidente a trigger for atribuida a própria tabela de auditoria finaliza sem fazer nada.
IF (TG_TABLE_NAME = 'auditoria_estabelecimento') THEN
	RETURN NULL;
END IF; 
IF (TG_OP = 'UPDATE') THEN
	v_old_data := ROW(OLD.*);
	v_new_data := ROW(NEW.*);
	INSERT INTO auditoria_estabelecimentos(seq, razao_social, nome_fantasia, cnpj, email, endereco, cidade, estado, telefone, id_categoria, id_status, data_inclusao, conta, agencia,schema_name,table_name,user_name,maqaud,action,dado_original,dado_novo,query)
	VALUES (NEW.seq, NEW.razao_social, NEW.nome_fantasia, NEW.cnpj, NEW.email, NEW.endereco, NEW.cidade, NEW.estado, NEW.telefone, NEW.id_categoria, NEW.id_status, NEW.data_inclusao, NEW.conta, NEW.agencia,TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,_USUAUD,_MAQAUD, substring(TG_OP,1,1),v_old_data,v_new_data, _CURRSQL);
ELSIF (TG_OP = 'DELETE') THEN
	v_old_data := ROW(OLD.*);
	INSERT INTO auditoria_estabelecimentos(seq, razao_social, nome_fantasia, cnpj, email, endereco, cidade, estado, telefone, id_categoria, id_status, data_inclusao, conta, agencia,schema_name,table_name,user_name,maqaud,action,dado_original,query)
	VALUES (OLD.seq, OLD.razao_social, OLD.nome_fantasia, OLD.cnpj, OLD.email, OLD.endereco, OLD.cidade, OLD.estado, OLD.telefone, OLD.id_categoria, OLD.id_status, OLD.data_inclusao, OLD.conta, OLD.agencia,TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,_USUAUD,_MAQAUD, substring(TG_OP,1,1),v_old_data, _CURRSQL);       
ELSIF (TG_OP = 'INSERT') THEN
	v_new_data := ROW(NEW.*);
	INSERT INTO auditoria_estabelecimentos(seq, razao_social, nome_fantasia, cnpj, email, endereco, cidade, estado, telefone, id_categoria, id_status, data_inclusao, conta, agencia,schema_name,table_name,user_name,maqaud,action,dado_novo,query)
	VALUES (NEW.seq, NEW.razao_social, NEW.nome_fantasia, NEW.cnpj, NEW.email, NEW.endereco, NEW.cidade, NEW.estado, NEW.telefone, NEW.id_categoria, NEW.id_status, NEW.data_inclusao, NEW.conta, NEW.agencia,TG_TABLE_SCHEMA::TEXT,TG_TABLE_NAME::TEXT,_USUAUD,_MAQAUD, substring(TG_OP,1,1),v_new_data, _CURRSQL);       
ELSE
	RAISE WARNING '[AUDIT.IF_MODIFIED_FUNC] - Other action occurred: %, at %',TG_OP,now();
END IF;
	
RETURN NULL;
 
EXCEPTION
WHEN data_exception THEN
	RAISE WARNING '[auditoria_estabelecimentos] - UDF ERROR [DATA EXCEPTION] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
	RETURN NULL;
WHEN unique_violation THEN
	RAISE WARNING '[auditoria_estabelecimentos] - UDF ERROR [UNIQUE] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
	RETURN NULL;
WHEN OTHERS THEN
	RAISE WARNING '[auditoria_estabelecimentos] - UDF ERROR [OTHER] - SQLSTATE: %, SQLERRM: %',SQLSTATE,SQLERRM;
	RETURN NULL;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;


CREATE TRIGGER trg_estabelecimentos_audit
  AFTER INSERT OR UPDATE OR DELETE
  ON estabelecimentos
  FOR EACH ROW
  EXECUTE PROCEDURE prc_auditoria_estabelecimentos();