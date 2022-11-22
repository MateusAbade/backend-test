-- Table: public.Investimentos

-- DROP TABLE IF EXISTS public."Investimentos";

CREATE TABLE IF NOT EXISTS public."Investimentos"
(
    "Id" integer NOT NULL DEFAULT nextval('"Invertimentos_Id_seq"'::regclass),
    "Investimento" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "Proprietario" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "DataCriacao" date NOT NULL,
    "ValorInicial" double precision NOT NULL,
    "Saldo" double precision,
    CONSTRAINT "Invertimentos_pkey" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Investimentos"
    OWNER to postgres;