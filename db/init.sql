CREATE TABLE writers (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    profile_pic VARCHAR(100) NOT NULL,
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content VARCHAR(50000) NOT NULL,
    img VARCHAR(200),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),     
    writer_id INTEGER REFERENCES writers(id)      
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_body VARCHAR (1500) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    commentor_id INTEGER REFERENCES writers(id),
    post_id INTEGER REFERENCES posts(id)
);