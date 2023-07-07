const jwt = require('jsonwebtoken');
const isUserLogged = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette ressource" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { isUserLogged };