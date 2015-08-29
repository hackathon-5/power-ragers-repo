
-----------------------------------------------------------------------
-- users
-----------------------------------------------------------------------

DROP TABLE IF EXISTS "users" CASCADE;

CREATE TABLE "users"
(
    "id" serial NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id"),
    CONSTRAINT "users_u_ce4c89" UNIQUE ("email")
);

-----------------------------------------------------------------------
-- access_tokens
-----------------------------------------------------------------------

DROP TABLE IF EXISTS "access_tokens" CASCADE;

CREATE TABLE "access_tokens"
(
    "id" serial NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token_content" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id")
);

-----------------------------------------------------------------------
-- trucks
-----------------------------------------------------------------------

DROP TABLE IF EXISTS "trucks" CASCADE;

CREATE TABLE "trucks"
(
    "id" serial NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id")
);

-----------------------------------------------------------------------
-- orders
-----------------------------------------------------------------------

DROP TABLE IF EXISTS "orders" CASCADE;

CREATE TABLE "orders"
(
    "id" serial NOT NULL,
    "truck_id" INTEGER NOT NULL,
    "item_name" VARCHAR(255),
    "price" DOUBLE PRECISION NOT NULL,
    "customer_name" VARCHAR(255) NOT NULL,
    "customer_email" VARCHAR(255) NOT NULL,
    "customer_phone_number" INT8 NOT NULL,
    "open" BOOLEAN(255),
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    PRIMARY KEY ("id")
);

ALTER TABLE "access_tokens" ADD CONSTRAINT "access_tokens_fk_69bd79"
    FOREIGN KEY ("user_id")
    REFERENCES "users" ("id");

ALTER TABLE "trucks" ADD CONSTRAINT "trucks_fk_69bd79"
    FOREIGN KEY ("user_id")
    REFERENCES "users" ("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk_f529df"
    FOREIGN KEY ("truck_id")
    REFERENCES "trucks" ("id");
