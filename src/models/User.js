const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    addresses: [
        {
            title: String,
            address1: String,
            address2: String,
            country: String,
            province: String,
            code: String,
        }
    ],
    phones: {
        type: String,
        unique: true,
    },

    films: [] ,
    isAdmin: Boolean,
    isCostumer: Boolean
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("user", UserSchema)