//Initialise un serveur express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config({ path: '.env.local' });
const port = process.env.SERVER_PORT;
const mongoSanitize = require('express-mongo-sanitize');

const dbConnect = require('./mongo/mongoose');

//Import routes
const authRoutes = require('./routes/authRouter');
const postRoutes = require('./routes/postRouter');
const commentRoutes = require('./routes/commentRouter');
const userRoutes = require('./routes/userRouter');
//Uses
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//connect to database
dbConnect();

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

//Listen
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
