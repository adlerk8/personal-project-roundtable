INSERT INTO writers (username, password, profile_pic)
VALUES ($1, $2, 'https://unsplash.com/photos/j1XtUqZffAI')
RETURNING *;