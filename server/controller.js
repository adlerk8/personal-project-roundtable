const bcrypt = require('bcrypt');

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        
        try {
            const [foundUser] = await db.find_user(username);
            if (foundUser) {
                const comparePassword = foundUser.password;
                const authenticated = bcrypt.compareSync(password, comparePassword);
                if (authenticated) {
                    delete foundUser.password;
                    req.session.user = foundUser;
                    res.status(200).send(req.session.user);
                } else {
                    res.status(401).send("Oops - username or password is incorrect!");
                };
            } else {
                res.status(401).send("Oops - username or password is incorrect!");
            }
        } catch (err) {
            console.log("Database error on login function: ", err);
            res.sendStatus(500);
        }
    },
    register: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

    try {
        const [foundUser] = await db.find_user(username);
        if (foundUser) {
            res.status(401).send("Looks like that username has already been registered. Try signing in instead.");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const [newUser] = await db.register_user([username, hash]);
            delete newUser.password;
            req.session.user = newUser;
            console.log(req.session.user)
            res.status(200).send(req.session.user);
        }
    } catch (err) {
        console.log("Database error on register function: ", err);
        res.sendStatus(500);
    }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    editUser: async (req, res) => {
        const db = req.app.get('db');
        const { img } = req.body;
        const { id } = req.session.user;
        try {
            const updatedUser = await db.edit_user([id, img]);
            req.session.user - updatedUser;
            res.send(200).send(req.session.user); 
        } catch (err) {
            console.log("Database error on editUser function: ", err);
            res.sendStatus(500);
        }
    },
    addPost: async (req, res) => {
        const db = req.app.get('db');
        const {title, content, img} = req.body;
        const {writer_id} = req.session.user;

        try {
            const addedPost = await db.add_post([title, content, img, writer_id]);
            res.status(200).send(addedPost);
        } catch (err) {
            console.log("Database error on addPost function: ", err);
            res.sendStatus(500);
        }
    },
    getPost: async (req, res) => {
        const {postid} = req.params;
        const db = req.app.get('db');

        try {
            const singlePost = await db.get_post(postid)
            if (singlePost) {
                res.status(200).send(singlePost[0])
            } else {
                res.status(404).send("Oops! We cannot display posts at this time.")
            }
        } catch (err) {
            console.log("Database error on getPost function: ", err);
            res.sendStatus(500);
        }
    },
    getPosts: async (req, res) => {
        // req.params refers to posts.writer_id:
        const {id} = req.params;
        const {userposts, search} = req.query;
        const db = req.app.get('db');
        
        try {
            if(userposts === true && search !== null) {
                const foundPost = db.posts.where({"title like": "%search%"})
                res.status(200).send(foundPost)
            } else if (userposts === false && search !== null) {
                const foundPost = db.posts.where({"title like": "%search%", "writer_id !=": id})
                res.status(200).send(foundPost)
            } else if (userposts === false && search === null) {
                const foundPost = db.posts.where({"writer_id !=": id})
                res.status(200).send(foundPost)
            } else {
                const posts = await db.get_posts();
                res.status(200).send(posts);
            }
        } catch (err) {
            console.log("Database error on getPosts function: ", err);
            res.sendStatus(500);
        };
    },
    editPost: async (req, res) => {        
        const db = req.app.get("db");
        // req.params refers to posts.id:
        const {id} = req.params;
        const {title, img, content} = req.body;

        try {
            const posts = await db.edit_post([+id, title, content, img]);
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on editPost function: ", err);
            res.sendStatus(500);
        };
    },
    deletePost: async (req, res) => {
        const db = req.app.get("db");
        // id in req.params refers to posts.id:
        const {id} = req.params;
    
        try {
            const posts = await db.delete_post(+id);
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on deletePost function: ", err);
            res.sendStatus(500);
        };
    },
    addComment: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;
        const {commentBody} = req.body;

        try {
            const addedComment = await db.add_comment(+id, commentBody);
            res.status(200).send(addedComment)
        } catch (err) {
            console.log("Database error on addComment function: ", err);
            res.sendStatus(500);
        };
    },
    editComment: async (req, res) => {
        const db = req.app.get('db');
        // id refers to comments.id in req.params:
        const {id} = req.params;
        const {commentBody} = req.body;

        try {
            const comments = await db.edit_comment([+id, commentBody]);
            res.status(200).send(comments)
        } catch (err) {
            console.log("Database error on editComment function: ", err);
            res.sendStatus(500);
        };
    },
    deleteComment: async (req, res) => {
        const db = req.app.get('db');
        // id refers to comments.id in req.params:
        const {id} = req.params;

        try {
            const comments = await db.delete_comment(+id);
            res.status(200).send(comments);
        } catch (err) {
            console.log("Database error on deleteComment function: ", err);
            res.sendStatus(500);
        };
    }
}