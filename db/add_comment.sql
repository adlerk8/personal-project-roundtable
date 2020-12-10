INSERT INTO comments
(comment_body, created_at, post_id, commentor_id)
VALUES ($2, CURRENT_TIMESTAMP, $1, $3)
RETURNING *;