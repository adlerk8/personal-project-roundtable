SELECT posts.id, posts.title, posts.content, posts.created_at, posts.writer_id, writers.username, writers.profile_pic 
FROM posts 
JOIN writers ON writers.id = posts.writer_id;