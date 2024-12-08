CREATE EXTENSION timeseries CASCADE;

-- Jakarta
CREATE TABLE IF NOT EXISTS "jakarta_temperatures" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "value" smallint NOT NULL
) PARTITION BY RANGE (created_at);
SELECT enable_ts_table('jakarta_temperatures');
CREATE INDEX IF NOT EXISTS "jakarta_temperatures_created_at_idx" ON "jakarta_temperatures" ("created_at");
CREATE OR REPLACE FUNCTION insert_jakarta_temperature()
RETURNS VOID AS $$
BEGIN
    INSERT INTO jakarta_temperatures (value)
    VALUES (floor(random() * 100)::smallint);
END;
$$ LANGUAGE plpgsql;
SELECT cron.schedule('insert_jakarta_temperature', '5 seconds', 'SELECT insert_jakarta_temperature()');

-- Singapore
CREATE TABLE IF NOT EXISTS "singapore_temperatures" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "value" smallint NOT NULL
) PARTITION BY RANGE (created_at);
SELECT enable_ts_table('singapore_temperatures');
CREATE INDEX IF NOT EXISTS "singapore_temperatures_created_at_idx" ON "singapore_temperatures" ("created_at");
CREATE OR REPLACE FUNCTION insert_singapore_temperature()
RETURNS VOID AS $$
BEGIN
    INSERT INTO singapore_temperatures (value)
    VALUES (floor(random() * 100)::smallint);
END;
$$ LANGUAGE plpgsql;
SELECT cron.schedule('insert_singapore_temperature', '5 seconds', 'SELECT insert_singapore_temperature()');

-- Sydney
CREATE TABLE IF NOT EXISTS "sydney_temperatures" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "value" smallint NOT NULL
) PARTITION BY RANGE (created_at);
SELECT enable_ts_table('sydney_temperatures');
CREATE INDEX IF NOT EXISTS "sydney_temperatures_created_at_idx" ON "sydney_temperatures" ("created_at");
CREATE OR REPLACE FUNCTION insert_sydney_temperature()
RETURNS VOID AS $$
BEGIN
    INSERT INTO sydney_temperatures (value)
    VALUES (floor(random() * 100)::smallint);
END;
$$ LANGUAGE plpgsql;
SELECT cron.schedule('insert_sydney_temperature', '5 seconds', 'SELECT insert_sydney_temperature()');

SELECT cron.schedule('0 0 * * *', $$
    BEGIN
        DELETE FROM jakarta_temperatures WHERE created_at < CURRENT_DATE;
        DELETE FROM singapore_temperatures WHERE created_at < CURRENT_DATE;
        DELETE FROM sydney_temperatures WHERE created_at < CURRENT_DATE;
        RAISE NOTICE 'Daily deletion completed';
    END;
$$);
