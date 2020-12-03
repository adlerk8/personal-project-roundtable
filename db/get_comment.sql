SELECT * FROM comments
JOIN posts ON comments.id = posts.id
WHERE posts.id = $1;