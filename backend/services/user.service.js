const userModel = require('../models/userModel')

module.exports.createUser = async function({firstname,lastname,email,password}){
    try {
        if(!firstname || !email || !password){
            throw new Error("All fields are required")
        }
        const user = userModel.create({
            fullname:{
                firstname,
                lastname
            },
            email,
            password
        })
        return user;
        
    } catch (error) {
        console.log(error);
        
    }
}