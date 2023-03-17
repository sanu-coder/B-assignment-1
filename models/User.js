const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        reuired : true
    },
    password : {
        type : String,
        reuired : true
    },
    email : {
        type : String,
        required : true
    },
    followers : {
        type : Number
    },
    following : {
        type : Number
    }
})

UserSchema.methods.comparePassword = async function(password) {
    console.log(password)
    const match = await bcryptjs.compare(password, this.password);
    return match;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;