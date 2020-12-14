SELECT comments.comment_body, comments.created_at, writers.username, writers.profile_pic FROM comments
JOIN writers ON comments.commentor_id = writers.id
WHERE comments.post_id = $1;