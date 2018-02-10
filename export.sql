--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE category (
    category_id integer NOT NULL,
    name character varying(250)
);


ALTER TABLE category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE category_category_id_seq OWNED BY category.category_id;


--
-- Name: job; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE job (
    job_id integer NOT NULL,
    name character varying(250),
    category_id integer,
    location_id integer
);


ALTER TABLE job OWNER TO postgres;

--
-- Name: job_job_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE job_job_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE job_job_id_seq OWNER TO postgres;

--
-- Name: job_job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE job_job_id_seq OWNED BY job.job_id;


--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE location (
    location_id integer NOT NULL,
    name character varying(250),
    address character varying(500)
);


ALTER TABLE location OWNER TO postgres;

--
-- Name: location_location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE location_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE location_location_id_seq OWNER TO postgres;

--
-- Name: location_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE location_location_id_seq OWNED BY location.location_id;


--
-- Name: shift; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE shift (
    shift_id integer NOT NULL,
    employee_id integer,
    date timestamp without time zone,
    start_time timestamp without time zone,
    end_time timestamp without time zone,
    location character varying(120),
    category_id integer,
    complete boolean
);


ALTER TABLE shift OWNER TO postgres;

--
-- Name: shift_shift_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE shift_shift_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE shift_shift_id_seq OWNER TO postgres;

--
-- Name: shift_shift_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE shift_shift_id_seq OWNED BY shift.shift_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    employee_id integer NOT NULL,
    first_name character varying(80),
    last_name character varying(80),
    phone_number character varying(20),
    email_address character varying(120)
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: user_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_employee_id_seq OWNER TO postgres;

--
-- Name: user_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_employee_id_seq OWNED BY "user".employee_id;


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category ALTER COLUMN category_id SET DEFAULT nextval('category_category_id_seq'::regclass);


--
-- Name: job job_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job ALTER COLUMN job_id SET DEFAULT nextval('job_job_id_seq'::regclass);


--
-- Name: location location_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location ALTER COLUMN location_id SET DEFAULT nextval('location_location_id_seq'::regclass);


--
-- Name: shift shift_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY shift ALTER COLUMN shift_id SET DEFAULT nextval('shift_shift_id_seq'::regclass);


--
-- Name: user employee_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN employee_id SET DEFAULT nextval('user_employee_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY category (category_id, name) FROM stdin;
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY job (job_id, name, category_id, location_id) FROM stdin;
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY location (location_id, name, address) FROM stdin;
\.


--
-- Data for Name: shift; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY shift (shift_id, employee_id, date, start_time, end_time, location, category_id, complete) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "user" (employee_id, first_name, last_name, phone_number, email_address) FROM stdin;
0	Eloise	Lowery	+1 (980) 555-2150	eloiselowery@ewaves.com
1	Lorna	Wilkerson	+1 (932) 526-3011	lornawilkerson@ewaves.com
2	Hahn	Reese	+1 (852) 525-2632	hahnreese@ewaves.com
3	Franks	Odonnell	+1 (914) 593-2068	franksodonnell@ewaves.com
4	Gretchen	Cole	+1 (909) 470-2108	gretchencole@ewaves.com
5	Mcbride	Phillips	+1 (956) 518-3400	mcbridephillips@ewaves.com
6	Conley	Gardner	+1 (883) 442-2808	conleygardner@ewaves.com
7	Nixon	Cameron	+1 (929) 502-3739	nixoncameron@ewaves.com
8	Irwin	Sheppard	+1 (830) 562-3794	irwinsheppard@ewaves.com
9	Randall	Oneil	+1 (898) 490-3454	randalloneil@ewaves.com
10	Helga	Spencer	+1 (981) 492-3739	helgaspencer@ewaves.com
11	Shields	Vega	+1 (992) 582-2849	shieldsvega@ewaves.com
12	Malone	Rogers	+1 (881) 583-2133	malonerogers@ewaves.com
13	Holt	Galloway	+1 (843) 496-2522	holtgalloway@ewaves.com
14	Madeleine	Lang	+1 (807) 448-2995	madeleinelang@ewaves.com
15	Yvonne	Moody	+1 (970) 475-2436	yvonnemoody@ewaves.com
16	Mcneil	Vance	+1 (907) 462-3148	mcneilvance@ewaves.com
17	Harding	Griffith	+1 (906) 558-3180	hardinggriffith@ewaves.com
18	Richard	Wade	+1 (883) 585-3136	richardwade@ewaves.com
19	Chrystal	Gallegos	+1 (922) 529-3457	chrystalgallegos@ewaves.com
20	Marion	Jefferson	+1 (862) 487-2581	marionjefferson@ewaves.com
21	Ray	Schmidt	+1 (917) 548-2441	rayschmidt@ewaves.com
22	Alyssa	Velasquez	+1 (945) 535-2562	alyssavelasquez@ewaves.com
23	Bridgett	Spence	+1 (960) 542-2076	bridgettspence@ewaves.com
24	Hickman	England	+1 (975) 576-2477	hickmanengland@ewaves.com
\.


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('category_category_id_seq', 1, false);


--
-- Name: job_job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('job_job_id_seq', 1, false);


--
-- Name: location_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('location_location_id_seq', 1, false);


--
-- Name: shift_shift_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('shift_shift_id_seq', 1, false);


--
-- Name: user_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_employee_id_seq', 1, false);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: job job_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY job
    ADD CONSTRAINT job_pkey PRIMARY KEY (job_id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY location
    ADD CONSTRAINT location_pkey PRIMARY KEY (location_id);


--
-- Name: shift shift_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY shift
    ADD CONSTRAINT shift_pkey PRIMARY KEY (shift_id);


--
-- Name: user user_email_address_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_address_key UNIQUE (email_address);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (employee_id);


--
-- PostgreSQL database dump complete
--

