const { getUserByUsername, getUserById, createUser, updateUser } = require("../services/userService");
const { hashPassword, comparePassword } = require("../services/authService");
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res) => {
    try {
        const user = await getUserById(req.user.id);
        if (req.user.id == user._id.toString()) {
            res.status(200).json({ user });
        } else {
            res.status(401).json({ message: "Vous n'êtes pas autorisé à accéder à cette ressource" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        const role = user.role;

        res.status(200).json({ token, role });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);

        if (user) {
            return res.status(400).json({ message: "L'utilisateur existe déjà !" });
        }

        const hashedPassword = await hashPassword(password);

        await createUser({ username, password: hashedPassword, role: 'admin' });

        res.status(201).json({ message: 'Utilisateur créé' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUsername = async (req, res) => {

    const { username } = req.body;

    try {
        const user = await getUserById(req.user.id);

        if (!user) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
        }


        await updateUser(req.user.id, { username })
            .then(() => {
                const token = jwt.sign({ id: user._id, username: username }, process.env.JWT_SECRET);
                res.status(200).json({ token });
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePassword = async (req, res) => {

    const { password } = req.body;

    try {
        const user = await getUserById(req.user.id);

        if (!user) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas !" });
        }

        const hashedPassword = await hashPassword(password);

        await updateUser(req.user.id, { password: hashedPassword })
            .then(() => {
                res.status(200).json({ message: "Mot de passe modifié" });
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { verifyToken, login, register, updateUsername, updatePassword };