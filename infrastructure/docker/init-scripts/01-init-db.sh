#!/bin/bash
# PostgreSQL initialization script for FieldDay

set -e

# Create PostGIS extension
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Enable PostGIS for geospatial queries
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
    
    -- Enable UUID generation
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Enable pg_cron for scheduled tasks
    CREATE EXTENSION IF NOT EXISTS pg_cron;
    
    -- Create schemas
    CREATE SCHEMA IF NOT EXISTS auth;
    CREATE SCHEMA IF NOT EXISTS sessions;
    CREATE SCHEMA IF NOT EXISTS users;
    CREATE SCHEMA IF NOT EXISTS payments;
    CREATE SCHEMA IF NOT EXISTS messaging;
    
    GRANT ALL PRIVILEGES ON SCHEMA auth TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA sessions TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA users TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA payments TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON SCHEMA messaging TO $POSTGRES_USER;
EOSQL

echo "FieldDay database initialized successfully!"
