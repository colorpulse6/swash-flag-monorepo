#!/bin/bash
# db-migrate.sh

# Backup existing database
pg_dump -h $OLD_DB_HOST -U $OLD_DB_USER -d $OLD_DB_NAME -f backup.sql

# Apply to new database
psql -h $NEW_DB_HOST -U $NEW_DB_USER -d $NEW_DB_NAME -f backup.sql

# Run Prisma migrations to ensure schema is up to date
cd apps/backend
pnpm prisma migrate deploy