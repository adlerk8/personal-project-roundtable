INSERT INTO posts
(title, content, img, writer_id, created_at)
VALUES ($1, $2, $3, $4)
RETURNING *;