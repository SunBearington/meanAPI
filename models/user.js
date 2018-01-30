var mongoose = require('mongoose');
var bycrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        lowercase:true,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        enum:['reader','creator','editor'],
        default:'reader'
    }
    },{
    timestamps:true
});

UserSchema.pre('save',function(next){
    var user=this;
    var SALT_FACTOR = 5;
    if(!user.isModified('password')){
        return next();
    }
    bycrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err){
            return next(err);
        }
        user.password = hash;
        next()
    });
});

UserSchema.methods.comparePassword = function(passwordAttempt,cb){
    bycrypt.compare(passwordAttempt, this.password, function(err,isMatch){
        if(err){
            return cb(err);
        }else{
            cb(null,isMatch);
        }
    });
};

module.exports = mongoose.model('User',UserSchema);