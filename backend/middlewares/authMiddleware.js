const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken");


module.exports.authUser = async function(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    const isBlacklisted = await BlacklistToken.findOne({
        token: token
    })
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({message:"Unauthorized"})
    }
}
