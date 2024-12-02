CREATE TABLE IF NOT EXISTS "visitors" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    "value" smallint NOT NULL
) PARTITION BY RANGE (created_at);

CREATE OR REPLACE FUNCTION insert_visitor_data()
RETURNS VOID AS $$
BEGIN
    INSERT INTO visitors (value)
    VALUES (floor(random() * 100)::smallint);
END;
$$ LANGUAGE plpgsql;

SELECT cron.schedule('5 seconds', 'SELECT insert_visitor_data()');
