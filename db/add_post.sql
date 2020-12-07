INSERT INTO posts
(title, content, img, writer_id, created_at)
VALUES ($1, $2, $3, $4);

-- I want it to redirect to home here, but not sure if that should happen on the backend, the front end or both?