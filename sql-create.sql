--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: listvocab; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.listvocab (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    user_id integer
);


ALTER TABLE public.listvocab OWNER TO postgres;

--
-- Name: listvocab_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.listvocab_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.listvocab_id_seq OWNER TO postgres;

--
-- Name: listvocab_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.listvocab_id_seq OWNED BY public.listvocab.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: vocab; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vocab (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    meaning character varying(300) NOT NULL,
    list_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.vocab OWNER TO postgres;

--
-- Name: vocab_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vocab_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vocab_id_seq OWNER TO postgres;

--
-- Name: vocab_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vocab_id_seq OWNED BY public.vocab.id;


--
-- Name: listvocab id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listvocab ALTER COLUMN id SET DEFAULT nextval('public.listvocab_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: vocab id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vocab ALTER COLUMN id SET DEFAULT nextval('public.vocab_id_seq'::regclass);

-- Data for Name: listvocab; Type: TABLE DATA; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.listvocab_id_seq', 39, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- Name: vocab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vocab_id_seq', 219, true);


--
-- Name: listvocab listvocab_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listvocab
    ADD CONSTRAINT listvocab_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: vocab vocab_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vocab
    ADD CONSTRAINT vocab_pkey PRIMARY KEY (id);


--
-- Name: listvocab fk_listvocab_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.listvocab
    ADD CONSTRAINT fk_listvocab_users FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: vocab vocab_list_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vocab
    ADD CONSTRAINT vocab_list_id_fkey FOREIGN KEY (list_id) REFERENCES public.listvocab(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

