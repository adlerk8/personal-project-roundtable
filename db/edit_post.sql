UPDATE posts
SET title = $2
content = $3
img = $4
WHERE id = $1;

SELECT * FROM posts;