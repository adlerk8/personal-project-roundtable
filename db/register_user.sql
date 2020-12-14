INSERT INTO writers (username, password, profile_pic)
VALUES ($1, $2, 'https://randomwordgenerator.com/picture.php')
RETURNING *;