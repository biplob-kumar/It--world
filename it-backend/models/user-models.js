const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },

})

//? secure the password with the bcrypt
userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        next()
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound)
        user.password = hash_password
    } catch (error) {
        next(error);
    }

})

// compare the pasword 
userSchema.methods.comparePassword = async function(password){
    return  bcrypt.compare(password ,this.password)
}

//  json webtoken 
userSchema.methods.generateToken = async function () {

try {
    return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
    },   process.env.JWT_SeCRETKEY,
            {
                expiresIn: "30d"
            }
    )

} catch (error) {
    
}

}


// defile model cullectio name 
const User = new mongoose.model("User", userSchema)
module.exports = User