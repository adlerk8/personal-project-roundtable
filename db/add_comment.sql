INSERT INTO comments
(comment_body, created_at, commentor_id, post_id)
VALUES ($2)
WHERE post_id = $1
RETURNING *;