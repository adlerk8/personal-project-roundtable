SELECT posts.title, posts.content, posts.created_at, writers.username, writers.profile_pic FROM posts JOIN writers ON writers.id = posts.writer_id
WHERE posts.id = $1;