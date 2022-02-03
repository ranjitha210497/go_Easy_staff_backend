const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const accountSid = 'AC6cdfa90a94b852e611d837bc4400a383';
const authToken = 'ff9a6ffaac2326d085d7233cdf7a172d';
const client = require('twilio')(accountSid, authToken);


// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

// environment variable or you can say constants
env.config();

// mongodb connection
// mongodb+srv://root:<password>@cluster0.qu4u5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qu4u5.mongodb.net/GOEASYSTAFF?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    ).then(() => {
        console.log('Database connected');
    })

app.use(bodyParser());
app.use('/api', authRoutes)
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
    client.messages
    .create({
       body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
       from: '+12013808847',
       to: '+918073202038'
     })
    .then(message => console.log(message));
    return res.status(200).json({ message: req.body.message});
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})