const express = require('express');
const { notFound, errorHandler } = require('./config/error')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/pro',productRoutes);

app.get("/", (req,res) => {
    res.send("APP is running");
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));