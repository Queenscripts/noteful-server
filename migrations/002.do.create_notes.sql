CREATE TABLE IF NOT EXISTS "notes" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    content TEXT NOT NULL,
    modified TEXT NOT NULL,
    folderId TEXT NOT NULL
);