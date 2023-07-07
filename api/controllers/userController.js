const { getUserByUsername, getUserById, createUser } = require("../services/userService");
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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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

module.exports = { verifyToken, login, register };