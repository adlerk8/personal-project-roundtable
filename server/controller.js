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
            const [newUser] = await db.register_user([username, hash, `https://robohash.org/${username}?set=set4`]);
            delete newUser.password;
            req.session.user = newUser;
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
        const {title, content} = req.body;
        const {id} = req.session.user;

        try {
            await db.add_post([title, content, id]);
            res.sendStatus(200);
        } catch (err) {
            console.log("Database error on addPost function: ", err);
            res.sendStatus(500);
        }
    },
    getPost: async (req, res) => {
        const {postid} = req.params;
        const db = req.app.get('db');

        try {
            const [singlePost] = await db.get_post(postid)
            if (singlePost) {
                res.status(200).send(singlePost)
            } else {
                res.status(404).send("Oops! We cannot display posts at this time.")
            }
        } catch (err) {
            console.log("Database error on getPost function: ", err);
            res.sendStatus(500);
        }
    },
    getMyPosts: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.session.user;
        
        try {
            const posts = await db.get_my_posts(id);
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on getMyPosts function: ", err);
            res.sendStatus(500);
        };
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db');

        try{
            const posts = await db.get_all_posts();
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on getAllPosts function: ", err);
            res.sendStatus(500);
        };
    },
    editPost: async (req, res) => {        
        const db = req.app.get("db");
        const {postid} = req.params;
        const {title, img, content} = req.body;

        try {
            const [posts] = await db.edit_post([+postid, title, content, img]);
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on editPost function: ", err);
            res.sendStatus(500);
        };
    },
    deletePost: async (req, res) => {
        const db = req.app.get("db");
        const {postid} = req.params;

        try {
            const posts = await db.delete_post(+postid);
            res.status(200).send(posts);
        } catch (err) {
            console.log("Database error on deletePost function: ", err);
            res.sendStatus(500);
        };
    },
    getComments: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params;

        try {
            const comments = await db.get_comment(postid);
            res.status(200).send(comments);
        } catch (err) {
            console.log("Database error on getComments function: ", err);
            res.sendStatus(500);
        };
    },
    addComment: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params;
        const {commentBody} = req.body;
        const {id} = req.session.user;

        try {
            const addedComment = await db.add_comment([postid, commentBody, id]);
            res.status(200).send(addedComment)
        } catch (err) {
            console.log("Database error on addComment function: ", err);
            res.sendStatus(500);
        };
    },
    editComment: async (req, res) => {
        const db = req.app.get('db');
        // id refers to comments.id in req.params:
        const {commentid} = req.params;
        const {commentBody} = req.body;

        try {
            const comments = await db.edit_comment([+commentid, commentBody]);
            res.status(200).send(comments)
        } catch (err) {
            console.log("Database error on editComment function: ", err);
            res.sendStatus(500);
        };
    },
    deleteComment: async (req, res) => {
        const db = req.app.get('db');
        const {commentid} = req.params;

        try {
            const comments = await db.delete_comment(+commentid);
            res.status(200).send(comments);
        } catch (err) {
            console.log("Database error on deleteComment function: ", err);
            res.sendStatus(500);
        };
    }
}