// Import the express function
const express = require('express');

// Import and run dotenv
require('dotenv').config();

// Import body-parser to read POST request
const bodyParser = require('body-parser');

// Import cors for Cross-Origin Resource Sharing
const cors = require('cors');

// Import express-form data
const expressFormData = require('express-form-data');


// Import Cloudinary for images
const cloudinary = require('cloudinary').v2;

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
);


// Import mongoose to connect to MongoDB
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-routes.js');
const productRoutes = require('./routes/product-routes.js');


// --------- Start of PassportJS configuration ---------
// Use passport, passport-jwt to read the client jwt
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = process.env.JWT_SECRET;

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
}

// This function will tell passport how what to do
// with the payload.
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                // Tell passport what to do with payload
                UserModel
                .findOne({ _id: jwtPayload._id })
                .then(
                    (dbDocument) => {
                        // The done() function will pass the 
                        // dbDocument to Express. The user's 
                        // document can then be access via req.user
                        return done(null, dbDocument)
                    }
                )
                .catch(
                    (err) => {
                        // If the _id or anything is invalid,
                        // pass 'null' to Express.
                        if(err) {
                            console.log(err);
                        }
                        return done(null, null)
                    }
                )

            }
        )
    )
};
passportJwt(passport)
// ---------End of Passport JS configuration ---------



// Create server object by calling express
const server = express();

// Configure express for reading body for POST requests
server.use(bodyParser.urlencoded({ extended: false }));

// Configure express for JSON as well
server.use(bodyParser.json());

// Configure express for CORS
server.use(cors());

// Configure express for Express Form Data
server.use( expressFormData.parse() );


// Connect to MongoDB
const connectionString = process.env.MONGODB_CONNECTION_STRING;

const connectionConfig = {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
};

mongoose
.connect( connectionString, connectionConfig )
.then(
    function() {
        console.log('DB is connected')
    }
)
.catch(
    function(dbError) {
        console.log('DB error', dbError)
    }
);

// This is a GET route
server.get('/',
    function(req, res) {
        res.send("Mission Accomplished 2!");
    }
);


server.use(
    '/user', userRoutes
);

server.use(
    '/product', productRoutes
);

server.listen(
    process.env.PORT,
    function() {
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    }
);