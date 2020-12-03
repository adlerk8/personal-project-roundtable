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
            console.log("Database error on login function: ", err)
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
    } catch (err) {"Database error on register function: ", err}
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    editUser: async (req, res) => {
        const db = req.app.get('db');
        const { img } = req.body;
        const { id } = req.session.user;

        const updatedUser = await db.edit_user([id, img]);
        req.session.user - updatedUser;
        res.send(200).send(req.session.user); 
    }
}