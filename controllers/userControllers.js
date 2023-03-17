const User = require("../models/User");


const create = async(entry) => {
    const { email, mobileNumber } = entry;

    let instance = await User.find({email});
    console.log(instance);
    if(instance.length > 0){
        return 1;
    }

    const entry1 = new User(entry);
    const entry_ = await entry1.save();
    entry_.password = "";
    return entry_;
}

const findUser = async(entry) =>{
    const { email, password } = entry;
    let instance = await User.findOne({email});
    
    if(!instance){
        return 1;
    }
    else{
        const match = await instance.comparePassword(password);
        if(match==false){
            return 2;
        }else{
            return instance;
        }
    }
}

const findUserById = async(id) => {
    let instance = await User.findOne(id);
    if(!instance){
        return 1;
    }
    else{
        return instance;
    }
}

const update = async(_id, data) => {
    const instance = await User.updateOne({_id}, data);
    return instance;
}

const delete_ = async (_id) => {
    const instance = await User.deleteOne({_id});
}

exports.create = create;
exports.findUser = findUser;
exports.findUserById = findUserById;
exports.update = update;
exports.delete_ = delete_;