const mongoose = require('mongoose');
mongoose.set('debug', true);
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { pass: process.env.MONGO_PASS, user: process.env.MONGO_USER });
        console.log('Base de données connecté');
    } catch (error) {
        console.log("Erreur connection DB", error);
        process.exit(1);
    }
}

module.exports = connectDb;