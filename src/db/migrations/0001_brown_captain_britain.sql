CREATE TABLE IF NOT EXISTS "user_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"api_key" text NOT NULL,
	"provider" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"metadata" timestamp DEFAULT now(),
	CONSTRAINT "user_config_user_id_unique" UNIQUE("user_id")
);
