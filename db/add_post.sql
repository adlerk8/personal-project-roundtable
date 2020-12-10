INSERT INTO posts
(title, content, writer_id, created_at)
VALUES ($1, $2, $3)
RETURNING *;