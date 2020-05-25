CREATE TABLE public.marca (
                id_marca INTEGER NOT NULL,
                nm_marca VARCHAR(30) NOT NULL,
                fg_ativo CHAR(1) NOT NULL,
                dt_inclusao TIMESTAMP NOT NULL,
                dt_alteracao TIMESTAMP NOT NULL,
                CONSTRAINT pk_marca PRIMARY KEY (id_marca)
);