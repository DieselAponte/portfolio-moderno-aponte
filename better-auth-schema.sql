-- =============================================================================
-- BETTER AUTH 1.6.23 - POSTGRESQL SCHEMA
-- Plugins: admin(), dash()
-- =============================================================================

-- 1. Table: user
-- Almacena la información principal de los usuarios y metadatos del admin() plugin.
CREATE TABLE "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL,
  "image" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  -- admin() plugin fields
  "role" text,
  "banned" boolean,
  "banReason" text,
  "banExpires" timestamp
);

-- 2. Table: session
-- Gestiona las sesiones activas de cada usuario, tokens de sesión y metadatos de suplantación.
CREATE TABLE "session" (
  "id" text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token" text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL,
  "ipAddress" text,
  "userAgent" text,
  "userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  -- admin() plugin fields
  "impersonatedBy" text
);

-- 3. Table: account
-- Almacena las cuentas sociales (OAuth como GitHub, Google) vinculadas a un usuario.
CREATE TABLE "account" (
  "id" text PRIMARY KEY,
  "accountId" text NOT NULL,
  "providerId" text NOT NULL,
  "userId" text NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope" text,
  "password" text,
  "createdAt" timestamp NOT NULL,
  "updatedAt" timestamp NOT NULL
);

-- 4. Table: verification
-- Utilizada para flujos de verificación (e.g. magic links, reseteo de contraseña).
CREATE TABLE "verification" (
  "id" text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) PARA BETTER AUTH
-- =============================================================================
-- Habilitar RLS asegurando que "user" esté entre comillas dobles
-- por ser una palabra reservada en PostgreSQL.

ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification" ENABLE ROW LEVEL SECURITY;
