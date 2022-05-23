// Import all Dependencies
const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

// These Method is used to Get data and cookie from frontend
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Configure ENV Files & Require Connection file
dotenv.config({path: './config.env'});
require('./db/conn');

// Require Model
const Users = require('./models/userSchema')

// Registration
app.post('/register', async (req, res)=>{
    try {
        // Get body or data
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username: username,
            email: email,
            password:password
        });

        // Save method is Used to create User or Insert user
        // Before Saving or Inserting, password will hash
        // Because of hashing. After hash, it will save to DB
        const created = await createUser.save();
        console.log(created);
        res.status(200).send('Registered')

    } catch (error) {
        res.status(404).send(error)
    }
})

// Login User
app.post('/post', async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Find User if existing
        const user = await Users.findOne({email:email})
        if (user) {
            // Verify Password
            const isMatch = await bcryptjs.compare(password, user.password);
            if (isMatch) {
                // Generate token which is define in Users Schema
                const token = await user.generateToken();
                res.cookie('jwt', token, {
                    // Expire token in 24hours
                    expires : new Data(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send('LoggedIn')
            }else{
                res.status(404).send('Invalid Crediential')
            }
        }else{
            res.status(404).send('Invalid Crediential')
        }

    } catch (error) {
        res.status(404).send(error)
    }
})

app.listen(1337, ()=>{
    console.log('Server Started on http://localhost:1337')
});

